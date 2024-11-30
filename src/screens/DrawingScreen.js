import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';

const DrawingScreen = () => {
  return (
    <LayoutWithFooter activeTab={'Drawing'}>
      <View style={styles.container}>
        <Text style={styles.title}>Desenhos Disponíveis</Text>
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
        </ScrollView>
      </View>
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
