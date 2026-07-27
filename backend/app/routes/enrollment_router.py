
from app.model.enrollment import CostItem,EnrollmentInput,Student
from app.services.rostering.enrollmentService import  readRoster
from app.services.rostering.registerEnrollment import enrollmentAgent
from fastapi import APIRouter



router = APIRouter()


@router.get("/{activityId}")
async def getRoster(activityId: str):
    return await readRoster(activityId)


@router.post("/{activityId}")
async def enroll_student( activityId: str, body: EnrollmentInput):
    print (f"enroll in {activityId}" )
    return await enrollmentAgent(activityId, body)

