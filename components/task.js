import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Image, useWindowDimensions, ActivityIndicator, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function ToDo() {
    return (
        <View style={styles.text_input_container}>
            <View style={styles.wrapper}>
                <Text style={styles.text_input_top}>
                    Todo
                </Text>
                <View style={styles.text_desc}>
                    
                </View>
            </View>   
        </View> 
    );
  }
  
function OnProgress() {
    return (
        <View style={styles.text_input_container}>
            <View style={styles.wrapper}>
                <Text style={styles.text_input_top}>
                    On Progress
                </Text>
                <Text style={styles.text_desc}>
                    Manage your Task and get your Job Done with our Task Manager
                </Text> 
            </View>
            <Pressable style={styles.buttonGet} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.text_buttonGet}>Get Started</Text>
            </Pressable>   
        </View>      
    );
  }

function Complete() {
    return (
        <View style={styles.text_input_container}>
            <View style={styles.wrapper}>
                <Text style={styles.text_input_top}>
                    Complete
                </Text>
                <Text style={styles.text_desc}>
                    Manage your Task and get your Job Done with our Task Manager
                </Text> 
            </View>
            <Pressable style={styles.buttonGet} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.text_buttonGet}>Get Started</Text>
            </Pressable>   
        </View>    
    );
  }

const Tab = createMaterialTopTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
    },
  };

export default function Main() {
        return (
        <View style={styles.container}>  
            <NavigationContainer
            theme={MyTheme}
            independent={true}
            >
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                    backgroundColor: '#F5FBFF',
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="To Do" component={ToDo} />
                    <Tab.Screen name="On Progress" component={OnProgress} />
                    <Tab.Screen name="Complete" component={Complete} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
        );
}

const styles = StyleSheet.create({
    containerCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text_buttonGet: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonGet: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 12,
        marginTop: 15,
        elevation: 3,
        padding: 8,
        backgroundColor: '#5E548E',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    wrapper: {
        marginTop: 30,
        marginBottom: 60,
    },
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 40,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#F5FBFF'
    },
    text_logo_container: {
        marginTop: 0,
        marginBottom: 200,
    },
    text_logo: {
        color: '#00394C',
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 100,
        fontWeight: 'bold',
        fontSize: 40,
    },
    logo_container: {
        marginBottom: -100,
        marginLeft: 50,
    },
    text_input_container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 40,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },  
    image: {
        width: 300,
        height: 300,
        marginBottom: 100,
        resizeMode: 'contain'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});