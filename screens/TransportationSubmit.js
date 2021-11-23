import React, { PureComponent } from "react";
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend} from 'victory-native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {Icon} from 'react-native-elements'

const TransportationSubmit = ({ navigation }) => {
  return (
    <>
    
    <View style={{ flex: 1, marginTop: 50}}>
    
    <Text style={styles.title}>Past Week</Text>
    <View>
      <VictoryChart>
        <VictoryGroup offset={20}>
          <VictoryBar data={dailydata.actual}
            data={dailydata.actual}
            style={{
              data: {
                fill: 'green',
              },
            }}
          />
          <VictoryBar 
          data={dailydata.planned}
          style={{
            data: {
              fill: 'orange',
            },
          }} />
        </VictoryGroup>
        <VictoryLegend
          x={Dimensions.get('screen').width / 2 - 100}
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
            {
              name: 'Target',
              symbol: {
                fill: 'orange',
              },
            },
          ]}
       />
      </VictoryChart>
    </View>


{/*
  <Text style={styles.title}>Past 6 Months</Text>
    <View>
      <VictoryChart>
        <VictoryGroup offset={20}>
          <VictoryBar data={monthlydata.actual}
            data={monthlydata.actual}
            style={{
              data: {
                fill: 'green',
              },
            }}
          />
          <VictoryBar 
          data={monthlydata.planned}
          style={{
            data: {
              fill: 'orange',
            },
          }} />
        </VictoryGroup>
        <VictoryLegend
          x={Dimensions.get('screen').width / 2 - 100}
          orientation="horizontal"
          gutter={20}
          data={[
            {
              name: 'CO2 Consumption',
              symbol: {
                fill: 'green'
              },
            },
            {
              name: 'Target',
              symbol: {
                fill: 'orange'
            },
            },
          ]}
      
       />
      </VictoryChart>
    </View>

        */}
        
  </View>

  
  <TouchableOpacity style={styles.floatingActionButton} onPress={() => navigation.navigate("TransportationMenu")}>
     
    <Icon name='add' color="white"/>
    
  </TouchableOpacity>


  
  </>
  );
};

const dailydata = {
  planned: [null, 
    {x: 'Mon', y: 30},
    {x: 'Tues', y: 30},
    {x: 'Wed', y: 30},
    {x: 'Thurs', y: 30},
    {x: 'Fri', y: 30},
    {x: 'Sat', y: 30},
    {x: 'Sun', y: 30},
  ],
  actual: [
    {x: 'Mon', y:50},
    {x: 'Tues', y:80},
    {x: 'Wed', y:45},
    {x: 'Thurs', y:30},
    {x: 'Fri', y:55},
    {x: 'Sat', y:55},
    {x: 'Sun', y:55},    
  ],
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
