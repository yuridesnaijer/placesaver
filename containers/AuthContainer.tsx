import * as React from 'react';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

// GoogleSignin.configure({
//   webClientId:
//     '817197472058-cpi1gs5b22cedi9jnd5ibdr0ititn63d.apps.googleusercontent.com',
//   offlineAccess: true,
// });
//
// async function onGoogleButtonPress() {
//   // Get the users ID token
//   const {idToken} = await GoogleSignin.signIn();
//
//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//
//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);
// }

const styles = StyleSheet.create({
  formControl: {
    marginBottom: 25,
  },
  button: {
    color: 'white',
    backgroundColor: 'blue',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  surface: {
    padding: 'auto',
    height: '80%',
    width: '100%',
    elevation: 4,
    backgroundColor: 'blue',
  },
});

const AuthContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.formControl}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.formControl}
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon name="eye" />}
      />
      <Button
        mode="contained"
        dark={true}
        style={[styles.formControl, styles.button]}
        onPress={() => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              console.log('User account created & signed in!', res);
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            });
        }}>
        Sign-In/create account
      </Button>
    </View>
  );
};

export default AuthContainer;
