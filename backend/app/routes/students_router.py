
from app.services.schedule.studentServices import readSchedule
from fastapi import APIRouter



router = APIRouter()


@router.get("/{studentId}")
async def getRoster(studentId: str):
    return await readSchedule(studentId)


