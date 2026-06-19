from ..config import settings
from agents import Agent, Runner, FileSearchTool, SQLiteSession

from pydantic import BaseModel
from typing import List
import json


class Activity(BaseModel):
    name: str
    description: str
    weekday: str
    time: str

class ActivitiesResponse(BaseModel):
    level: int
    activities: List[Activity]


# read the catalog as a Knowledge Tool
filesearchtool = FileSearchTool(
    vector_store_ids=["vs_6a34c367ccd88191b2b7f60ed756991d"]
)

# Create the agent

agent = Agent(
    name="Extracurricular Activities Explorer",
    instructions=(
        "You are an AI agent that reads a vector store and filters activities by the provided level. "
        "Each activity is offered for a range of levels (grades in a K-12 school) named 1,2,3,...,11,12. "
        "If level = 0, return all the activities. "
        "You MUST return ONLY valid JSON matching this schema:\n\n"
        "{\n"
        '  "level": <int>,\n'
        '  "activities": [\n'
        "    {\n"
        '      "name": "<string>",\n'
        '      "description": "<string>",\n'
        '      "weekday": "<string>",\n'
        '      "time": "<string>"\n'
        "    }\n"
        "  ]\n"
        "}\n\n"
        "Use in the description exactly the same words used in the source. Use only the information available in he tool"
        "Do not return explanations. Do not return text outside JSON."
    ),
    tools=[filesearchtool]
)


async def getActivitiesCatalog(level: int):
    result = await Runner.run(agent, input=[
        {
            "role": "user",
            "content": f"Get activities for level {level}"
        }
    ])

    # Extract raw JSON text output from the agent and Parse it into Pydantic model
    raw = result.final_output
    data = json.loads(raw)
    response = ActivitiesResponse(**data)
    
    return response
