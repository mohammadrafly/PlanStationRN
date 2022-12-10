import * as React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import firebase from '../database/firebase';
import { useNavigation } from '@react-navigation/native';

const DetailTask = ({ route }) => {
    const taskRef = firebase.firestore().collection('task');
    const [textHeading, onChangeHeadingText] = useState(
        route.params.item.heading
    );
    const [textDetail, onChangeDetailText] = useState(
        route.params.item.detail
    );
    const navigation = useNavigation();
  
    const updateTask = () => {
        taskRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
          detail: textDetail,
        })
        .then(() => {
          navigation.navigate('Task');
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textfield}
          onChangeText={onChangeHeadingText}
          value={textHeading}
          placeholder="Update Todo"
        />
        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={() => {
            updateTodo();
          }}>
          <Text>UPDATE</Text>
        </TouchableOpacity>
      </View>
    );
  };