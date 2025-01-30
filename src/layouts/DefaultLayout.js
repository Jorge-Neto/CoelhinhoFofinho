import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

import background from '../../assets/images/background.png';


const SimpleLayout = ({ children }) => {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100dvh',
    width: '100dvw'
  },
  content: {
    flex: 1,
  },
});

export default SimpleLayout;
