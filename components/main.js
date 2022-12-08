import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native';

export default class Main extends Component {

    constructor() {
        super();
        this.state = { 
          isLoading: false,
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#F5FBFF"/>
                </View>
            )
        }    
        return (
        <View style={styles.container}>  
            <View style={styles.logo_container}>
                <Image 
                    style={styles.image}
                    source={require('../assets/getstart.png')} 
                />
            </View>
            <View style={styles.text_input_container}>
                <View style={styles.wrapper}>
                    <Text style={styles.text_input_top}>
                        Task Manager
                    </Text>
                    <Text style={styles.text_desc}>
                        Manage your Task and get your Job Done with our Task Manager
                    </Text>
                </View>
                <Pressable style={styles.buttonGet} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.text_buttonGet}>Get Started</Text>
                </Pressable>
            </View>           
        </View>
        );
    }
}
const styles = StyleSheet.create({
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
    text_desc: {
        fontSize: 16,
        color: '#00394C',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text_input_top: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: -200,
        paddingBottom: 10,
        color: '#00394C',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
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
        marginTop: 200,
        marginBottom: -100,
        marginLeft: 50,
    },
    text_input_container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 40,
        borderRadius: 50,
        marginBottom: -200,
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