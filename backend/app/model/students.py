from pydantic import BaseModel
from typing import List


class Student(BaseModel):
    studentId: str
    displayName: str
    fullName:str
    level:int
    parent:str

