from fastapi import FastAPI
from .routes.activities_router import router as activities_router

app = FastAPI()

app.include_router(activities_router, prefix="/api/activity")
