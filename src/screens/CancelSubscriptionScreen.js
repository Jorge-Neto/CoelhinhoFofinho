import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const CancelSubscriptionScreen = ({ navigation }) => {
  const { updateUserData, handleLogout } = useAuth();

  const handleCancelSubscription = async () => {
    await updateUserData({ subscriptionPlan: 'Free' });
    Alert.alert(
      'Assinatura Cancelada',
      'Poxa, que pena que você está indo embora! Mas o coelhinho te espera para quando quiser voltar! 🐰',
      [
        {
          text: 'Entendido',
          // onPress: handleLogout,
          onPress: () => navigation.navigate('Settings'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PressableWithSound onPress={() => navigation.replace("AdventureSelectionScreen")} style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </PressableWithSound>
      <View style={styles.content}>
        <Text style={styles.title}>Cancelar Assinatura</Text>
        <Text style={styles.message}>
          Ah não! 😢 Estamos tristes em ver você cancelar a assinatura.
          O coelhinho vai sentir sua falta! Se mudar de ideia, estaremos
          aqui de braços abertos. 🐇
        </Text>
        <TouchableWithSound
          style={styles.cancelButton}
          onPress={handleCancelSubscription}
        >
          <Text style={styles.cancelButtonText}>Confirmar Cancelamento</Text>
        </TouchableWithSound>
        <TouchableWithSound
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableWithSound>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingBottom: 20
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#A0C8E8',
    paddingTop: 59,
    paddingHorizontal: 118,
    paddingBottom: 16,
  },
  logo: {
    width: 156,
    height: 68,
  },
  content: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '80%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#87ADD9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancelSubscriptionScreen;
