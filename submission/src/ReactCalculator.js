import React from 'react';
import {Text, View} from 'react-native';
import Style from './Styles';
import InputButton from "./InputButton";

export default class ReactCalculator extends React.Component {

    /**
     * For each row in `inputButtons`   (= inputButtons[j],
     * create a row View    (= row[i])
     * and add create an InputButton for each input in the row.
     */

    _renderInputButtons = () => {
        let views = [];

        for (var j = 0; j < inputButtons.length; j++) {
            let row = inputButtons[j];

            let inputRow = [];
            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <InputButton value={input}
                                 highlight={this.state.selectedSymbol === input}
                                 onPress={this._onInputButtonPressed.bind(this, input)}
                                 key={j + "-" + i}/>
                );
            }
            views.push(<View style={Style.inputRow} key={"row-" + j}>{inputRow}</View>)
        }

        return views;
    };

    _onInputButtonPressed = (input) => {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input);
            case 'string':
                return this._handleStringInput(input);
        }
    };

    _handleNumberInput = (num) => {
        let inputValue = 0;
        if (!this.state.isDecimal) {
            inputValue = (this.state.inputValue * 10) + num;
        } else {
            const float = this.state.digitsBeforeComma + "." + num;
            inputValue = parseFloat(float);
        }
        this.setState({
            inputValue: inputValue
        });
    };

    _handleStringInput = (inputString) => {
        switch (inputString) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: inputString,
                    previousInputValue: (this.state.inputValue !== 0) ? (this.state.inputValue) : (this.state.previousInputValue),
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }
                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
            case 'C':
                this.setState({
                    previousInputValue: 0,
                    inputValue: 0,
                    selectedSymbol: null
                });
                break;
            case 'DEL':
                var str = this.state.inputValue;
                str = str.toString();
                str = str.slice(0, -1);
                str = parseInt(str);
                this.setState({
                    inputValue: (isNaN(str)) ? (0) : (str)
                });
                break;
            case '%':
                this.setState({
                    inputValue: this.state.inputValue / 100
                });
                break;
            case ',':
                this.setState({
                    digitsBeforeComma: this.state.inputValue,
                    isDecimal: true
                });
                break;
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            isDecimal: false,
            digitsBeforeComma: 0
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>

                    {(this.state.previousInputValue !== 0) ? (
                        <Text style={Style.displayText}>{this.state.previousInputValue}</Text>) : (null)}

                    {(this.state.selectedSymbol != null) ? (
                        <Text style={Style.displayText}>{this.state.selectedSymbol}</Text>) : (null)}

                    <Text style={Style.displayText}>{this.state.inputValue}</Text>

                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

}

// Definition of the input buttons that will be displayed in the calculator
const inputButtons = [
    //['mc', 'm+', 'm-', 'mr'],
    ['C', '/', '*', 'DEL'],
    [7, 8, 9, '-'],
    [4, 5, 6, '+'],
    [1, 2, 3, '='],
    ['%', 0, ',', '=']
];