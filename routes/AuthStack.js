import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AppStack from '../routes/AppStack';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
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
       name="Main" 
       component={MainScreen} 
       options={
         { title: 'Main' }
       }
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'SignUp' }}
      />       
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={
          {title: 'SignIn'}
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={AppStack} 
       options={
         { title: 'Dashboard' }
       }
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <AuthScreens />
    </NavigationContainer>
  );
}