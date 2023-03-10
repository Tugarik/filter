import { createContext, useContext, useState } from "react";

const AllContexts = createContext(null);

export function useDataContext() {
  return useContext(AllContexts);
}

export default function DataContext({ children }) {
  const [current, setCurrent] = useState(
    JSON.parse(localStorage.getItem("menu")) || 0
  );
  const [filter, setFilter] = useState("5");
  const [data, setData] = useState();
  const [isDesc, setIsDesc] = useState();
  const [portion, setPortion] = useState(1);

  return (
    <AllContexts.Provider
      value={{
        current,
        setCurrent,
        filter,
        setFilter,
        data,
        setData,
        isDesc,
        setIsDesc,
        portion,
        setPortion,
      }}
    >
      {children}
    </AllContexts.Provider>
  );
}
