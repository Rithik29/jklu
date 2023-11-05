import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const StateContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userType, setUserType] = useState("user");
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  return (
    <Context.Provider
      value={{cart, setCart, userType, setUserType, name, setName, customerId, setCustomerId}}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);

export default StateContext;
