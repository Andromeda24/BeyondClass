from app.model.activities import BasicActivity
from app.model.students import Student
from app.model.enrollment import Enrollment, EnrollmentInput, ActivityRoster, EnrollmentOutput
from app.services.rostering.enrollmentService import insert_enrollment

async def enrollmentAgent(activityId: str, body: EnrollmentInput):
    "to do: this will be the agent that orchestrates the enrollment pipeline"
    " 1. retrieves the Data of the activity "
    details = BasicActivity (
        id = activityId,
        name = "Ballet",
        weekday = "Monday",
        time = "2:00 p.m."
    )
    " 2. check business rules"
    response = EnrollmentOutput(
        ok= False,
        okmsg ="",
        errormsg ="There is an scheduling conflict with Girls’ Soccer Training"
    )
    return response
    " 3 actually enroll it."
    # await insert_enrollment(details, body)