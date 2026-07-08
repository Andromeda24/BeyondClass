import os
from dotenv import load_dotenv
from beanie import Document
from pydantic import Field, BaseModel
from pymongo import AsyncMongoClient
from beanie import Document, Indexed, init_beanie
from app.model.activities import BasicActivity
from app.model.students import Student
from app.model.enrollment import Enrollment, EnrollmentInput
from datetime import datetime, timezone



async def insert_enrollment(activityId: str, studentId: str, body: EnrollmentInput):
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
            studentid=student,
            costs=body.cost,
            status=body.status,
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
