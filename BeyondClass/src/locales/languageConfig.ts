
export interface LanguageInfo {
  label: string;
  flag: string; // image path
}

  
  export const LANGUAGE_MAP: Record<string, LanguageInfo> = {
    "en-US": { label: "English (US)", flag: "/src/assets/flags/en-US.gif" },
    "en-GB": { label: "English (UK)", flag: "/src/assets/flags/en-GB.gif" },
    "sp-ES": { label: "Español", flag: "/src/assets/flags/sp-ES.gif" },
    "de-DE": { label: "Deutsch", flag: "/src/assets/flags/de-DE.gif" }
  };
  