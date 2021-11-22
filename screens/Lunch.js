import React, { useEffect, useState, useContext } from "react";

import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
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
  // Remove from the breakfastList
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

const Lunch = () => {
  const { lunchListItems, setLunchListItems , userID, dietAmount, totalLunch,setTotalLunch  } = useContext(StateContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Beef (Cows Meat)", value: "Beef (Cows Meat)" },
    { label: "Lamb", value: "Lamb" },
    { label: "Shellfish (Shrimp, Scallops, Lobster)", value: "Shellfish (Shrimp, Scallops, Lobster)" },
    { label: "Fish and Other Seafood", value: "Fish and Other Seafood" },
    { label: "Bacon (Pork meat)", value: "Bacon (Pork meat)" },
    { label: "Chicken and Turkey", value: "Chicken and Turkey" },
    { label: "Cheese and Yogurt", value: "Cheese and Yogurt" },
    { label: "Milk", value: "Milk" },
    { label: "Eggs", value: "Eggs" },
    { label: "Nuts and Seeds", value: "Nuts and Seeds" },
    { label: "Peas and Legumes", value: "Peas and Legumes" },
    { label: "Tofu and Soy Based Food", value: "Tofu and Soy Based Food" },
    { label: "Rice and Quinoa", value: "Rice and Quinoa" },
    { label: "Bread, Pasta, Crackers", value: "Bread, Pasta, Crackers" },
    { label: "Oatmeal and Cereal", value: "Oatmeal and Cereal" },
    { label: "Root Vegtables", value: "Root Vegtables" },
    { label: "Other Vegetables", value: "Other Vegetables" },
    { label: "Potatoes and Starches", value: "Potatoes and Starches" },
    { label: "Berries & Grapes", value: "Berries & Grapes" },
    { label: "Other Fruits", value: "Other Fruits" },
    { label: "Pastries and Baked Goods", value: "Pastries and Baked Goods" },
    { label: "Chocolate", value: "Chocolate" },
    { label: "Coffee", value: "Coffee" },
    { label: "Wine and Spirits", value: "Wine and Spirits" },
    { label: "Beer", value: "Beer" },
  ]);
  const [serving, setServing] = useState(0);

    // Adding it to the database
    let currDate = getCurrentDate();
    let docRef = db.collection('userDiet').doc(userID).collection('lunch').doc(currDate);
    let totalRef = db
    .collection("totals")
    .doc(userID)
    .collection("data")
    .doc(currDate);


    const toggleOverlay = () => {
      setVisible(!visible);
    };
  
    const addItem = () => {
      if (value != null && serving > 0) {
        const item = {
          type: value,
          servings: serving,
        };
        
        let docData = {};
        docData[value] = serving;
        
        docRef.update(docData).then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
            docRef.set(docData);
            //console.error("Error writing document: ", error);
        });
  
        const itemRef = removeItem(items, value);
        setLunchListItems([...lunchListItems, item]);
        setServing(0);
        setValue(null);
        setItems(itemRef);
        toggleOverlay();

        let result = dietAmount[item.type] * item.servings;
        console.log(result);
        let len = lunchListItems.length;
  
        for (let i = 0; i < len; i++) {
          let label = lunchListItems[i].type;
          let servings = lunchListItems[i].servings;
          result += dietAmount[label] * servings;
        }
        setTotalLunch(result);
  
        docData = { totalLunch: result };
  
        totalRef
          .update(docData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            totalRef.set(docData);
          });   
      } else if (value == null) {
        alert("Please select an item");
      } else if (serving == 0) {
        alert("Please select a serving amount");
      }
    };
  
    const handleDelete = (item) => {
      let arr = remove(lunchListItems, item.type);
      setLunchListItems(arr);
  
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
      let result = totalLunch;
      result -= dietAmount[item.type] * item.servings;
      setTotalLunch(result);

      docData = { totalLunch: result };

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
                  servings: arr[key],
                };
                itemRef = removeItem(items, key);
                result.push(item);
              });
    
              setLunchListItems(result);
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
        setTotalLunch(arr["totalLunch"]);
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
        Food Items
      </Text>
      {lunchListItems.map((item) => (
        <View style={{ flexDirection: "row",  alignItems: "center", paddingTop: 40,  }}>
        <Text style={{ fontSize: 20 }}>
          {item.type},{item.servings}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={() => handleDelete(item)}>
          <Text style={{color: "white", fontWeight: "bold"}}>Delete</Text>
        </TouchableOpacity>
        </View>
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
    </ ScrollView>
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
