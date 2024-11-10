import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Temporizador para simular o carregamento antes de navegar para a próxima tela
    const timer = setTimeout(() => {
      navigation.replace('ActivitySelection'); // Ajuste conforme a próxima tela do fluxo
    }, 3000); // Tempo de 3 segundos (ajuste conforme necessário)

    // Limpa o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1', // Ajuste para a cor de fundo conforme o Figma
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor do texto conforme o design
  },
});

export default LoadingScreen;