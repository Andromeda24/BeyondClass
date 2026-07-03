from pydantic_settings import BaseSettings
from pydantic import BaseModel
from typing import List

class Activity(BaseModel):
    id: int
    name: str
    description: str
    weekday: str
    time: str
    match:str = ""

class ActivitiesResponse(BaseModel):
    level: int
    activities: List[Activity]
