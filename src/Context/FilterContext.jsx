import { useState, createContext } from "react";
//.1. CREAR EL CONTEXTO
//ESTE ES EL CONTEXTO QUE SE CONSUME
export const FiltersContext = createContext();

//2. PROVEER EL CONTEXTO
//ESTE ES EL CONTEXTO QUE NOS OFRECEN DE ACCESO
export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({ subStatus: "all" });
  return (
    <FiltersContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
