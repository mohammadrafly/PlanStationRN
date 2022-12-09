import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login';
import Signup from '../components/signup';
import Dashboard from '../components/dashboard';
import Main from '../components/main';

const Stack = createStackNavigator();

function MainStack() {
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
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'}
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' }
       }
      />
      <Stack.Screen 
       name="Main" 
       component={Main} 
       options={
         { title: 'Main' }
       }
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}