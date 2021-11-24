import React, { PureComponent, useEffect, useContext, useState } from "react";
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend} from 'victory-native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button} from "react-native";
import {Icon} from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Table, Row, Rows } from 'react-native-table-component';
import {db, firebase} from "../firebase";
import { StateContext } from "./StateProvider";

// Helper function to get the current date
const getCurrentDate = () => {

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

const DietMenu = ({ navigation }) => {
  const {userID} = useContext(StateContext);
  const [graphData, setGraphData] = useState();
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [dateString, setDateString] = useState(getCurrentDate());
  const [items, setItems] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateT = date.getDate();
    let result = dateT + '-' + month + '-' + year;
    setDateString(result);

    var docRef = db.collection("totals").doc(userID).collection("data").doc(result);
    docRef.get().then((doc) => {
      if (doc.exists) {
        let arr=doc.data();
        let test = [
          ["Breakfast", "-"],
          ["Lunch", "-"],
          ["Dinner", "-"]
        ];
        var result = Object.keys(arr).map((key) => {
          if(key.substring(5) === "Breakfast"){
            test[0][1] = arr[key] == 0 ? "-": arr[key];
          } else if(key.substring(5) === "Lunch"){
            test[1][1] = arr[key] == 0 ? "-": arr[key];
          } else if(key.substring(5) === "Dinner"){
            test[2][1] = arr[key] == 0 ? "-": arr[key];
          }
        });
        setItems(test);
      } else {
        let test = [
          ["Breakfast", "-"],
          ["Lunch", "-"],
          ["Dinner", "-"]
        ];
          // doc.data() will be undefined in this case
          setItems(test);
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

    setCurrDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    var docRef = db.collection("totals").doc(userID).collection("data");

    docRef.get().then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let tempData = doc.data();
          let temp = {x: doc.id, y: (tempData["totalBreakfast"] ? tempData["totalBreakfast"]: 0 ) + (tempData["totalLunch"] ? tempData["totalLunch"]: 0 ) + (tempData["totalDinner"] ? tempData["totalDinner"]: 0 )}
          data.push(temp);
      });
      setGraphData(data);
      setShow(true);
    });

    let result = getCurrentDate();
    docRef.doc(result).get().then((doc) => {
      if (doc.exists) {
        let arr=doc.data();
        let test = [
          ["Breakfast", "-"],
          ["Lunch", "-"],
          ["Dinner", "-"]
        ];
        var result = Object.keys(arr).map((key) => {
          if(key.substring(5) === "Breakfast"){
            test[0][1] = arr[key] == 0 ? "-": arr[key];
          } else if(key.substring(5) === "Lunch"){
            test[1][1] = arr[key] == 0 ? "-": arr[key];
          } else if(key.substring(5) === "Dinner"){
            test[2][1] = arr[key] == 0 ? "-": arr[key];
          }
        });
        setItems(test);
      } else {
        let test = [
          ["Breakfast", "-"],
          ["Lunch", "-"],
          ["Dinner", "-"]
        ];
          // doc.data() will be undefined in this case
          setItems(test);
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  }, [])
  return (
    <>
    <View style={{ flex: 1,
    marginTop: 50,
    alignItems: "center",
    }}>
    <Text style={styles.title}>Past Week</Text>
    <View style={{marginBottom:30}}>
      {show ? ( <VictoryChart width={350}  domainPadding={{ x: 50 }}>
        <VictoryGroup offset={0} >
          <VictoryBar
            barWidth={20}
            data={graphData}
            style={{
              data: {
                fill: 'green',
              },
            }}
            barRatio={0.8}
            animate={{
              duration: 500,
            }}
          />
        </VictoryGroup>
        <VictoryLegend
          x={100}
          orientation="horizontal"
          alignItems = "center"
          gutter={10}
          data={[
            {
              name: 'CO2 Consumption',
              symbol: {
                fill: 'green',
              },
            },
          ]}
       />
      </VictoryChart>) : ( null)}
        </View>
  <TouchableOpacity onPress={showDatePicker} style={{color: "white",marginBottom: 20, backgroundColor: "green", padding: 10, borderRadius: 10}}>
    <Text style={{fontWeight: "bold", fontSize: "20", color: "white"}}>{dateString}</Text>
  </TouchableOpacity>
  <View style={styles.wrapper}>
            <Text style={styles.row1}> Diet </Text>
            <Text style={styles.row1}> CO2 consumed </Text>   
  </View>
  {items.map((item) => (
    item[0] != "Transportation" ?  
    (<View style={styles.wrapper}>
      <Text style={styles.row2}> {item[0]} </Text>
      <Text style={styles.row3}> {item[1]} </Text>            
    </View>) : (null)
  ))}
  </View>
  <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    date={currDate}
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
  />
  <TouchableOpacity style={styles.floatingActionButton} onPress={() => navigation.navigate("DietSubmit")}>
    <Icon name='add' color="white"/>
  </TouchableOpacity>
  </>
  );
};

export default DietMenu;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#228B22",
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  title: {
    marginTop: 18,
    fontSize: 20,
    alignSelf: "center",
    fontWeight: 'bold',
    marginBottom: 20,
  },

  floatingActionButton: {
    backgroundColor: 'green',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 25,
    right: 10,
    borderRadius:100,
    justifyContent:'center',
    alignItems: 'center',
  },
  tableList:{
    flex:1,
    width: '100%',
    justifyContent: 'center',
  },

  wrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderBottomWidth: 1,  
  },

  row1:{
    width:'100%',
    flex:1,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    alignItems: "center",
    fontWeight: "bold"
  },
  
  row2:{
    width:'100%',
    flex:1,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    alignItems: "center",
  },
  
  row3:{
    width:'100%',
    flex:1,
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginLeft: 70,
    alignItems: "center",
  },
});
