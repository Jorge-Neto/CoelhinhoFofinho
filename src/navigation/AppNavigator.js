import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AgeSelectionScreen from '../screens/AgeSelectionScreen';
import AdventureSelectionScreen from '../screens/AdventureSelectionScreen';
import LoadingScreen from '../screens/LoadingScreen';
import DrawingScreen from '../screens/DrawingScreen';
import LearningScreen from '../screens/LearningScreen';
import StudyScreen from '../screens/StudyScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="AdventureSelectionScreen" component={AdventureSelectionScreen} />
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
        <Stack.Screen name="Study" component={StudyScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
