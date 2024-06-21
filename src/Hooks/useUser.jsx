import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UseUser must be used whitin a CartProvider");
  }
  return context;
};
