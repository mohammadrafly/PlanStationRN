import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './profile';
import Agenda from './agenda';
import Task from './task';
import AddTask from './addtask';
import Promodoro from './Promodoro';
import BottomBar from './BottomBar';

StatusBar.setBarStyle('dark-content');

const App = (props) => {
    const ref = useRef();
    const [type, setType] = useState('down');

    const onClickButton = () => {
        if (type === 'up') {
            setType('down');
        } else {
            setType('up');
        }
    }

    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'Task':
                icon = 'checkmark-done-circle-outline';
                break;
            case 'Profile':
                icon = 'person-outlin';
                break;
            case 'AddTask':
                icon = 'add-circle-outline';
                break;
        }

        return (
            <Ionicons name={icon} size={23} color={routeName === selectedTab ? '#FF3030' : 'gray'} />
        );
    };

    return (
        <View style={styles.container}>
            <CurvedBottomBar.Navigator
                ref={ref}
                type={type}
                height={60}
                circleWidth={55}
                bgColor="white"
                borderTopLeftRight={true}
                strokeWidth={2}
                swipeEnabled={false}
                initialRouteName="Task"
                renderCircle={({ selectedTab, navigate }) => (
                    <TouchableOpacity
                        style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]} onPress={onClickButton}
                    >
                        <Ionicons name="add-circle-outline" size={23} />
                    </TouchableOpacity>
                )}
                tabBar={({ routeName, selectedTab, navigate }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigate(routeName)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {_renderIcon(routeName, selectedTab)}
                        </TouchableOpacity>
                    );
                }}>
                <CurvedBottomBar.Screen
                    name="Task"
                    position="left"
                    component={Task}
                />
                <CurvedBottomBar.Screen
                    name="Profile"
                    component={Profile}
                    position="right"
                />
            </CurvedBottomBar.Navigator>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 28
    },
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 1,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: '#48CEF6'
    },
    img: {
        width: 30,
        height: 30,
    },
});