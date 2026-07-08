from app.model.students import Student
from pydantic import BaseModel
from typing import List
from app.model.activities import BasicActivity, CostItem
from beanie import Document
from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime, timezone


class EnrollmentInput(BaseModel):
    activityName: str
    student: Student
    weekday: str
    time: str
    cost: List[CostItem]
    status: str

class TestDoc (Document):
    name:str

class Enrollment(Document):
    activity: BasicActivity
    studentid: Student
    costs:  List[CostItem]
    status: Literal["active", "inactive", "withdrawn"]
    created_at: datetime = datetime.now(timezone.utc)

    class Settings:
        name = "ActivityEnrollment"

class ActivityRoster(BaseModel):
    activityName: str
    activityId: str
    studentList: List[Student] 