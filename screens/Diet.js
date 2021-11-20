import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DietMenu from "./DietMenu";
import DietSubmit from "./DietSubmit";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";

const Stack = createNativeStackNavigator();

const Diet = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="DietMenu"
        component={DietMenu}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DietSubmit"
        component={DietSubmit}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Breakfast"
        component={Breakfast}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Lunch"
        component={Lunch}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dinner"
        component={Dinner}
      />
    </Stack.Navigator>
  );
};

export default Diet;
