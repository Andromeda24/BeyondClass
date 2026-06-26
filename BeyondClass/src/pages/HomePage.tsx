import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoginButtons from "../components/LoginButtons";
import { subscribeToAuth } from "../auth/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    return subscribeToAuth(setUser);
  }, []);

  return (
    <div>
      <Header user={user} />

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <img src="/src/assets/BClogo.svg" alt="logo" width="120" />
        <h1>Beyond Class</h1>
        <h2>{t("appSlogan")}</h2>
        {!user && <LoginButtons />}

        {user && (
          <div style={{ marginTop: "30px" }}>
            <button onClick={() => navigate("/parent")}>{t("parents")}</button>
            <button onClick={() => navigate("/teacher")} style={{ marginLeft: "10px" }}>
              {t("teachers")}
            </button>
            <button onClick={() => navigate("/admin")} style={{ marginLeft: "10px" }}>
              {t("staff")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
