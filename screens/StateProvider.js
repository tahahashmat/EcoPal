import React, { useState, createContext, useEffect } from "react";

const carbonAmount = {
  "Beef (Cows Meat)": 2984,
  "Chocolate": 933,
  "Lamb": 1192,
  "Coffee": 1427,
  "Shellfish (Shrimp, Scallops, Lobster)": 806,
  "Cheese and Yogurt": 716,
  "Fish and Other Seafood": 409,
  "Bacon (Pork meat)": 369,
  "Chicken and Turkey": 296,
  "Eggs": 140,
  "Rice and Quinoa": 178,
  "Nuts and Seeds": 162,
  "Tofu and Soy Based Food": 16,
  "Milk": 269,
  "Oatmeal and Cereal": 788,
  "Other Vegetables": 99,
  "Beer": 178,
  "Wine and Spirits": 9,
  "Bread, Pasta, Crackers": 358,
  "Berries & Grapes": 68,
  "Other Fruits": 63,
  "Peas and Legumes": 122,
  "Root Vegtables": 47,
  "Juice": 105,
  "Pastries and Baked Goods": 34,
  "Potatoes and Starches": 245,
};

const transportAmount = {
  "Domestic Flight": 240,
  "Long Haul Flight": 195,
  "Car (1 passenger)": 194,
  "Bus" : 99,
  "Car (4 passenger)": 48,
  "Domestic Rail": 46,
  "Coach Bus": 29,
  "Electric Vehicle": 80,
  "Taxi/Uber" : 244,
  "Motorbike" : 126,
  "Bike" : 8,
  "Walk" : 0
}

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [userID, setUserID] = useState("");
  const [breakfastListItems, setBreakfastListItems] = useState([]);
  const [lunchListItems, setLunchListItems] = useState([]);
  const [dinnerListItems, setDinnerListItems] = useState([]);
  const [transportationListItems, setTransportationListItems] = useState([]);

  // Value's that goes through to all components
  const value = {
    userID,
    carbonAmount,
    transportAmount,
    breakfastListItems,
    lunchListItems,
    dinnerListItems,
    transportationListItems,
    setUserID,
    setBreakfastListItems,
    setLunchListItems,
    setDinnerListItems,
    setTransportationListItems
  };

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};
