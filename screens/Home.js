import React, { useState } from "react";
import { NavigationHelpersContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainShow from "./MainShow";
import Household from "./Household";
import Transportation from "./Transportation";
import Diet from "./Diet";

const HomeStack = createNativeStackNavigator();

const Home = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="MainScreen"
        component={MainShow}
      />
      <HomeStack.Screen options={{}} name="Household" component={Household} />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Transportation"
        component={Transportation}
      />
      <HomeStack.Screen options={{headerShown: false}} name="Diet" component={Diet} />
    </HomeStack.Navigator>
  );
};

export default Home;
