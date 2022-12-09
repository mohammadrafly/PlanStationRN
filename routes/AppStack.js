import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../components/profile';
import Agenda from '../components/agenda';
import Task from '../components/task';
import AddTask from '../components/addtask';
import Dashboard from '../components/dashboard';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

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
            name="Agenda"
            component={Agenda}
            options={{
              tabBarLabel: 'Agenda',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
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
export default class AppStack extends Component {
  render() {   
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#F5FBFF',
            },
            headerTintColor: '#2F394B',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }}>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'PlanStation'}}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTask} 
            options={{ title: 'Add Task' }}
          />       
          <Stack.Screen 
            name="Agenda" 
            component={Agenda} 
            options={
              {title: 'Agenda'}
            }
          />
          <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={
            { title: 'Profile' }
          }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}