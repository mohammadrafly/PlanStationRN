import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase  from '../database/firebase';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/id';

const FetchData = () => {
    const navigation = useNavigation(); 
    const [tasks, setTask] = useState([]);
    const taskRef = firebase.firestore().collection('task')
    useEffect(() => {
        async function fetchData() {
            taskRef
            .where('uid', '==', firebase.auth().currentUser.uid)
            .where('onprogress', '==', false)
            .where('complete', '==', false)
            .onSnapshot(
                querySnapshot => {
                    const tasks = []
                    querySnapshot.forEach((doc) => {
                        const { detail, uid, name, subtask, deadline, category } = doc.data()
                        tasks.push({
                            id: doc.id,
                            uid,
                            name,
                            subtask,
                            detail,
                            deadline,
                            category
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
                onprogress: true,
            })
            .then(() => {
                alert('Task On Progress Now!');
            })
            .catch((error) => {
                alert(error);
            });
    }
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
                    <Card style={styles.button}>
                        <Paragraph>Due, {item.deadline}</Paragraph>
                        <Card.Title style={styles.textTitle} title={item.name} />
                        <Card.Content>
                            <Paragraph>Category: {item.category}</Paragraph>
                            <Paragraph>Detail: {item.detail}</Paragraph>
                        </Card.Content>
                    </Card>
                )}
                renderHiddenItem={({item}) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            onPress={() => updateTodo(item)}
                        >
                            <Image
                                source={require('../assets/play.png')}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
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
                rightOpenValue={-120}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        </View>
    )
}

export default FetchData

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 200,
    },
    textCategory: {
        backgroundColor: 'blue',
        color: 'white',
        height: 25,
        width: 100,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        textAlign: 'center',
        borderRadius: 10
    },
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