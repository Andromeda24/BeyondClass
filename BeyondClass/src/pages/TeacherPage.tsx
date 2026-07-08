import Header from "../components/Header";
import { useEffect, useState } from "react";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

export default function ParentPage() {

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
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Teacher's Page</h1>
    </div>
  );
}
