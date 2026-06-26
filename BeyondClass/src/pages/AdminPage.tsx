import Header from "../components/Header";
import { useEffect, useState } from "react";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";


export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => subscribeToAuth(setUser), []);

  return (
    <div>
      <Header user={user} />
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Admin Page</h1>
    </div>
  );
}
