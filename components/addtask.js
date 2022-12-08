import React, { Component } from 'react';
import firebase from '../database/firebase';
import Tombol from './CustomButton2';
import SelectInput from './SelectInput';
import { StyleSheet, TextInput, Button, View, Image, ScrollView, ActivityIndicator, Pressable } from 'react-native';

class AddTask extends Component {
    constructor() {
      super();
      this.dbRef = firebase.firestore().collection('task');
      this.state = {
        name: '',
        email: '',
        mobile: '',
        isLoading: false
      };
    }
    inputValueUpdate = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    storeUser() {
      if(this.state.name === ''){
       alert('Fill at least your name!')
      } else {
        this.setState({
          isLoading: true,
        });      
        this.dbRef.add({
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
        }).then((res) => {
          this.setState({
            name: '',
            email: '',
            mobile: '',
            isLoading: false,
          });
          this.props.navigation.navigate('Task')
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
      }
    }
    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }
      return (
        <View style={styles.container}> 
            <View style={styles.text_top_container}>
                <TextInput
                    style={styles.inputStyleTop}
                    placeholder={'Name'}
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />
                <View style={styles.row}>
                    <View style={styles.inputStyleTop2}>
                        <Image
                            source={require('../assets/flag.png')}
                            style={styles.imageStyle}
                        />
                        <TextInput
                            placeholder={'Repeat'}
                            value={this.state.name}
                            onPress={() => this.storeUser()}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.inputStyleTop2}>
                        <Image
                            source={require('../assets/pole.png')}
                            style={styles.imageStyle}
                        />
                        <TextInput
                            placeholder={'Deadline'}
                            value={this.state.name}
                            onPress={() => this.storeUser()}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                    <View style={styles.inputStyleTop3}>
                        <Image
                            source={require('../assets/time.png')}
                            style={styles.imageStyle}
                        />
                        <TextInput
                            placeholder={'Reminder'}
                            value={this.state.name}
                            onPress={() => this.storeUser()}
                            underlineColorAndroid="transparent"
                        />
                    </View>
            </View>
            <ScrollView style={styles.text_input_container}>
                <SelectInput></SelectInput>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Add Subtask'}
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={'Detail'}
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                />
                <Tombol
                    color="#3740FE"
                    title="Create"
                    onPress={() => this.storeUser()} 
                /> 
            </ScrollView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    row: {
        marginTop: -10,
        justifyContent: 'space-between',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    logo_container: {
        marginTop: 200,
        marginBottom: -100,
        marginLeft: 50,
    },
    text_top_container: {
        padding: 40,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 100,
        resizeMode: 'contain'
    },
    text_input_container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 500,
        padding: 40,
        marginTop: -25,
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
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#F5FBFF'
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    inputStyle: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: '#F5FBFF',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputStyleTop: {
        backgroundColor: 'white',
        marginBottom: 100,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputStyleTop2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 100,
        width: 150,
        marginBottom: 15,
        padding: 15,
        textAlign: 'center',
        alignSelf: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputStyleTop3: {
        flexDirection: 'row',
        marginTop: 5,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 100,
        width: 150,
        marginBottom: 15,
        padding: 15,
        alignSelf: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  export default AddTask;