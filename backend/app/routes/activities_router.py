from fastapi import APIRouter
from pydantic import BaseModel
from ..services.openai_service import generate_text
from typing import Optional
from ..services.activity_catalog import getActivitiesCatalog


router = APIRouter()

@router.get("")
async def get_activityList(filter: Optional[str] = "", lang: Optional[str] = "en"):
    #return get__filtered_activities(0,filter,lang)
    return getActivitiesCatalog()


@router.get("/{level}")
async def get__filtered_activities(level: int, filter: Optional[str] = "", lang: Optional[str] = "en"):
    return getActivitiesCatalog()

