import React, { useState, createContext, useEffect } from "react";
import {db, firebase} from "../firebase"

const dietAmount = {
  "Beef (Cows Meat)": 7461,
  "Chocolate": 1400,
  "Lamb": 2979,
  "Coffee": 4993,
  "Shellfish (Shrimp, Scallops, Lobster)": 2015,
  "Cheese and Yogurt": 1194,
  "Fish and Other Seafood": 1022,
  "Bacon (Pork meat)": 923,
  "Chicken and Turkey": 740,
  "Eggs": 560,
  "Rice and Quinoa": 445,
  "Nuts and Seeds": 129,
  "Tofu and Soy Based Food": 474,
  "Milk": 756,
  "Oatmeal and Cereal": 248,
  "Other Vegetables": 45,
  "Beer": 518,
  "Wine and Spirits": 358,
  "Bread, Pasta, Crackers": 133,
  "Berries & Grapes": 176,
  "Other Fruits": 121,
  "Peas and Legumes": 147,
  "Root Vegtables": 37,
  "Juice": 121,
  "Pastries and Baked Goods": 63,
  "Potatoes and Starches": 39,
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
  "Taxi or Uber" : 244,
  "Motorbike" : 126,
  "Bike" : 8,
  "Walk" : 0,
}

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [userID, setUserID] = useState("");
  const [breakfastListItems, setBreakfastListItems] = useState([]);
  const [lunchListItems, setLunchListItems] = useState([]);
  const [dinnerListItems, setDinnerListItems] = useState([]);
  const [transportationListItems, setTransportationListItems] = useState([]);
  const [totalDiet, setTotalDiet] = useState(0);
  const [totalBreakfast, setTotalBreakfast] = useState(0);
  const [totalLunch, setTotalLunch] = useState(0);
  const [totalDinner, setTotalDinner] = useState(0);
  const [totalTransportation, setTotalTransportation] = useState(0);
  // Value's that goes through to all components
  const value = {
    userID,
    dietAmount,
    transportAmount,
    breakfastListItems,
    lunchListItems,
    dinnerListItems,
    transportationListItems,
    totalTransportation,
    totalLunch,
    totalDinner,
    totalBreakfast,
    setUserID,
    setBreakfastListItems,
    setLunchListItems,
    setDinnerListItems,
    setTransportationListItems,
    setTotalTransportation,
    setTotalDiet,
    setTotalBreakfast,
    setTotalLunch,
    setTotalDinner
  };

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};
