from ..config import settings
from ..model.activities import ActivitiesResponse, ActivitiesTranslation
from agents import Agent, Runner
import json
from app.services.translator import translatorAgent
from app.services.activity_catalog import ActivityAgent

defaultLanguage = settings.DEFAULT_LANGUAGE
# Create the agent


agent = Agent(
    name="Extracurricular Activities Explorer Orchestrator",
    instructions=(
            f"""
        You are an AI agent that performs a two-step operation:
        (1) retrieve an activities catalog, and
        (2) optionally translate it.

        Follow these rules exactly:

        1. You receive three input parameters:
        - level: a numeric school level
        - filter: a text filter (may be empty)
        - lang: a target language code

        2. Construct the prompt for the activitiesCatalog tool:
        - Start with: "Get activities for level 'level'"
        - If filter is not empty:
            Append: " and whose data matches the sentence: 'filter'"
        - Do not modify level or filter.

        3. Call the activitiesCatalog tool using the constructed prompt.
        - The tool will return an ActivitiesResponse object.

        4. Compare the parameter 'lang' with your default language.
        - If lang equals your default language:
            Return the ActivitiesResponse object exactly as received.
        - Otherwise:
            Construct a ActivityTranslation object with 
            - input: the ActivitiesResponse object
            - originalLocale: {defaultLanguage}
            - newLocale: 'lang'
            Call the translatorAgent tool with the ActivityTTranslation:
                Return the translated ActivitiesResponse object.
                If the translator returns nothing, raise an error
        """ 
    ),
    tools=[ 
        ActivityAgent.as_tool(
            tool_name= "ActivitiesCatalog",
            tool_description = "An agent that returns extracurricuar activities based on the filter given in the prompt in an ActivityResponse Object"
        ),
        translatorAgent.as_tool(
            tool_name= "translatorAgent",
            tool_description = f"Translate the content of an ActivitiesResponse from the {defaultLanguage} to the requested language included in the prompt as lang. "
        )
        ]
)



async def gettranslatedActivitiesCatalog(level: int, filter: str,lang):
    
    prompt = f"Follow the instructions for level: {level}, "
    if filter: 
        prompt += f" filter: '{filter}'"

    prompt += f" lang: '{lang}'"
     
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
