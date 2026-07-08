from app.services.enrollService import init_db
from app.model.enrollment import Enrollment, CostItem


async def create_sample_enrollment():
    enrollment = Enrollment(
        
        activityid="11",
        activityName="Girl's Soccer",
        studentid="stu123",
        studentFullName="Jane Doe",
        studentDisplayName="Jane",
        weekday="Monday",
        time="15:00",
        cost=[CostItem(concept="registration", value=50.0)],
        status="active"
    )

    await enrollment.insert()

if __name__ == "__main__":
    init_db()
    create_sample_enrollment()