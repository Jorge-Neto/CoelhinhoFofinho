import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

const StudyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividades de Estudo</Text>
      <TextInput
        placeholder="Buscar por tema"
        placeholderTextColor="#888"
        style={styles.searchBar}
      />
      <ScrollView horizontal>
        <View style={styles.item}>
          <Text>Estudo 1</Text>
        </View>
        <View style={styles.item}>
          <Text>Estudo 2</Text>
        </View>
        <View style={styles.item}>
          <Text>Estudo 3</Text>
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
    backgroundColor: '#FFF8E1',
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

export default StudyScreen;