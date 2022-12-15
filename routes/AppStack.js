import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/profile';
import Agenda from '../components/agenda';
import AddTask from '../components/AddTask';
import Dashboard from '../components/dashboard';
import Promodoro from '../components/Promodoro';

const Stack = createStackNavigator();

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
            name="Promodoro"
            component={Promodoro}
            options={{ title: 'Promodoro'}}
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