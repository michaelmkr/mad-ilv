import React from 'react';
import {View} from 'react-native';
import ReactCalculator from './src/ReactCalculatorBackup'

export default class App extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <ReactCalculator/>
            </View>
        );
    }
}
