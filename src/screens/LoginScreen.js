import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao Coelhinho Fofinho!</Text>

      {/* Campo de entrada de texto para o nome do usuário */}
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Botão para continuar com o nome */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContentSelection')}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      {/* Botões de login com Google e Facebook */}
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={() => alert('Login com Google')}
      >
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.facebookButton]}
        onPress={() => alert('Login com Facebook')}
      >
        <Text style={styles.buttonText}>Entrar com Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1', // Ajuste conforme o fundo do design do Figma
  },
  logo: {
    width: 150, // Ajuste o tamanho conforme o print do Figma
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24, // Ajuste para corresponder ao design
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF', // Fundo branco para o campo de entrada
  },
  button: {
    width: '100%',
    backgroundColor: '#FFB6C1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;