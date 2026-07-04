from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.activities_router import router as activities_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # allow all origins
    allow_credentials=True,
    allow_methods=["*"],          # allow GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],          # allow all headers
)
app.include_router(activities_router, prefix="/api/activity")

