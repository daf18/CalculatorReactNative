import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputButton from "./InputButton";

const buttons = [
  ["C", "+-", "<-", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: "0",
      operator: null,
      firstValue: "",
      secondValue: "",
      nextValue: false,
    };
    this.state = this.initialState;
  }

  renderButtons() {
    let display = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <InputButton
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this, buttonItems)}
            key={"btn-" + buttonIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={"row-" + index}>
          {rowItem}
        </View>
      );
    });
    return display;
  }

  handleInput = (input) => {
    const { displayValue, operator, firstValue, secondValue, nextValue } =
      this.state;
    switch (input) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.setState({
          displayValue: displayValue === "0" ? input : displayValue + input,
        });
        if (!nextValue) {
          firstValue: firstValue + input;
        } else {
          secondValue: secondValue + input;
        }
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        this.setState({
          nextValue: true,
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substring(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;
      case "+-":
        let sign = displayValue.slice(0, 1);
        this.setState({
          displayValue: sign !== "-" ? displayValue * -1 : displayValue,
        });

        break;
      case ".":
        //optaining the last character
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== "." ? displayValue + input : displayValue,
        });
        if (!nextValue) {
          firstValue: firstValue + input;
        } else {
          secondValue: secondValue + input;
        }
        break;
      case "=":
        console.log(displayValue + "Display");
        let result = eval(displayValue);
        //let myString = displayValue.split("+","-")
        //let result = 20;
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          secondValue: "",
          operator: null,
          nextValue: false,
        });
        break;

      case "C":
        this.setState(this.initialState);
        break;
      case "<-":
        let text = displayValue.toString();
        let deleteText = text.substring(0, text.length - 1);
        let length = text.length;
        this.setState({
          displayValue: length == 1 ? "0" : deleteText,
          firstValue: length == 1 ? "" : deleteText,
        });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
        </View>
        <View style={styles.inputContainer}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 8,
    backgroundColor: "#414042",
    paddingTop: 6,
    paddingBottom: 6,
  },
  resultText: {
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    padding: 20,
    textAlign: "right",
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
  },
});
