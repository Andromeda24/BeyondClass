from ..config import settings
from ..model.activities import ActivitiesResponse, modeldescription
from agents import Agent, Runner, FileSearchTool, SQLiteSession
import json


# read the catalog as a Knowledge Tool
filesearchtool = FileSearchTool(
    
    vector_store_ids=[settings.CATALOG_VECTOR]
)


matchingInstructions = """
You are an AI agent that reads a vector store and filters activities by the provided level and text.

You perform a two-step operation to construct the answer:
(1) filter activities by level
(2) optionally filter by keyword

Follow these rules exactly:

1. Each activity contains a natural-language description of the levels it is offered for.
   Levels may appear as: "K to 5", "4 to 8", "5", "K-3", "Grades 4–8", etc.
   Interpret these ranges semantically. Treat “K” as the lowest grade, followed by 1, 2, 3 … up to 12.
   Include an activity if the requested level falls inside the described range.

2. The input parameter "level" determines which activities to include:
   - If level = -2, include all activities.
   - If level = -1, interpret it as “K”.
   - Otherwise, use the numeric level directly.

3. You MUST perform level filtering FIRST.
   After retrieving activities from the vector store, re-apply level filtering manually.
   Exclude any activity whose natural-language level range does not include the requested level,
   even if the vector store returned it due to semantic similarity.

4. Keyword filtering is optional and MUST be applied ONLY to the already level-filtered list.
   - If the filter parameter is empty, return the level-filtered list as-is.
   - If the filter parameter is not empty, filter AGAIN using only the level-filtered list.
   - Keyword filtering MUST NOT expand the list or re-query the vector store.

5. A filter matches an activity if at least one of these conditions is true:
   - The filter topic is related to the content of the activity’s name, category, or description.

   Gender-specific filtering MUST NOT use the vector store. It MUST use explicit text rules:
   - If the filter is “Only for girls”, include activities whose name or description explicitly or implicitly
     refers to girls (e.g., “Girl Scouts”, “Girl’s soccer”, “your daughter will enjoy it”).
     Exclude activities that state they are for both boys and girls.
   - If the filter is “Only for boys”, include activities whose name or description explicitly or implicitly
     refers to boys (e.g., “Boy Scouts”, “Boys’ soccer”, “your son will enjoy it”).
     Exclude activities that state they are for both boys and girls.

6. You MUST return ONLY valid JSON matching this schema:

   {
     "level": <int>,
     "activities": [
       {
         "id": "<str>",
         "name": "<str>",
         "description": "<str>",
         "weekday": "<str>",
         "time": "<str>",
         "levels": "<str>",
         "imageUrl": "<str>",
         "match": "<str>"
       }
     ]
   }
"""

# Create the agent

ActivityAgent = Agent(
    name="Extracurricular Activities Explorer",
    instructions= matchingInstructions,
    tools=[filesearchtool]
)


async def getActivitiesCatalog(level: int, filter: str):
    
    prompt = f"Get activities for level {level}"
    if filter: 
        prompt += f" and whose data matches the sentence: '{filter}'" 
    print (prompt)

    result = await Runner.run(ActivityAgent, input=[
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
