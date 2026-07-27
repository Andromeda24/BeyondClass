import type {Student , Activity} from "../models/activity";
import type { EnrollActivityInput, EnrollActivityOutput } from "../models/enrollment";
import type { SessionItem } from "../models/schedule";  
import { useTranslation } from "react-i18next";

export const enrollActivity = async (
    activity: Activity,
    student: Student
  ): Promise<SessionItem[]> => {
  

    const newEnrollment: EnrollActivityInput = {
        "student": {
           "id": "stu123",
            "displayName": "Jane",
            "fullName": "Jane Doe",
            "level":4,
            "parent":"beyondclass50@gmail.com"
        },
        "optionals": [
          { "id": "registration", "concept": "registration", "value": 50 }
        ]
      }
    // Read Vite environment variables
    const host = import.meta.env.VITE_API_HOST;
    const port = import.meta.env.VITE_API_PORT;
  
    // Build full backend URL
    const url = `http://${host}:${port}/api/enrollment/${activity.id}`;
      console.log(url)
      console.log(JSON.stringify(newEnrollment))
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newEnrollment)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to enroll: ${response.statusText}`);
    }
  
    const actualResult: EnrollActivityOutput = await response.json();
  
    if (!actualResult.ok) {
      throw new Error(actualResult.errormsg);
    }
  
  };
  