from app.config import settings
from app.model.activities import ActivitiesResponse, modeldescription, ActivitiesTranslation
from agents import Agent, Runner
from openai import pydantic_function_tool

from pydantic_settings import BaseSettings
from pydantic import BaseModel


from typing import List
import json

translation_instructions= (
    "You are a professional language translator. "
    " You receive a ActivityTranslation object containing: "
     " - input: <ActivitiesResponse>"       
     " - originalLocale: <string>"       
     " - newLocale: <string>"
    "Translate the content of a JSON object from 'originalLocale' into the requested 'newLocale'. "
    "Both originalLocale and newLocale are ISO 639 language–region codes. Examples: "
    "en-US: English (United States) "
    "en-GB: English (United Kingdom) "
    "es-ES: Spanish (Spain) "
    "fr-CA: French (Canada) "
    "Respond with an object that preserves the exact structure of the input JSON, replacing only the "
    "original text fields with their translations. "
    "Include ONLY the translated JSON. Do not add explanations, comments, quotes, or extra text. "
    "Do not modify numeric fields. "
    "You will receive and return ONLY a valid JSON matching this schema:\n\n"
    ) + modeldescription + (
    "Do not return explanations. Do not return text outside the JSON."
    )



translatorAgent =  Agent(
    name="translatorAgent",
    instructions= translation_instructions
    )


async def translateActivityList(input:  ActivitiesResponse, locale:str): 
    """
    Translate the content of the ActivitiesResponse from the {defaultLanguage} to the requested locale. 
    """
    try:
        result = translatorAgent.responses.create(
            ##model=settings.OPENAI_DEFAULT_MODEL,
            model="gpt-4o-mini",
            instructions=translation_instructions,
            input=f"Translate the following JSON Object to {locale}: {input}"
        )
        print(result.output_text)
        raw = result.output_text
        data = json.loads(raw)
        response = ActivitiesResponse(**data)

    except Exception as e:
        # Error message, add emojis Mac - Control + Command + Space, Windows - Windows Key + . (period)
        return f"❌ An error occurred: {e}"


