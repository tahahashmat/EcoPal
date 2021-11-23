import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View} from 'react-native';
import { db } from '../firebase'
import TransportationSubmit from "./TransportationSubmit";
import TransportationMenu from "./TransportationMenu";

const Stack = createNativeStackNavigator();

const Transportation = ({ navigation} ) => {
    return (
      <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TransportationSubmit"
        component={TransportationSubmit}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TransportationMenu"
        component={TransportationMenu}
      />
    </Stack.Navigator>
    )
  }

export default Transportation;