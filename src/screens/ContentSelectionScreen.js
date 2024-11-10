import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContentSelectionScreen = ({ navigation }) => {
  const ageGroups = [
    { label: '0-2 anos', value: '0-2' },
    { label: '3-5 anos', value: '3-5' },
    { label: '6-8 anos', value: '6-8' },
    { label: '9-10 anos', value: '9-10' },
  ];

  const handleSelection = (ageGroup) => {
    // Adicione a lógica para processar a seleção de faixa etária
    alert(`Conteúdo recomendado para: ${ageGroup.label}`);
    navigation.navigate('Loading');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a faixa etária da criança:</Text>
      <View style={styles.buttonsContainer}>
        {ageGroups.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleSelection(group)}
          >
            <Text style={styles.buttonText}>{group.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1', // Ajuste conforme a cor de fundo do Figma
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%', // Ajuste a largura conforme o design do Figma
    backgroundColor: '#90EE90', // Substitua pela cor do Figma
    padding: 15,
    borderRadius: 12, // Ajuste conforme o design do Figma
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2, // Adicione sombra se necessário
  },
  buttonText: {
    color: '#000',
    fontSize: 18, // Ajuste para corresponder ao tamanho do Figma
    fontWeight: 'bold',
  },
});

export default ContentSelectionScreen;