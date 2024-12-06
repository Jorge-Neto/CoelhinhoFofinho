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
          onPress={() => navigation.navigate('AgeSelectionScreen')}
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

          <View style={styles.space} />

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
    height: '100dvh'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  logo: {
    width: 254,
    height: 110,
    marginTop: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 51,
    marginBottom: 20,
  },
  subText: {
    marginHorizontal: 60,
    fontSize: 28,
    fontWeight: 300,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 61,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FCED93B2',
    fontSize: 16,
    elevation: 2,
    border: 0,
    textAlign: 'center',
    boxShadow: '0px 4px 4px 0px #00000040',

  },
  loginButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#C76280',
    color: '#0000004D',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 5,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    columnGap: '32px',
  },
  space: {
    width: 34
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    // marginHorizontal: 5,
    height: 53,
    gap: 34
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    width: 121,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    width: 121,
  },
  icon: {
    width: 36,
    height: 36,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
