import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const DeleteAccountScreen = () => {
  const navigation = useNavigation();
  const { showPasswordPrompt, setDeleteJustification, loading } = useAuth();
  const [justification, setJustification] = useState('');


  const handleDeleteAccount = async () => {
    await setDeleteJustification(justification)
    showPasswordPrompt();
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
        <Text style={styles.title}>Que pena que você vai embora...</Text>
        <Text style={styles.description}>
          Vamos sentir sua falta! 🐇 Mas sabemos que às vezes é hora de seguir
          novos caminhos. Se mudar de ideia, estaremos sempre por aqui!
        </Text>

        <Text style={styles.justificationTitle}>Qual é o motivo da sua exclusão?</Text>
        <TextInput
          style={styles.textInput}
          value={justification}
          onChangeText={setJustification}
          placeholder="Digite sua justificativa (opcional)"
          multiline
          editable={!loading}
        />

        <TouchableWithSound
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>
            {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : 'Confirmar Exclusão'}
          </Text>
        </TouchableWithSound>
        <TouchableWithSound
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>
            {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : 'Cancelar'}
          </Text>
        </TouchableWithSound>
      </View>
    </View>
  );
};

export default DeleteAccountScreen;

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
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#717171',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#717171',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  justificationTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#717171',
    marginHorizontal: 'auto'
  },
  textInput: {
    height: 100,
    borderColor: '#717171',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 'auto'
  },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  cancelButton: {
    backgroundColor: '#87ADD9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
