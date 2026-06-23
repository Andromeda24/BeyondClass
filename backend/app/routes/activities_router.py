from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from ..services.activity_catalog import getActivitiesCatalog


router = APIRouter()

@router.get("")
async def get_activityList(lang: Optional[str] = "en"):
    #return get__filtered_activities(0,filter,lang)
    return await getActivitiesCatalog(0,"")


@router.get("/{level}")
async def get__filtered_activities(level: int, filter: Optional[str] = "", lang: Optional[str] = "en"):
    return await getActivitiesCatalog(level,filter)

