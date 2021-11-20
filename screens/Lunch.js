import React, { useState, useContext } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { StateContext } from "./StateProvider";


const Lunch = () => {
  const { lunchListItems, setLunchListItems } = useContext(StateContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Beef (Cows Meat)", value: "Beef" },
    { label: "Lamb", value: "Lamb" },
    { label: "Shellfish (Shrimp, Scallops, Lobster)", value: "Shellfish" },
    { label: "Fish and Other Seafood", value: "Fish" },
    { label: "Bacon (Pork meat)", value: "Pork" },
    { label: "Chicken and Turkey", value: "Chicken" },
    { label: "Cheese and Yogurt", value: "Cheese" },
    { label: "Milk", value: "Milk" },
    { label: "Eggs", value: "Eggs" },
    { label: "Nuts and Seeds", value: "Nuts" },
    { label: "Peas and Legumes", value: "Peas" },
    { label: "Tofu and Soy based Food", value: "Tofu" },
    { label: "Rice and Quinoa", value: "Rice" },
    { label: "Bread, Pasta, Crackers", value: "Bread" },
    { label: "Oatmeal and Cereal", value: "Oatmeal" },
    { label: "Root Vegtables", value: "rootVegetables" },
    { label: "Other Vegetables", value: "otherVegtables" },
    { label: "Potatoes and Starches", value: "Potato" },
    { label: "Berries & Grapes", value: "Berries" },
    { label: "Other ruits", value: "otherFruits" },
    { label: "Pastries and Baked Goods", value: "Pastries" },
    { label: "Chocolate", value: "Chocolate" },
    { label: "Coffee", value: "Coffee" },
    { label: "Wine and Spirits", value: "Wine" },
    { label: "Beer", value: "Beer" },
  ]);
  const [serving, setServing] = useState(0);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addItem = () => {
    if (value != null && serving > 0) {
      const item = {
        type: value,
        servings: serving,
      };
      setLunchListItems([...lunchListItems, item]);
      setServing(0);
      setValue(null);
      toggleOverlay();
    } else if (value == null) {
      alert("Please select an item");
    } else if (serving == 0) {
      alert("Please select a serving amount");
    }
  };

  return (
    <View style={{ display: "flex", alignItems: "center", paddingTop: 40 }}>
      <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20 }}>
        Food Items
      </Text>
      {lunchListItems.map((item) => (
        <Text style={{ fontSize: 20 }}>
          {item.type},{item.servings}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={toggleOverlay}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <Overlay
        overlayStyle={{ borderRadius: 10, margin: 10 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Items
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Servings
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.raisedSides}
            onPress={() => {
              serving > 0 ? setServing(serving - 1) : null;
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <View style={styles.raisedMiddle}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{serving}</Text>
          </View>
          <TouchableOpacity
            style={styles.raisedSides}
            onPress={() => {
              setServing(serving + 1);
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

export default Lunch;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#228B22",
    width: 300,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 30,
  },
  raisedSides: {
    width: 52,
    height: 52,
    shadowColor: "rgba(0,0,0, .8)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 3, //IOS
    backgroundColor: "#fff",
    elevation: 4, // Android
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
  },
  raisedMiddle: {
    width: 52,
    height: 52,
    shadowColor: "rgba(0,0,0, .8)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 3, //IOS
    backgroundColor: "#fff",
    elevation: 4, // Android
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 4,
    marginRight: 10,
  },
});
