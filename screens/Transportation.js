import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View} from 'react-native';
import { db } from '../firebase'
import TransportationSubmit from "./TransportationSubmit";
import TransportationMenu from "./TransportationMenu";

const Stack = createNativeStackNavigator();

const Transportation = ({ navigation} ) => {
    useEffect(() => {
      var docRef = db.collection("users").doc("hello");

      docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }, [])

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