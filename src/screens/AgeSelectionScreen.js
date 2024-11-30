import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, } from 'react-native';

import background from '../../assets/images/background.png';
import faseUm from '../../assets/images/coelhos/fase-um.png';
import faseDois from '../../assets/images/coelhos/fase-dois.png';
import faseTres from '../../assets/images/coelhos/fase-tres.png';

const AgeSelectionScreen = ({ navigation }) => {
  const ageGroups = [
    { id: 1, imageSource: faseUm, optionText: 'Pré-escolar', ageText: 'Até 3 anos' },
    { id: 2, imageSource: faseDois, optionText: 'Pré-escolar', ageText: 'Até 3 anos' },
    { id: 3, imageSource: faseTres, optionText: 'Pré-escolar', ageText: 'Até 3 anos' },
  ];

  const handleSelection = (ageGroup) => {
    // alert(`Conteúdo recomendado para crianças do grupo: ${ageGroup.ageText}`);
    navigation.navigate('Loading');
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Escolha uma experiência de conteúdo para seu filho</Text>
        <Text style={styles.subtitle}>
          Sua escolha afetará os tipos de conteúdos que ficarão disponíveis no app.
        </Text>
        {ageGroups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.optionButton} onPress={() => handleSelection(group)}>
            <Image
              source={group.imageSource}
              style={styles.icon}
            />
            <Text style={styles.optionText}>{group.optionText}</Text>
            <Text style={styles.ageText}>{group.ageText}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#969aca',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    width: '82%',
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    width: '78%',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 38,
  },
  optionButton: {
    width: '90%',
    backgroundColor: '#FFEC8A',
    paddingTop: 16,
    paddingBottom: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 19,
    elevation: 3,
    boxShadow: 'none',
  },
  icon: {
    maxWidth: 73,
    maxHeight: 73,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#889DD1',
  },
  ageText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#889DD1',
    marginTop: 5,
  },
});

export default AgeSelectionScreen;
