import React, { useEffect } from 'react';
import {View} from 'react-native';
import { db } from '../firebase'



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
            <View style = {{ flex: 1, paddingBottom: 130 }}>
            </View>
    )
  }

export default Transportation;