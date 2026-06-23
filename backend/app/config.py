from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_URI: str
    OPENAI_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()

## Agents require the key in the environment
import os
os.environ["OPENAI_API_KEY"] = settings.OPENAI_API_KEY
openai_api_key = os.getenv('OPENAI_API_KEY')
if not openai_api_key:
    print(f"OpenAI API Key not found")
