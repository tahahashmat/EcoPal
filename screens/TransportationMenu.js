import React, { useEffect, useState, useContext } from "react";

import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Overlay } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { StateContext } from "./StateProvider";
import {db, firebase} from "../firebase"

// Helper function to get the current date
const getCurrentDate = () => {

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

// Helper function to remove Item
const removeItem = (arr, val) => {
  let len = arr.length;
  let index;
  for(let i = 0; i < len; i++){
    if(arr[i].value == val){
      console.log(arr[i].label);
      index = i;
    }
  }
  arr.splice(index, 1);
  return  arr
}

const remove = (arr,val) => {
  // Remove from the transportationList
  let array = [...arr]
  let len = array.length;
  let index;
  for(let i = 0; i < len; i++){
    if(array[i].type == val){
      index = i;
    }
  }
  array.splice(index, 1);
  return array
  
  // Add back to the array

}

const TransportationMenu = () => {
  const {
    transportationListItems,
    setTransportationListItems,
    userID,
    transportAmount,
    totalTransportation,
    setTotalTransportation,
  } = useContext(StateContext);
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
    { label: "Taxi or Uber", value: "Taxi or Uber" },
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

  // Adding it to the database
  let currDate = getCurrentDate();
  let docRef = db.collection('userTransportation').doc(userID).collection('data').doc(currDate);
  let totalRef = db
    .collection("totals")
    .doc(userID)
    .collection("data")
    .doc(currDate);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addItem = () => {
    if (value != null && distance > 0) {
      const item = {
        type: value,
        distance: distance,
      };
      
      let docData = {};
      docData[value] = distance;
      
      docRef.update(docData).then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
          docRef.set(docData);
          //console.error("Error writing document: ", error);
      });

      const itemRef = removeItem(items, value);
      setTransportationListItems([...transportationListItems, item]);
      setDistance('');
      setValue(null);
      setItems(itemRef);
      toggleOverlay();

      // Add it to the totals
      let result = transportAmount[item.type] * item.distance;
      let len = transportationListItems.length;

      for (let i = 0; i < len; i++) {
        let label = transportationListItems[i].type;
        let distance = transportationListItems[i].distance;
        result += transportAmount[label] * distance;
      }
      setTotalTransportation(result);

      docData = { totalTransportation: result };

      totalRef
        .update(docData)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          totalRef.set(docData);
          //console.error("Error writing document: ", error);
        });
    } else if (value == null) {
      alert("Please select a transportation method");
    } else if (distance == 0) {
      alert("Please select a valid distance");
    }
  };

  const handleDelete = (item) => {
    let arr = remove(transportationListItems, item.type);
    setTransportationListItems(arr);

    // Adding data to the thing
    let itemsRef = items;
    let data = { label: item.type, value: item.type }
    itemsRef.push(data);
    setItems(itemsRef);
    
    //Removing it from database
    let docData = {};
    docData[item.type] = firebase.firestore.FieldValue.delete();
    docRef.update(docData);

    // Removing from the thing
    let result = totalTransportation;
    result -= transportAmount[item.type] * item.distance;
    setTotalTransportation(result);

    docData = { totalTransportation: result };

    totalRef
      .update(docData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        totalRef.set(docData);
        //console.error("Error writing document: ", error);
      });
  }

  useEffect(() => {
    docRef.get().then((doc) => {
      if (doc.exists) {
          const arr = doc.data();
          const keys = Object.keys(arr);
          
          if(keys != 0){
            let result = [];
            let itemRef;
  
            keys.forEach((key) => {
              const item = {
                type: key,
                distance: arr[key],
              };
              itemRef = removeItem(items, key);
              result.push(item);
            });
  
            setTransportationListItems(result);
            setItems(itemRef);
          }   
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  totalRef.get().then((doc) => {
    if (doc.exists) {
      let arr =doc.data();
      setTotalTransportation(arr["totalTransportation"]);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  }, [])

  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={{ display: "flex", flex: 1,  alignItems: "center", paddingTop: 40,  }}>
      <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20 }}>
        Transportation Events
      </Text>
      {transportationListItems.map((item) => (
        <View style={{ flexDirection: "row",  alignItems: "center", paddingTop: 40,  }}>
        <Text style={{ fontSize: 20 }}>
          {item.type},{item.distance}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={() => handleDelete(item)}>
          <Text style={{color: "white", fontWeight: "bold"}}>Delete</Text>
        </TouchableOpacity>
        </View>
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
            <TextInput value={distance} onChangeText={handleInputChange} keyboardType="numeric" placeholder="00" />
          </View>
    
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      </View>
    </ScrollView>
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
  editButton: {
    backgroundColor: "#228B22",
    width: 100,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 20,
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
