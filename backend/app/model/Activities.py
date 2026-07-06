from pydantic_settings import BaseSettings
from pydantic import BaseModel
from typing import List

class Activity(BaseModel):
    id: str
    name: str
    description: str
    weekday: str
    time: str
    levels:str
    imageUrl:str
    match:str = ""

class ActivitiesResponse(BaseModel):
    level: int
    activities: List[Activity]


class ActivitiesTranslation(BaseModel):
    input: ActivitiesResponse
    originalLocale: str
    newlocale: str


    

modeldescription = ("{\n"
        '  "level": <int>,\n'
        '  "activities": [\n'
        "    {\n"
        '      "id": "<string>",\n'
        '      "name": "<string>",\n'
        '      "description": "<string>",\n'
        '      "weekday": "<string>",\n'
        '      "time": "<string>",\n'
        '      "levels": "<string>",\n'
        '      "imageUrl": "<string>",\n'
        '      "match":"<string>",\n'
        "    }\n"
        "  ]\n"
        "}\n\n"
    )
