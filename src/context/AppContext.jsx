import React, { createContext, useContext, useState } from "react";
import { transactions as initialData } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(initialData);

  return (
    <AppContext.Provider value={{ role, setRole, transactions, setTransactions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);