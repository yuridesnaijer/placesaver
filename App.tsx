import React, {useState, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import BottomNavBar from './components/navigation/BottomNavBar';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Button} from 'react-native';
import AuthContainer from './containers/AuthContainer';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  // Handle user state changes
  function onAuthStateChanged(
    user: FirebaseAuthTypes.User | null | FirebaseAuthTypes.UserCredential,
  ) {
    console.log('setting user', user);

    setUser(user as FirebaseAuthTypes.User);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <AuthContainer />;
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title="Place saver" />
        <Button
          title="log out"
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }
        />
      </Appbar>
      {/*CONTENT RENDERED BY BOTTOMNAVBAR*/}
      <BottomNavBar />
    </>
  );
};

export default App;
