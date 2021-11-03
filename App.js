import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer} from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "react-navigation-drawer";

import {DrawerContent} from "./pages/NavBar.js";

import {Home} from "./pages/Home.js"
import {Analysis} from "./pages/Analysis.js"
import {Savings} from "./pages/TotalSavings.js"
import {Suggestions} from "./pages/Suggestions.js"
import {Contact} from "./pages/Contact.js"


const Drawer = createDrawerNavigator();



export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name = "Home" component = {Home} />
          <Drawer.Screen name = "Analysis" component = {Analysis} />
          <Drawer.Screen name = "Total Savings" component = {Savings} />
          <Drawer.Screen name = "Suggestions" component = {Suggestions} />
          <Drawer.Screen name = "Contact Us" component = {Contact} />


        </Drawer.Navigator>
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
