import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

const DrawingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenhos Disponíveis</Text>
      <TextInput
        placeholder="Buscar por nome"
        placeholderTextColor="#888"
        style={styles.searchBar}
      />
      <ScrollView horizontal>
        <View style={styles.item}>
          <Text>Desenho 1</Text>
        </View>
        <View style={styles.item}>
          <Text>Desenho 2</Text>
        </View>
        <View style={styles.item}>
          <Text>Desenho 3</Text>
        </View>
        {/* Adicione mais itens conforme necessário */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1', // Ajuste para a cor de fundo conforme o Figma
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  searchBar: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 8,
  },
});

export default DrawingScreen;