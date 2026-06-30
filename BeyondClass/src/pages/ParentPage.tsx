import ActivityExplorer from "../components/ActivityExplorer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";
import {fetchActivities} from "../services/MockActivityService"
import {students} from "../services/MockUserService"

export const ParentPage = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => subscribeToAuth(setUser), []);


  return (
    <div>
      <Header user={user} />
      <ActivityExplorer
        students={students}
        fetchActivities={fetchActivities}
    />
    </div>
    
  );
};
