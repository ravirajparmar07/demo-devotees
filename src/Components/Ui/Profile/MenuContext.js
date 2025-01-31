import React, { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <MenuContext.Provider value={{ menu, setMenu, handleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
