import os
from dotenv import load_dotenv
from beanie import Document
from pydantic import Field, BaseModel
from pymongo import AsyncMongoClient
from beanie import Document, Indexed, init_beanie
from app.model.activities import BasicActivity
from app.model.students import Student
from app.model.enrollment import Enrollment, EnrollmentInput, ActivityRoster
from datetime import datetime, timezone
from typing import List



async def insert_enrollment(activityId: str, body: EnrollmentInput):
    """
    Creates and inserts an Enrollment document based on EnrollmentInput.
    """
    try:
        # Build BasicActivity from input
        activity = BasicActivity(
            id=activityId,
            name=body.activityName,
            weekday=body.weekday,
            time=body.time
        )

        # Build Student from input
        student = body.student

        # Build Enrollment document
        enrollment = Enrollment(
            activity=activity,
            student=student,
            costs=body.cost,
            status="active",
            created_at=datetime.now(timezone.utc)
        )

        # Insert into MongoDB
        await enrollment.insert()
        return enrollment

    except Exception as e:
        raise Exception(f"Error inserting enrollment: {e}")


insert_enrollment_tool = {
    "type": "function",
    "function": {
        "name": "insert_enrollment",
        "description": "Insert an enrollment document into MongoDB using Beanie.",
        "parameters": {
            "type": "object",
            "properties": {
                "activityId": {"type": "string"},
                "studentId": {"type": "string"},
                "body": {
                    "type": "object",
                    "properties": {
                        "activityName": {"type": "string"},
                        "studentFullName": {"type": "string"},
                        "studentDisplayName": {"type": "string"},
                        "weekday": {"type": "string"},
                        "time": {"type": "string"},
                        "cost": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "label": {"type": "string"},
                                    "amount": {"type": "number"}
                                },
                                "required": ["label", "amount"]
                            }
                        },
                        "status": {"type": "string"}
                    },
                    "required": [
                        "studentFullName",
                        "studentDisplayName",
                        "weekday",
                        "time",
                        "cost",
                        "status"
                    ]
                }
            },
            "required": ["activityId", "studentId", "body"]
        }
    }
}




async def readRoster(activityId: str) -> ActivityRoster:
    # 1. Query all enrollments for this activity
    enrollments: List[Enrollment] = await Enrollment.find(
        Enrollment.activity.id == activityId
    ).to_list()

    if not enrollments:
        # No enrollments found → return empty roster
        return ActivityRoster(
            activityName="",
            activityId=activityId,
            studentList=[]
        )

    # 2. Extract activity info (all enrollments share the same activity)
    activity: BasicActivity = enrollments[0].activity

    # 3. Build the student list
    students: List[Student] = [en.student for en in enrollments]

    # 4. Build and return the roster
    return ActivityRoster(
        activityName=activity.name,
        activityId=activity.id,
        studentList=students
    )

