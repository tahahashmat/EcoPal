import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { Overlay } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { StateContext } from "./StateProvider";


const TransportationMenu = () => {
  const { transportationListItems, setTransportationListItems } = useContext(StateContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Domestic Flight", value: "Domestic Flight" },
    { label: "Long Haul Flight", value: "Long Haul Flight" },
    { label: "Car (1 passenger)", value: "Car (1 passenger)" },
    { label: "Bus", value: "Bus" },
    { label: "Car (4 passenger)", value: "Car (4 passenger)" },
    { label: "Domestic Rail", value: "Domestic Rail" },
    { label: "Coach Bus", value: "Coach Bus" },
    { label: "Electric Vehicle", value: "Electric Vehicle" },
    { label: "Taxi/Uber", value: "Taxi/Uber" },
    { label: "Motorbike", value: "Motorbike" },
    { label: "Bike", value: "Bike" },
    { label: "Walk", value: "Walk" },
  ]);
  const [distance, setDistance] = useState('');

  const handleInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      setDistance(text);
    }
  }


  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addItem = () => {
    if (value != null && distance > 0) {
      const item = {
        type: value,
        distance: distance,
      };
      setTransportationListItems([...transportationListItems, item]);
      setDistance('');
      setValue(null);
      toggleOverlay();
    } else if (value == null) {
      alert("Please select a transportation method");
    } else if (distance == 0) {
      alert("Please select a valid distance");
    }
  };

  return (
    <View style={{ display: "flex", alignItems: "center", paddingTop: 40 }}>
      <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20 }}>
        Transportation Events
      </Text>
      {transportationListItems.map((item) => (
        <Text style={{ fontSize: 20 }}>
          {item.type},{item.distance}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={toggleOverlay}>
        <Text style={styles.buttonText}>Add Event</Text>
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
          Transportation Method 
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
          Distance
        </Text>
        <View style={{ flexDirection: "row" }}>

          <View style={styles.raisedMiddle}>
            <TextInput value={distance} onChangeText={handleInputChange} keyboardType="numeric" placeholder="000" />
          </View>
    
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

export default TransportationMenu;

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
