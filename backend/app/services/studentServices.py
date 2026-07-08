from typing import List
from app.model.enrollment import Enrollment
from app.model.activities import BasicActivity, ActivitySchedule, Schedule


async def readSchedule(studentId: str) -> Schedule:
    # 1. Query all enrollments for this student
    enrollments = await Enrollment.find(
        Enrollment.student.studentId == studentId
    ).to_list()

    # 2. Build the list of ActivitySchedule items
    schedule_items: List[ActivitySchedule] = []

    for en in enrollments:
        activity: BasicActivity = en.activity

        schedule_items.append(
            ActivitySchedule(
                name=activity.name,
                weekday=activity.weekday,
                time=activity.time
            )
        )

    # 3. Return the schedule
    return Schedule(activities=schedule_items)
