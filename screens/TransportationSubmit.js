import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TransportationSubmit = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Monthly, Daily</Text>
      <Text>Graph</Text>
      <Text>Submit Button</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("TransportationMenu")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransportationSubmit;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#228B22",
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
