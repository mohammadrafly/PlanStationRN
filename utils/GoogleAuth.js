import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text, StyleSheet, Image, Pressable} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigate } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: "822101279077-87f7fcttmvq203lk8fetvr204ti5pb3c.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
      .then((res) => {
        console.log(res);
        console.log('User Logged-In Using Google Account Successfully!');
        useNavigate('Dashboard');
      })
      .catch(error => ({errorMessage: error.message}));
    }
  }, [response]);

  return (
    <Pressable 
    disabled={!request}
    title="Login"
    onPress={() => {
    promptAsync();
    }}
    style={styles.googleButton} 
    >
      <Text style={styles.googleButtonText}>
      <Image
       style={styles.googleIcon}
       source={{
        uri: "https://i.ibb.co/j82DCcR/search.png",
       }}
      />
        Sign In With Google
      </Text>           
    </Pressable>
  );
}

const styles = StyleSheet.create({
    googleButton: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        margin: 0,
        elevation: 3,
        backgroundColor: '#fff',
    },
    googleButtonText: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600'
    },
    googleIcon: {
        height: 24,
        width: 24,
    },
});