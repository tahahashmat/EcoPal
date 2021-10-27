import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>EchoHub Mobile App</Text>
      <Text></Text>
      <Text>Created by:</Text>
      <Text>Taha Hashmat</Text>
      <Text>Mitchell Hicks</Text>
      <Text>Austin Page</Text>
      <Text>Cassidy Linhares</Text>
      <Text>Tolu Elebute</Text>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
