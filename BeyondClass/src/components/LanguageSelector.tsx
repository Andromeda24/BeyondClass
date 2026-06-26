import { useTranslation } from "react-i18next";
import { LANGUAGE_MAP } from "../locales/languageConfig";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = import.meta.env.VITE_LANGUAGES
    .split(",")
    .map((l: string) => l.trim());

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {languages.map((lang) => {
        const info = LANGUAGE_MAP[lang];
        if (!info) return null;

        const isActive = i18n.language === lang;

        return (
          <button
            key={lang}
            onClick={() => changeLang(lang)}
            style={{
              border: isActive ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "6px",
              padding: "4px",
              background: "white",
              cursor: "pointer"
            }}
          >
            <img
              src={info.flag}
              alt={info.label}
              width="28"
              height="20"
              style={{ display: "block" }}
            />
          </button>
        );
      })}
    </div>
  );
}