
from app.model.enrollment import CostItem,EnrollmentInput,Student
from app.services.enrollService import insert_enrollment
from fastapi import APIRouter



router = APIRouter()


@router.get("/{activityId}")
async def getRoster(activityId: str):
    return await getRoster(activityId)


@router.post("/{activityId}/{studentId}")
async def enroll_student( activityId: str,studentId: str, body: EnrollmentInput):
    print (f"enroll {studentId} in {activityId}" )
    return await insert_enrollment(studentId, activityId, body)

