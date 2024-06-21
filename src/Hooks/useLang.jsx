import { useContext } from "react";
import { LangContext } from "../Context/LangContext";

export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("UseUser must be used whitin a CartProvider");
  }
  return context;
};
