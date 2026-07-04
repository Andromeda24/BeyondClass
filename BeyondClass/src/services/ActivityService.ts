import type {Activity} from "../models/activity";
  
  interface ActivitiesResponse {
    level: number;
    activities: Activity[];
  }
  
  export const fetchActivities = async (
    level: string,
    filter: string,
    lang: string
  ): Promise<Activity[]> => {
    const intlevel = Number(level);
  
    // Read Vite environment variables
    const host = import.meta.env.VITE_API_HOST;
    const port = import.meta.env.VITE_API_PORT;
  
    // Build full backend URL
    const url = `http://${host}:${port}/api/activity/${intlevel}?filter=${encodeURIComponent(
      filter
    )}&lang=${encodeURIComponent(lang)}`;
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`);
    }
  
    const data: ActivitiesResponse = await response.json();
    return data.activities;
  };
  