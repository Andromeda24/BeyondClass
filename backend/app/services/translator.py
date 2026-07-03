from ..config import settings
from ..model.Activities import ActivitiesResponse, Activity
from openai import OpenAI

from pydantic_settings import BaseSettings
from pydantic import BaseModel


from typing import List
import json

client = OpenAI()
translation_instructions= (
    "You are a professional language translator. "
    "Translate the content of a JSON object from {defaultLanguage} into the requested language. "
    "Both the source and target languages use ISO 639 language–region codes. Examples: "
    "en-US: English (United States) "
    "en-GB: English (United Kingdom) "
    "es-ES: Spanish (Spain) "
    "fr-CA: French (Canada) "
    "Respond with an object that preserves the exact structure of the input JSON, replacing only the "
    "original text fields with their translations. "
    "Include ONLY the translated JSON. Do not add explanations, comments, quotes, or extra text. "
    "Do not modify numeric fields. "
    "You will receive and return ONLY a valid JSON matching this schema:\n\n"
    "{\n"
    '  "level": <int>,\n'
    '  "activities": [\n'
    "    {\n"
    '      "id": <int>,\n'
    '      "name": "<string>",\n'
    '      "description": "<string>",\n'
    '      "weekday": "<string>",\n'
    '      "time": "<string>",\n'
    '      "match": "<string>"\n'
    "    }\n"
    "  ]\n"
    "}\n\n"
    "Do not return explanations. Do not return text outside the JSON."
    )



async def translateActivityList(input:  ActivitiesResponse, locale:str): 
    """
    Translate the content of an ActivitiesResponse from the {defaultLanguage} to the requested locale. 
    """
    try:
        result = client.responses.create(
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

