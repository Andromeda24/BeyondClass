import os
import json
from typing import Any
from ..services.activity_catalog import getActivitiesCatalog , ActivitiesResponse    
from ..config import settings

# CrewAI v1.15.1
from crewai import Agent, Task, Crew

import yaml
from crewai.tools import BaseTool


# Assume these come from your existing OpenAI Agents SDK setup
# from your_module import activitiesCatalogAgent, translationAgent, Runner
# from your_models import ActivitiesResponse


# ---------------------------------------------------------------------------
# Dummy translation agent placeholder
# You will replace this later with a real OpenAI Agent.
# ---------------------------------------------------------------------------
class DummyTranslationAgent:
    """Placeholder for an OpenAI translation agent."""

    async def translate(self, source_language: str, target_language: str, payload: dict) -> dict:
        """
        Dummy implementation: returns the payload unchanged.
        Later, replace this with a real OpenAI Agent call that:
        - receives JSON
        - translates text fields from source_language to target_language
        - returns JSON with identical structure.
        """
        # TODO: implement real translation via OpenAI Agent SDK
        return [{"name": "Actividad 1", "description": "DescripCION DE LA ACTIVIDAD 1"}, {"name": "Actividad 2", "description": "DescriPCION DE LA ACTIVIDAD 2"}]


translation_agent = DummyTranslationAgent()


async def getTranslatedActivitiesCatalog(level: int, filter: str, language: str) -> ActivitiesResponse:

    """
    Fetches and translates the activities catalog
    Args:
        level: The level of the activities to fetch
        filter: The filter to apply to the activities
        language: The language to translate the activities to
    Returns:
        ActivitiesResponse: The translated activities catalog
    """


    result = await getActivitiesCatalog(level, filter)

    raw = result.final_output
    original_json = json.loads(raw)
    original_catalog = ActivitiesResponse(**original_json)

    translated_json = await translation_agent.translate(
        source_language=settings.DEFAULT_LANGUAGE,
        target_language=language,
        payload=original_catalog.model_dump()
    )

    return ActivitiesResponse(**translated_json)


catalog_tool = BaseTool(
    name="getTranslatedActivitiesCatalog",
    func=lambda:getTranslatedActivitiesCatalog,
    description="Fetches and translates the activities catalog"
)

# ---------------------------------------------------------------------------
# Load YAML metadata
# ---------------------------------------------------------------------------
def load_orchestrator_from_yaml(path: str):
    with open(path, "r") as f:
        config = yaml.safe_load(f)

    agent_cfg = config["agent"]
    tasks_cfg = config["tasks"]

    # Create CrewAI agent
    orchestrator_agent = Agent(
        name=agent_cfg["name"],
        role=agent_cfg["role"],
        goal=agent_cfg["goal"],
        backstory=agent_cfg["backstory"],
        reasoning=None, # No reasoning needed
        tools=[catalog_tool],  # your orchestrator function
    )

    #orchestrator_agent.reasoning = None # No reasoning needed
    print("Agent reasoning:", orchestrator_agent.reasoning)

    # Create CrewAI tasks (metadata only)
    tasks = []
    for t in tasks_cfg:
        tasks.append(Task(
            description=t["description"],
            agent=orchestrator_agent
        ))

    # Build crew
    crew = Crew(
        agents=[orchestrator_agent],
        tasks=tasks,
        verbose=True
    )

    return orchestrator_agent, crew

