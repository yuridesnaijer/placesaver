/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
