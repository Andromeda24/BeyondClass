import ActivityExplorer from "../components/ActivityExplorer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";
//import {fetchActivities} from "../services/MockActivityService"
import { fetchActivities } from "../services/ActivityService";
import {students} from "../services/MockUserService"
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

export const ParentPage = () => {

  const navigate = useNavigate();

  const logoutRedirect = async () => {
    await logout();     // Firebase signOut
    navigate("/");      // Redirect to HomePage
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => subscribeToAuth(setUser), []);


  return (
    <div>
      <Header user={user} logoutRedirect={logoutRedirect} />
      <ActivityExplorer
        students={students}
        fetchActivities={fetchActivities}
    />
    </div>
    
  );
};
