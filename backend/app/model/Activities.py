from pydantic import BaseModel
from typing import List


class CostItem(BaseModel):
    concept: str
    value: float


class BasicActivity(BaseModel):
    id: str
    name:str 
    weekday: str
    time:str


class Activity(BaseModel):
    id: str
    name: str
    description: str
    weekday: str
    time: str
    levels:str
    cost:float
    txtoptionalcosts:str
    optionals:List[CostItem]
    imageUrl:str
    match:str = ""

class ActivitiesResponse(BaseModel):
    level: int
    activities: List[Activity]


class ActivitiesTranslation(BaseModel):
    input: ActivitiesResponse
    originalLocale: str
    newlocale: str

class EnrollmentInput(BaseModel):
    activityName: str
    studentFullName: str
    studentDisplayName: str
    weekday: str
    time: str
    cost: List[CostItem]
    status: str



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
