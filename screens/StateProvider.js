import React, { useState, createContext, useEffect } from "react";

const carbonAmount = {
  "Beef": 2984,
  "Chocolate": 933,
  "Lamb": 1192,
  "Coffee": 1427,
  "Shellfish": 806,
  "Cheese": 716,
  "Fish": 409,
  "Pork": 369,
  "Chicken": 296,
  "Eggs": 140,
  "Rice": 178,
  "Nuts": 162,
  "Tofu": 16,
  "Milk": 269,
  "Oatmeal": 788,
  "otherVegetables": 99,
  "Beer": 178,
  "Wine": 9,
  "Bread": 358,
  "Berries": 68,
  "otherFruit": 63,
  "Peas": 122,
  "rootVegetables": 47,
  "Juice": 105,
  "Pastries": 34,
  "Potato": 245,
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
  const [breakfastListItems, setBreakfastListItems] = useState([]);
  const [lunchListItems, setLunchListItems] = useState([]);
  const [dinnerListItems, setDinnerListItems] = useState([]);
  const [transportationListItems, setTransportationListItems] = useState([]);

  // Value's that goes through to all components
  const value = {
    carbonAmount,
    transportAmount,
    breakfastListItems,
    lunchListItems,
    dinnerListItems,
    transportationListItems,
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
