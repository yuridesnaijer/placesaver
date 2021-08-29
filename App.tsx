import React from 'react';
import {Appbar} from 'react-native-paper';
import BottomNavBar from './components/navigation/BottomNavBar';

const App = () => {
  return (
    <>
      <Appbar>
        <Appbar.Content title="Place saver" />
      </Appbar>
      {/*CONTENT RENDERED BY BOTTOMNAVBAR*/}
      <BottomNavBar />
    </>
  );
};

export default App;
