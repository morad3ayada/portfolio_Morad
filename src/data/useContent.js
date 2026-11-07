import { useLanguage } from "../i18n/LanguageContext";
import * as en from "./content";
import * as ar from "./content.ar";

export function useContent() {
  const { lang } = useLanguage();
  const data = lang === "ar" ? ar : en;
  return {
    projects: data.projects,
    skills: data.skills,
    services: data.services,
    process: data.process,
    experience: data.experience,
    personalInfo: data.personalInfo,
  };
}
