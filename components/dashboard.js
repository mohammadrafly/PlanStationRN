import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './profile';
import Agenda from './agenda';
import Task from './task';
import AddTask from './addtask';
import Promodoro from './Promodoro';
import BottomBar from './BottomBar';

const Tab = createMaterialBottomTabNavigator();

function TabNav() {
  return (
        <Tab.Navigator
          initialRouteName="Task"
          activeColor="#5E548E"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen 
            name="Task" 
            component={Task} 
            options={{
              tabBarLabel: 'Task',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="check" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen 
            name="AddTask" 
            component={AddTask} 
            options={{
              tabBarLabel: 'Add Task',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
  )
}
export default class Dashboard extends Component {
  render() {   
    return (
        <TabNav />
    );
  }
}