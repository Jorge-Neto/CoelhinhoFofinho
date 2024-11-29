import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';

import background from '../../assets/images/background.png';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('AdventureSelectionScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>CERTO, VAMOS NESSA!</Text>
        <ActivityIndicator size="large" color="#0099cc" />
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#97cfcc',
  },
  text: {
    fontWeight: 700,
    fontSize: 23,
    marginBottom: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
});

export default LoadingScreen;
