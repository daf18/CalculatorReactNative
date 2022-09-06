import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class InputButton extends Component {
  render() {
    const { value, handleOnPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleOnPress(value)}
      >
        <Text style={styles.btnText}>{value}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
    alignContent: "center",
  },
});
