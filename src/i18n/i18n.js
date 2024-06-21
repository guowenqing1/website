import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import global_en from "./en/en.json";
import global_ch from "./ch/ch.json";

const resources = {
  en: {
    translation: global_en,
  },
  ch: {
    translation: global_ch,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ch",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
