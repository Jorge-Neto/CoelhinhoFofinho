import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
import { useAuth } from '../context/AuthContext';

import background from '../../assets/images/background.png';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/icons/google-icon.png';
import facebookIcon from '../../assets/images/icons/facebook-icon.png';
import AnimatedRabbit from '../components/AnimatedRabbit';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth()
  const db = getFirestore()
  const { user } = useAuth()

  const createUser = async (userId) => {
    const today = new Date().toISOString().split("T")[0];

    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      dailyUsage: 0,
      lastAccessDate: today,
      name: email.split('@')[0],
      phone: "00000000000",
      avatar: '',
      subscriptionPlan: 'Free',
      creditCardNumber: '',
      creditCardExpiry: '',
      creditCardCVV: '',
      paymentMethod: '',
      isActive: true,
      createdAt: new Date().toISOString(),
    });
  };

  const handleLogin = useCallback(async () => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Formato de e-mail inválido.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const now = new Date();
      const today = now.toISOString().split("T")[0];

      if (userDoc.exists()) {
        const { dailyUsage = 0, lastAccessDate } = userDoc.data();

        if (dailyUsage >= 3600 && lastAccessDate === today) {
          Alert.alert("Limite Atingido", "Você já usou sua 1 hora diária gratuita. Volte amanhã!");
          return;
        }

        if (lastAccessDate !== today) {
          await setDoc(userRef, { dailyUsage: 0, lastAccessDate: today }, { merge: true });
        }
      } else {
        await createUser(userId);
      }

      navigation.navigate("Loading", { redirectRoute: "AgeSelectionScreen" });
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          Alert.alert(
            "Conta Não Encontrada",
            "Deseja criar uma conta com este e-mail?",
            [
              { text: "Cancelar", style: "cancel", onPress: () => setIsLoading(false) },
              {
                text: "Criar Conta",
                onPress: async () => {
                  try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const userId = userCredential.user.uid;

                    await createUser(userId);
                    Alert.alert("Conta Criada", "Sua conta foi criada com sucesso!");
                    navigation.navigate("Loading", { redirectRoute: "AgeSelectionScreen" });
                  } catch (createError) {
                    Alert.alert("Erro ao criar conta", createError.message);
                  } finally {
                    setIsLoading(false);
                  }
                },
              },
            ]
          );
          break;

        case "auth/invalid-credential":
          Alert.alert(
            "Não foi possível fazer login",
            "Deseja tentar criar uma conta com este e-mail?",
            [
              { text: "Cancelar", style: "cancel", onPress: () => setIsLoading(false) },
              {
                text: "Criar Conta",
                onPress: async () => {
                  try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const userId = userCredential.user.uid;

                    await createUser(userId);
                    Alert.alert("Conta Criada", "Sua conta foi criada com sucesso!");
                    navigation.navigate("Loading", { redirectRoute: "AgeSelectionScreen" });
                  } catch (createError) {
                    Alert.alert("Erro ao criar conta", createError.message);
                  } finally {
                    setIsLoading(false);
                  }
                },
              },
            ]
          ); break;

        case "auth/email-already-in-use":
          Alert.alert("Erro", "Este e-mail já está registrado. Por favor, faça login.");
          break;

        case "auth/invalid-email":
          Alert.alert("Erro", "Formato de e-mail inválido.");
          break;

        case "auth/wrong-password":
          Alert.alert("Erro", "Senha incorreta. Verifique e tente novamente.");
          break;

        default:
          Alert.alert("Erro no Login", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, password, auth, db, navigation]);

  useEffect(() => {
    if (user) {
      navigation.navigate('Loading', { redirectRoute: "AgeSelectionScreen" });
    }
  }, [user, navigation]);

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <AnimatedRabbit corner="top-right" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.container}>
          <Image
            source={logo}
            style={styles.logo}
          />

          <Text style={styles.welcomeText}>Seja Bem-Vindo!</Text>
          <Text style={styles.subText}>Vamos embarcar nessa juntos?</Text>
          <Text style={styles.subTitle}>Crie ou faça seu login</Text>

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />

          <PressableWithSound
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
                {isLoading ? <ActivityIndicator size="small" color="#acd29c" /> : 'Login'}
              </Text>
            )}
          </PressableWithSound>

          <View style={styles.socialButtonsContainer}>
            <TouchableWithSound
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => alert('Login com Google')}
            >
              <Image
                source={googleIcon}
                style={styles.icon}
              />
            </TouchableWithSound>

            <View style={styles.space} />

            <TouchableWithSound
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => alert('Login com Facebook')}
            >
              <Image
                source={facebookIcon}
                style={styles.icon}
              />
            </TouchableWithSound>

          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#acd29c",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 72,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 254,
    height: 110,
    marginTop: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 31,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 51,
    marginBottom: 20,
  },
  subText: {
    marginHorizontal: 60,
    fontSize: 28,
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subTitle: {
    marginHorizontal: 60,
    fontSize: 20,
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 41,
  },
  input: {
    width: "70%",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FCED93B2",
    color: "#0000004D",
    fontSize: 16,
    textAlign: "center",
  },
  loginButton: {
    width: "70%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#C76280",
    alignItems: "center",
    marginBottom: 14,
    elevation: 5,
  },
  loginButtonPressed: {
    backgroundColor: "#FF5285",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    columnGap: 32,
  },
  space: {
    width: 34,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
    height: 53,
    gap: 34,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    width: 121,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    width: 121,
  },
  icon: {
    width: 36,
    height: 36,
  },
  buttonText: {
    color: "#0000004D",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPressed: {
    color: "#FFFFFF82",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default LoginScreen;
