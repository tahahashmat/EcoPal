import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { StateProvider } from "./screens/StateProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
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
