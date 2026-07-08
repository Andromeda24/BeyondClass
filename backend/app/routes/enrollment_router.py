
from app.model.enrollment import CostItem,EnrollmentInput,Student
from app.services.enrollService import insert_enrollment, readRoster
from fastapi import APIRouter



router = APIRouter()


@router.get("/{activityId}")
async def getRoster(activityId: str):
    return await readRoster(activityId)


@router.post("/{activityId}")
async def enroll_student( activityId: str, body: EnrollmentInput):
    print (f"enroll in {activityId}" )
    return await insert_enrollment(activityId, body)

