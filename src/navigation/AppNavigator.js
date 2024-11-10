import React from 'react';
   import { createStackNavigator } from '@react-navigation/stack';
   import { NavigationContainer } from '@react-navigation/native';
   import SplashScreen from '../screens/SplashScreen';
   import LoginScreen from '../screens/LoginScreen';
   import ContentSelectionScreen from '../screens/ContentSelectionScreen';
   import LoadingScreen from '../screens/LoadingScreen';
   import DrawingScreen from '../screens/DrawingScreen';
   import LearningScreen from '../screens/LearningScreen';
   import StudyScreen from '../screens/StudyScreen';
   import GameScreen from '../screens/GameScreen';
   import SettingsScreen from '../screens/SettingsScreen';

   const Stack = createStackNavigator();

   const AppNavigator = () => {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Splash" component={SplashScreen} />
           <Stack.Screen name="Login" component={LoginScreen} />
           <Stack.Screen name="ContentSelection" component={ContentSelectionScreen} />
           <Stack.Screen name="Loading" component={LoadingScreen} />
           <Stack.Screen name="Drawing" component={DrawingScreen} />
           <Stack.Screen name="Learning" component={LearningScreen} />
           <Stack.Screen name="Study" component={StudyScreen} />
           <Stack.Screen name="Game" component={GameScreen} />
           <Stack.Screen name="Settings" component={SettingsScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   };

   export default AppNavigator;