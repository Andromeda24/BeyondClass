import os
from beanie import init_beanie, Document
from pymongo import AsyncMongoClient

# Import ALL your Beanie models here
from app.model.enrollment import Enrollment
from app.config import settings

async def init_db(models):
    uri = settings.MONGODB_URI
    db_name = settings.MONGODB_DB
    try:
        # Create Async PyMongo client
        client = AsyncMongoClient(uri)

        # Initialize beanie with the Sample document class and a database
        await init_beanie(
            database=client[db_name],
            document_models=models
        )


    except Exception as e:
        print("❌ Error during init_db():", e)
        raise  # rethrow so FastAPI startup fails visibly


