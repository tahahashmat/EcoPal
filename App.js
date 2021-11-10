import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Tabs from "./navigation/Tabs";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
          <Stack.Screen options={{ headerShown: false, gestureEnabled: false, }} name="Home" component={HomeScreen} />
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
