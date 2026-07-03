from ..config import settings
from ..model.Activities import ActivitiesResponse, Activity
from agents import Agent, Runner, FileSearchTool, SQLiteSession
import json


# read the catalog as a Knowledge Tool
filesearchtool = FileSearchTool(
    
    vector_store_ids=[settings.CATALOG_VECTOR]
)

# Create the agent

agent = Agent(
    name="Extracurricular Activities Explorer",
    instructions=(
        "You are an AI agent that reads a vector store and filters activities by the provided level and text. "
        "Each activity is offered for a range of levels (grades in a K-12 school) named 1,2,3,...,11,12. "
        "If level = 0, return all the activities. "
        "If filter is empty, return all the activities. "
        "Use this definition: One activity matches one sentence if one of this conditions is true: "
        " - te sentence asks for a name, and the activity contains at least one of the words"
        " - the sentence asks for gender, and the activity include explicitly that gender in the name or the description, or do not talk about gender explicitly"
        " - the sentence include a word similar to the category"
        " - the sentence is related with the description "
        "You MUST return ONLY valid JSON matching this schema:\n\n"
        "{\n"
        '  "level": <int>,\n'
        '  "activities": [\n'
        "    {\n"
        '      "id": <int>,\n'
        '      "name": "<string>",\n'
        '      "description": "<string>",\n'
        '      "weekday": "<string>",\n'
        '      "time": "<string>",\n'
        '      "match":"<string>",\n'
        "    }\n"
        "  ]\n"
        "}\n\n"
        " if you don't have any of the fields required, fill it with 0 if the field type is int or the empty string if the field type is str"
        "Use in the description exactly the same words used in the source. Use only the information available in he tool"
        "match contains the rule or rules that matched the activity. Include each activity only once"
        "Do not return explanations. Do not return text outside JSON."
    ),
    tools=[filesearchtool]
)


async def getActivitiesCatalog(level: int, filter: str):
    
    prompt = f"Get activities for level {level}"
    if filter: 
        prompt += f" and whose data matches the sentence: '{filter}'" 
    print (prompt)

    result = await Runner.run(agent, input=[
        {
            "role": "user",
            "content": prompt
        }
    ])

    # Extract raw JSON text output from the agent and Parse it into Pydantic model
    raw = result.final_output
    data = json.loads(raw)
    response = ActivitiesResponse(**data)
    
    return response
