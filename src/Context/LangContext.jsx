import { createContext, useEffect, useState } from "react";
import i18n from "../i18n/i18n";
import i18next from "i18next";

export const LangContext = createContext();
const langInit = i18n.options.lng;
export function LangProvider({ children }) {
  const initialUserData = localStorage.getItem("lang");
  const [lang, setLang] = useState(
    initialUserData ? initialUserData : langInit
  );

  i18next.changeLanguage(lang);

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    console.log(localStorage.getItem("lang"));
  };
  return (
    <LangContext.Provider value={{ lang, setLang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}
