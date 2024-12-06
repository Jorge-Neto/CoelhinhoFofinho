import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ImageBackground } from 'react-native';

import background from '../../assets/images/background.png';

const LoadingScreen = ({ navigation, route }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  const { redirectRoute } = route.params;
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace(redirectRoute);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>CERTO, VAMOS NESSA!</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progress, { width: progressWidth }]}
          />
        </View>
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
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  progressBar: {
    width: 314,
    height: 44,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#0099cc',
  },
});

export default LoadingScreen;
