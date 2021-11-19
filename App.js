import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Home from "./screens/Home";
import Tabs from "./navigation/Tabs";
import Household from "./screens/Household";
import Transportation from "./screens/Transportation";
import Diet from "./screens/Diet";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
          <Stack.Screen options={{headerShown: false, gestureEnabled: false, }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Household" component={Household}/>
          <Stack.Screen options={{headerShown: false}} name="Transportation" component={Transportation}/>
          <Stack.Screen options={{headerShown: false}} name="Diet" component={Diet}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
