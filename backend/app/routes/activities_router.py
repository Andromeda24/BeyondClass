from fastapi import APIRouter, HTTPException
from typing import Optional

from ..services.translatedCatalog import gettranslatedActivitiesCatalog
##from ..services.activity_catalog import getActivitiesCatalog
from ..config import settings

router = APIRouter()


@router.get("")
async def get_activityList(lang: Optional[str] = settings.DEFAULT_LANGUAGE):
    print("GET recibido con lang:", lang)

    try:
        return await gettranslatedActivitiesCatalog(-2, "", lang)
    except Exception as e:
        # Log the real error for debugging
        print("❌ Error in get_activityList:", str(e))

        # Return a clean HTTP error to the client
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve translated activities catalog: {str(e)}"
        )


@router.get("/{level}")
async def get_filtered_activities(
    level: int,
    filter: Optional[str] = "",
    lang: Optional[str] = settings.DEFAULT_LANGUAGE
):
    print("GET recibido con level:", level, "filter:", filter, "lang:", lang)

    try:
        return await gettranslatedActivitiesCatalog (level, filter,lang)
        #return await getActivitiesCatalog(level, filter)
    except Exception as e:
        print("❌ Error in get_filtered_activities:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve translated activities catalog: {str(e)}"
        )

