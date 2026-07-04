from pydantic_settings import BaseSettings
from pydantic import BaseModel
from typing import List

class Activity(BaseModel):
    id: int
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

modeldescription = ("{\n"
        '  "level": <int>,\n'
        '  "activities": [\n'
        "    {\n"
        '      "id": <int>,\n'
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
