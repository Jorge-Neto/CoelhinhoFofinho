import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const options = [
    { id: 1, label: 'Dados da Conta', action: () => alert('Dados da Conta') },
    { id: 2, label: 'Planos', action: () => alert('Planos') },
    { id: 3, label: 'Dados Financeiros', action: () => alert('Dados Financeiros') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={id}
          style={styles.button}
          onPress={option.action}
        >
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1', // Ajuste conforme a cor de fundo do Figma
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#FFB6C1', // Ajuste para corresponder ao design do Figma
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2, // Para destacar os botões
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
