import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import Style from './Styles';

export default class InputButton extends React.Component {
    render() {
        return (
            <TouchableHighlight style={[Style.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]}
                                underlayColor="#193441"
                                onPress={this.props.onPress}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
}