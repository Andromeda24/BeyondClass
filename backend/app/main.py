from fastapi import FastAPI
from .routes.activities_router import router as activities_router
##from .services.translatedCatalog import load_orchestrator_from_yaml

app = FastAPI()
app.include_router(activities_router, prefix="/api/activity")

##orchestrator_agent, crew = load_orchestrator_from_yaml("./app/services/Config/translatedCatalog.yaml")
##print("Orchestrator agent:", orchestrator_agent)
##print("Crew:", crew)