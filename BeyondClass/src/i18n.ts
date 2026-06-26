import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./locales/en-US/translation.json";
import enGB from "./locales/en-GB/translation.json";
import spES from "./locales/sp-ES/translation.json";
import deDE from "./locales/de-DE/translation.json";

const savedLang = localStorage.getItem("lang") || "en-US";

const resources = {
  "en-US": { translation: enUS },
  "en-GB": { translation: enGB },
  "sp-ES": { translation: spES },
  "de-DE": { translation: deDE }
};

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en-US",
  resources
});

export default i18n;
