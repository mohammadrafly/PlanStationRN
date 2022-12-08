import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Switch, Alert, ActivityIndicator } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default class SelectInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
            { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];

        return (
                <ModalSelector
                    style={styles.inputContainer}
                    data={data}
                    initValue="Task Category"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    
})