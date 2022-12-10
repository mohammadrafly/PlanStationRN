import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Select Date");

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const onChange = (selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        console.log(fDate)
  
        setTitle(fDate.toString())
    }
    
    return (
        <TouchableOpacity 
            onPress={() => showMode('date')}
            title={title}
            style={styles.inputStyleTop2}>
            <Image
                source={require('../assets/pole.png')}
                style={styles.imageStyle}
            />
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={(_, date) => onChange(date)}
                />
            )}
            {!show && (
                <View>
                    <Text 
                        style={{marginTop: 7, color: 'gray'}}
                    >
                        Deadline
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    inputStyleTop2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 100,
        width: 150,
        marginBottom: 15,
        padding: 15,
        textAlign: 'center',
        alignSelf: "center",
        borderColor: "white",
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
