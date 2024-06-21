import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const initialUserData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUserData ? initialUserData : "");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
