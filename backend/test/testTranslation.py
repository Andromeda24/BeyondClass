from app.services.translator import translateActivityList
import asyncio

def test_translate():
    activities = [
        {"name": "Watercolor Painting Class", "description": "Learn watercolor basics"}
    ]

    # Run the async function synchronously
    result = asyncio.run(translateActivityList(activities, "es-ES"))
    print(result)

if __name__ == "__main__":
    test_translate()
