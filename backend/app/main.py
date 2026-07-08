from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from .routes.activities_router import router as activities_router
from app.routes.enrollment_router import router as enrollment_router
from app.init_db import init_db

from fastapi import FastAPI
from app.model.enrollment import  Enrollment

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db([Enrollment])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # allow all origins
    allow_credentials=True,
    allow_methods=["*"],          # allow GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],          # allow all headers
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    errors = []
    for err in exc.errors():
        errors.append({
            "field": ".".join(str(x) for x in err["loc"]),
            "message": err["msg"],
            "type": err["type"]
        })

    return JSONResponse(
        status_code=422,
        content={"detail": errors}
    )

app.include_router(activities_router, prefix="/api/activity")
app.include_router(enrollment_router, prefix="/api/enrollment")


