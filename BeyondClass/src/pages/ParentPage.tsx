import Header from "../components/Header";
import { useEffect, useState } from "react";
import { subscribeToAuth } from "../auth/auth";
import  type { User } from "firebase/auth";
import { useTranslation } from "react-i18next";


export default function ParentPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => subscribeToAuth(setUser), []);
  const { t } = useTranslation();

  return (
    <div>
      <Header user={user} />
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>{t("activities.explore")}</h1>
    </div>
  );
}
