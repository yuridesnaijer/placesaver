/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthContext, {defaultAuthContext} from './context/AuthContext';
import AuthProvider from './context/AuthContext';

export default function Main() {
  return (
    <PaperProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
