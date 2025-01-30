import React from 'react';
import 'react-native-gesture-handler';
import './src/utils/firebaseConfig';
import { AudioProvider } from './src/context/AudioContext';
import { AuthProvider } from './src/context/AuthContext';
import { AgeGroupProvider } from './src/context/AgeGroupContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AudioProvider>
      <AuthProvider>
        <AgeGroupProvider>
          <AppNavigator />
        </AgeGroupProvider>
      </AuthProvider>
    </AudioProvider>
  );
};

export default App;
