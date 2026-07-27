from calendar import weekday
from pydantic import BaseModel
from typing import List


class Student(BaseModel):
    id: str
    displayName: str
    fullName:str
    level:int
    parent:str

 