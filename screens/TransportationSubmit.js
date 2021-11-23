import React, { PureComponent, useEffect, useContext, useState } from "react";
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend} from 'victory-native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {Icon} from 'react-native-elements';
import {db, firebase} from "../firebase";
import { StateContext } from "./StateProvider";



const TransportationSubmit = ({ navigation }) => {
  const {userID} = useContext(StateContext);
  const [graphData, setGraphData] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    var docRef = db.collection("totals").doc(userID).collection("data");

    docRef.get().then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let tempData = doc.data();
          let temp = {x: doc.id, y: tempData["totalTransportation"]}
          data.push(temp);
      });
      setGraphData(data);
      setShow(true);
  });
  }, [])
  return (
    <>
    <View style={{ flex: 1,
    marginTop: 50,
    alignItems: "center",
    }}>
    
    <Text style={styles.title}>Past Week</Text>
    <View>
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
          alignItems='center'
          gutter={20}
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
  </View>

  
  <TouchableOpacity style={styles.floatingActionButton} onPress={() => navigation.navigate("TransportationMenu")}>
     
    <Icon name='add' color="white"/>
    
  </TouchableOpacity>


  
  </>
  );
};

export default TransportationSubmit;

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
    bottom: 45,
    right: 10,
    borderRadius:100,
    justifyContent:'center',
    alignItems: 'center',
  },
});
