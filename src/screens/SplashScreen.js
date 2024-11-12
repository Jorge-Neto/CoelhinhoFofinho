import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Imagem do fundo conforme o design do Figma */}
      {/* <Image source={require('../assets/splash-background.png')} style={styles.backgroundImage} /> */}
      
      {/* Logo ou texto centralizado */}
      <Text style={styles.logoText}>Coelhinho Fofinho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoText: {
    fontSize: 48, // Ajuste conforme o tamanho do texto no Figma
    fontWeight: 'bold', // Ou use `fontFamily` se houver uma fonte personalizada
    color: '#FEE4A0', // Substitua pelo código exato da cor do Figma
    textAlign: 'center',
  },
});

export default SplashScreen;