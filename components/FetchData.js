import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase  from '../database/firebase';
import { SwipeListView } from 'react-native-swipe-list-view';


const FetchData = () => {
    const [tasks, setTask] = useState([]);
    const taskRef = firebase.firestore().collection('task')
    useEffect(() => {
        async function fetchData() {
            taskRef
            .where('uid', '==', firebase.auth().currentUser.uid)
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

    const deleteTodo = (tasks) => {
        taskRef
          .doc(tasks.id)
          .delete()
          .then(() => {
            alert('Deleted successfully');
          })
          .catch((error) => {
            alert(error);
          });
      };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    return (
        <View>
            <SwipeListView
                style={{width: '100%'}}
                data={tasks}
                numColumns={1}
                renderItem={({item}) => (
                    <TouchableHighlight
                        onPress={() => console.log('You touched me')}
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
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => deleteTodo(item)}
                        >
                            <Image
                                source={require('../assets/trash.png')}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    )
}

export default FetchData

const styles = StyleSheet.create({
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
        marginTop: 10,
        borderRadius: 5,
        marginLeft: 25,
        marginRight: 25,
        alignSelf: 'flex-end'
    },
    backRightBtn: {
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 12,
        height: 50,
        width: 75,
        elevation: 3,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#5E548E',
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderRadius: 15
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