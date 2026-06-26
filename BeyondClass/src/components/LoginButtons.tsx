import { loginGoogle, loginMicrosoft } from "../auth/auth";
import { useTranslation } from "react-i18next";

export default function LoginButtons() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
      }}
    >
      <button
        onClick={loginGoogle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer"
        }}
      >
        <img src="/src/assets/google.png" alt="Google" width="20" height="20" />
        {t("loginGoogle")}
      </button>

      <button
        onClick={loginMicrosoft}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer"
        }}
      >
        <img src="/src/assets/microsoft.png" alt="Microsoft" width="20" height="20" />
        {t("loginMicrosoft")}
      </button>
    </div>

  );
}
