import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase  from '../../config/Firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';

const FetchData = () => {
    const navigation = useNavigation(); 
    const [tasks, setTask] = useState([]);
    const taskRef = firebase.firestore().collection('task')
    useEffect(() => {
        async function fetchData() {
            taskRef
            .where('uid', '==', firebase.auth().currentUser.uid)
            .where('onProgress', '==', false)
            .where('complete', '==', false)
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

    const updateTodo = (tasks) => {
        taskRef
            .doc(tasks.id)
            .update({
                onProgress: true,
            })
            .then(() => {
                alert('Task On Progress Now!');
            })
            .catch((error) => {
                alert(error);
            });
    }

    const onRowDidOpen = () => {
        navigation.navigate('DetailTask')
    };

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
                                source={require('./img/play.png')}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => deleteTodo(item)}
                        >
                            <Image
                                source={require('./img/trash.png')}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-120}
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
    containerSwiper: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingVertical: 20,
    },
    new_task_top: {
        textAlign: 'right',
        paddingRight: 40,
        fontSize: 20,
        marginBottom: 10,
    },
    imageStyleTop: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        width: 20,
        alignItems: 'center'
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
        padding: 5,
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginRight: 25,
    },
    backRightBtn: {
        justifyContent: 'space-between',
        borderRadius: 12,
        height: 48,
        width: 48,
        padding: 8,
        backgroundColor: 'blue',
    },
    backRightBtnRight: {
        backgroundColor: 'red',
    },
    backRightBtnLeftt: {
        backgroundColor: 'blue',
    },
    //devide
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginLeft: 25,
        marginRight: 25,
        marginVertical: 5,
        elevation: 3,
        padding: 8,
        marginTop: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'blue',
        borderLeftWidth: 5,
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
    wrapper: {
        marginTop: 0,
        marginBottom: 0,
    },
    text_desc: {
        fontSize: 16,
        color: '#00394C',
        justifyContent: 'center',
        textAlign: 'center',
    },
})