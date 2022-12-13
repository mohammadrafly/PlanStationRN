import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase  from '../database/firebase';
import { SwipeListView } from 'react-native-swipe-list-view';


const FetchDataOnProgress = () => {
    const [tasks, setTask] = useState([]);
    const taskRef = firebase.firestore().collection('task')
    useEffect(() => {
        async function fetchData() {
            taskRef
            .where('uid', '==', firebase.auth().currentUser.uid)
            .where('onProgress', '==', true)
            .onSnapshot(
                querySnapshot => {
                    const tasks = []
                    querySnapshot.forEach((doc) => {
                        const { detail, uid, nametask, subtask } = doc.data()
                        tasks.push({
                            id: doc.id,
                            uid,
                            nametask,
                            subtask,
                            detail
                        })
                    })
                    setTask(tasks)
                }
            )
        }
        fetchData();
    }, []);

    const updateTodo = (tasks) => {
        taskRef
            .doc(tasks.id)
            .update({
                onProgress: false,
                complete: true
            })
            .then(() => {
                alert('Task Complete!');
            })
            .catch((error) => {
                alert(error);
            });
    }

    const onRowDidOpen = () => {
        console.log('This row opened');
    };
    console.log(tasks)
    return (
        <View style={styles.containerSwiper}>
            {!tasks && (
                <View style={styles.text_input_container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.text_desc}>
                            Manage your Task and get your Job Done with our Task Manager
                        </Text>
                    </View>
                </View>
            )}
            {tasks && (
                <SwipeListView
                style={{width: '100%'}}
                data={tasks}
                numColumns={1}
                renderItem={({item}) => (
                    <TouchableHighlight
                        style={styles.button}
                    >
                        <View>
                            <Text style={styles.textHeading}>{item.nametask}</Text>
                            <Text style={styles.textDetail}>{item.detail}</Text>
                        </View>
                    </TouchableHighlight>
                )}
                renderHiddenItem={({item}) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            onPress={() => updateTodo(item)}
                        >
                            <Image
                                source={require('../assets/check.png')}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-60}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            )}
        </View>
    )
}

export default FetchDataOnProgress

const styles = StyleSheet.create({
    containerSwiper: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingVertical: 20,
    },
    imageStyle: {
        padding: 0,
        margin: 0,
        height: 30,
        width: 30,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowBack: {
        marginVertical: 15,
        flex: 1,
        flexDirection: 'row',
        marginRight: 25,
        justifyContent: 'flex-end',
    },
    backRightBtn: {
        justifyContent: 'center',
        borderRadius: 12,
        height: 48,
        width: 48,
        padding: 8,
        backgroundColor: 'green',
    },
    backRightBtnLeftt: {
        backgroundColor: 'green',
    },
    //devide
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginLeft: 25,
        marginRight: 25,
        elevation: 3,
        padding: 8,
        marginTop: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'blue',
        borderLeftWidth: 3,
    },
    date: {

    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
    },
    textDetail: {

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
})