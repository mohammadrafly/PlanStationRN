import React, { useState } from 'react';
import firebase from '../database/firebase';
import Tombol from './CustomButton2';
import { CheckBox } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/id';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity } from 'react-native';

type CheckboxComponentProps = {};

const Todo: React.FunctionComponent<CheckboxComponentProps> = ({ navigation }) => {
    const [name, setName] = useState('')
    const [subtask, setSubtask] = useState('')
    const [detail, setDetail] = useState('')
    const [onprogress] = useState(false)
    const [complete] = useState(false)
    const [check, setCheck] = useState(false)
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(new Date())
    const [dateReminder, setDateReminder] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [modeReminder, setModeReminder] = useState(false)
    const [show, setShow] = useState(false)
    const [showReminder, setShowReminder] = useState(false)

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showModeReminder = (currentMode) => {
        setShowReminder(true);
        setModeReminder(currentMode);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }

    const onChangeReminder = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowReminder(false);
        setDateReminder(currentDate);
    }

    const addTodo = async (e) => {
        e.preventDefault();  
        if (name === '') {
            alert('Fill the task name!')
        } else {
            try {
                const docRef = await firebase.firestore().collection('task').add({
                    name: name,
                    deadline: moment(date).format('MMMM Do YYYY'),
                    reminder: moment(dateReminder).format('MMMM Do YYYY'),
                    subtask: subtask,
                    detail: detail,
                    onprogress: onprogress,
                    complete: complete,
                    uid: firebase.auth().currentUser.uid,
                    repeat: check,
                    category: category,
                });
                navigation.navigate('Task')
                console.log("Document written with ID: ", docRef.id)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
 
    return (
        <View style={styles.container}> 
            <View style={styles.text_top_container}>
                <TextInput
                    style={styles.inputStyleTop}
                    placeholder={'Name'}
                    value={name}
                    onChangeText={setName}
                />
                <View style={styles.row}>
                    <View style={styles.inputStyleTopRepeat}>
                        <CheckBox
                            center
                            title="Repeat"
                            checked={check}
                            onPress={() => setCheck(!check)}
                        />
                    </View>
                        <TouchableOpacity 
                            onPress={() => showMode('date')}
                            style={styles.inputStyleTop2}>
                            <Image
                                source={require('../assets/pole.png')}
                                style={styles.imageStyle}
                            />
                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                            {!show && (
                                <View>
                                    <Text
                                        style={{marginTop: 7, color: 'gray'}}
                                        title='Deadline'
                                    >Deadline</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                </View>
                        <TouchableOpacity 
                            onPress={() => showModeReminder('date')}
                            style={styles.inputStyleTop3}>
                            <Image
                                source={require('../assets/time.png')}
                                style={styles.imageStyle}
                            />
                            {showReminder && (
                                <DateTimePicker
                                    value={dateReminder}
                                    mode={modeReminder}
                                    is24Hour={true}
                                    onChange={onChangeReminder}
                                />
                            )}
                            {!showReminder && (
                                <View>
                                    <Text
                                        style={{marginTop: 7, color: 'gray'}}
                                        title='Reminder'
                                    >Reminder</Text>
                                </View>
                            )}
                        </TouchableOpacity>
            </View>
            <ScrollView style={styles.text_input_container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Category'}
                    value={category}
                    onChangeText={setCategory}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Add Subtask'}
                    value={subtask}
                    onChangeText={setSubtask}  
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Detail'}
                    value={detail}
                    multiline={true}
                    maxLength={40}
                    numberOfLines={4}
                    onChangeText={setDetail}
                />
               <Tombol
                    color="#3740FE"
                    title="Create"
                    onPress={addTodo} 
                />   
            </ScrollView>
        </View>
    )
}
 
export default Todo

const styles = StyleSheet.create({
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    row: {
        marginTop: -10,
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    logo_container: {
        marginTop: 200,
        marginBottom: -100,
        marginLeft: 50,
    },
    text_top_container: {
        padding: 40,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 100,
        resizeMode: 'contain'
    },
    text_input_container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 1000,
        padding: 40,
        marginTop: -25,
        marginBottom: -300,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
      },  
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#F5FBFF'
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    inputStyle: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: '#F5FBFF',
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
    inputStyleTop: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
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
    inputStyleTopText: {
      marginBottom: 100,
      width: '100%',
      marginBottom: 15,
      padding: 15,
      textAlign: "center",
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 10,
      color: '#2F394B',
      fontSize: 25,
      fontWeight: 'bold'
  },
    inputStyleTop2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 100,
        width: 150,
        marginBottom: 15,
        padding: 15,
        height: 70,
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
    inputStyleTopRepeat: {
      flexDirection: 'row',
      backgroundColor: 'white',
      textAlign: 'center',
      alignSelf: "center",
      borderColor: "white",
      width: 150,
      height: 70,
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
    inputStyleTop3: {
        flexDirection: 'row',
        marginTop: 5,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 100,
        width: 150,
        marginBottom: 15,
        padding: 15,
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
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })