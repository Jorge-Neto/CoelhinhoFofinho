import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';


import background from '../../assets/images/background.png';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/icons/google-icon.png';
import facebookIcon from '../../assets/images/icons/facebook-icon.png';


const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={logo}
          style={styles.logo}
        />

        <Text style={styles.welcomeText}>Seja Bem-Vindo!</Text>
        <Text style={styles.subText}>Vamos embarcar nessa juntos?</Text>

        <TextInput
          placeholder="Nome de Usuário"
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('ContentSelection')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => alert('Login com Google')}
          >
            <Image
              source={googleIcon}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={() => alert('Login com Facebook')}
          >
            <Image
              source={facebookIcon}
              style={styles.icon}
            />
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#acd29c',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: '#FFFACD',
    fontSize: 16,
    elevation: 2, // Para sombra leve
  },
  loginButton: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#FF8C94',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: '#DB4437',
    width: '121px',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    width: '121px',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
