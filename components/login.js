import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import Tombol from './custombutton';
import GoogleAuth from './googleauth';
import InputBox from 'react-native-floating-label-inputbox';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Form Ga Boleh Kosong Gan!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
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
            source={require('../assets/icon.png')} 
          />
        </View>
        <View style={styles.text_logo_container}>
          <Text
            style={styles.text_logo}
          >
              Plan Station
          </Text>
        </View>
        <View style={styles.text_input_container}>
          <Text style={styles.text_input_top}>
            Sign In With
          </Text>
          <InputBox
            inputOutline
            style={styles.inputStyle}
            label={'Email'}
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
           />
          <InputBox
            inputOutline
            style={styles.inputStyle}
            label={'Password'}
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
           />
          <Tombol
            color="#3740FE"
            title="Continue"
            onPress={() => this.userLogin()}
          />   
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Don't have account? Click here to signup
          </Text>    
          <Text 
            style={styles.or}
          >
            Or
          </Text>
          <GoogleAuth
            title="Sign in with Google"
          />      
        </View>           
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text_input_top: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: -200,
    paddingBottom: 10,
    color: '#2F394B',
    justifyContent: 'center',
    textAlign: 'left',
  },
  or: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
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
    backgroundColor: '#fff',
    width: 125,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: -100,
    marginBottom: -75,
    marginLeft: 150,
    marginRight: 150,
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
    height: 500,
    padding: 40,
    borderRadius: 50,
    marginBottom: -300,
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
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    borderColor: "#5E548E",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginText: {
    color: 'black',
    marginTop: 10,
    fontWeight: 'light',
    textAlign: 'center'
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