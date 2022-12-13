import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { StyleSheet, Text, TextInput, ScrollView, View, Image, ActivityIndicator, Pressable } from 'react-native';
import Constants from 'expo-constants';

export default class ProfileScreen extends Component {
    constructor() {
        super();
        this.state = { 
          isLoading: false,
          uid: ''
        }
    }

    render() {
        this.state = { 
            displayName: firebase.auth().currentUser.displayName,
            displayEmail: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid,
            photoURL: firebase.auth().currentUser.photoURL,
            phoneNumber: firebase.auth().currentUser.phoneNumber
        }  
        
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#F5FBFF"/>
                </View>
            )
        }    

        var signOut = async () => {
            firebase.auth().signOut().then(() => {
                console.log('User logged-out successfully!')
                this.props.navigation.navigate('Login')
            })
            .catch(error => this.setState({ errorMessage: error.message }))
        }  

        let Image_Http_URL ={ uri: this.state.photoURL};

        return (
        <ScrollView>
            <View style={styles.container}>  
                <View style={styles.logo_container}>
                    <Image 
                        style={styles.image}
                        source={Image_Http_URL}
                    />
                </View>
                    <Text style={styles.Name}>
                        {this.state.displayName}
                    </Text>
                    <Text 
                        style={styles.Logout}
                        onPress={signOut}>
                        Log Out
                    </Text>
                <View style={styles.text_input_container}>
                    <View style={styles.wrapper}>
                        <View style={styles.inputStyleTop2}>
                            <Image
                                source={require('../assets/phone.png')}
                                style={styles.imageStyle}
                            />
                            <TextInput
                                editable={false}
                                value={this.state.phoneNumber}
                                placeholder={'Phone'}
                                onChangeText={(val) => this.inputValueUpdate(val, 'phoneNumber')}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputStyleTop2}>
                            <Image
                                source={require('../assets/envelope.png')}
                                style={styles.imageStyle}
                            />
                            <TextInput
                                editable={false}
                                value={this.state.displayEmail}
                                placeholder={'Email'}
                                onChangeText={(val) => this.inputValueUpdate(val, 'displayEmail')}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputStyleTop2}>
                            <Image
                                source={require('../assets/pin.png')}
                                style={styles.imageStyle}
                            />
                            <TextInput
                                editable={false}
                                value={this.state.pin}
                                placeholder={'Location'}
                                onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputStyleTop2}>
                            <Image
                                source={require('../assets/time.png')}
                                style={styles.imageStyle}
                            />
                            <TextInput
                                editable={false}
                                value={this.state.name}
                                placeholder={'Time Zone'}
                                onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.build}>
                    Build {Constants.manifest.version}
                </Text>       
            </View>
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    imageStyle: {
        padding: 0,
        margin: 5,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    inputStyleTop2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        textAlign: 'center',
        alignSelf: "center",
        borderColor: '#d9d9d9',
        borderBottomWidth: 1,
    },
    build: {
        alignText: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'light',
        fontSize: 10,
    },
    Name: {
        color: '#00394C',
        alignSelf: 'center',
        alignText: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -75,
        marginBottom: 25, 
    },
    Logout: {
        color: '#5E548E',
        alignSelf: 'center',
        alignText: 'center',
        fontWeight: 'regular',
        fontSize: 14,
        marginBottom: 50, 
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
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 12,
        marginTop: 30,
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
        marginTop: -20,
        marginBottom: 120,
    },
    text_desc: {
        fontSize: 16,
        color: '#00394C',
        justifyContent: 'center',
        textAlign: 'center',
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
        marginBottom: 0,
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
        width: 140,
        height: 140,
        borderRadius: 15,
        marginBottom: 100,
        alignSelf: 'center',
        alignText: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    text_input_container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 700,
        padding: 40,
        borderRadius: 0,
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
        alignSelf: 'center',
        width: 140,
        height: 140,
        borderColor: "#5E548E",
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 150,
        alignItems: 'center',
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
    },
});