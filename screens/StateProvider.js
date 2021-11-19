import React, { useState, createContext, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [listItems, setListItems] = useState([]);

  // Value's that goes through to all components
  const value = {
    listItems,
    setListItems,
  };

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};
