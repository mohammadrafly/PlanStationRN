import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    ActivityIndicator
} from 'react-native';
import firebase from '../database/firebase';

export default class DetailTask extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobile: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('task').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('users').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        email: '',
        mobile: '',
        isLoading: false,
      });
      this.props.navigation.navigate('UserScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  deleteUser() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('UserScreen');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
                  onChangeText={onChangeNameText}
                  value={textName}
                  placeholder="Update Task Name"
              />
          </View>
          <View style={styles.text_input_container}>
              <TextInput
                  style={styles.inputStyle}
                  placeholder={'Update Subtask'}
                  onChangeText={onChangeSubtaskText}
                  value={textSubtask}
              />
              <TextInput
                  style={styles.inputStyle}
                  placeholder={'Update Detail'}
                  onChangeText={onChangeDetailText}
                  value={textDetail}
              />
              <Tombol
                  color="#3740FE"
                  title="Update"
                  onPress={() => {
                    updateTask();
                  }}
              /> 
          </View>
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