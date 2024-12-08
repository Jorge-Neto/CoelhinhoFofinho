import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Pressable, } from 'react-native';

import background from '../../assets/images/background.png';
import faseUm from '../../assets/images/habbits/fase-um.png';
import faseDois from '../../assets/images/habbits/fase-dois.png';
import faseTres from '../../assets/images/habbits/fase-tres.png';

const AgeSelectionScreen = ({ navigation }) => {
  const ageGroups = [
    { id: 1, iconStyles: { maxWidth: 69, maxHeight: 69 }, imageSource: faseUm, optionText: 'Pré-escolar', ageText: 'Até 3 anos' },
    { id: 2, iconStyles: { maxWidth: 69, maxHeight: 69 }, imageSource: faseDois, optionText: 'Crianças Menores', ageText: 'De 4 a 6 anos' },
    { id: 3, iconStyles: { maxWidth: 73, maxHeight: 73 }, imageSource: faseTres, optionText: 'Crianças Maiores', ageText: 'De 7 a 9 anos' },
  ];

  const handleSelection = () => {
    navigation.navigate('AdventureSelectionScreen');
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
          <Pressable key={group.id}
            style={({ pressed }) => [
              styles.optionButton,
              pressed && styles.optionButtonPressed,
            ]}
            onPress={handleSelection}>
            {({ pressed }) => (
              <>
                <Image
                  source={group.imageSource}
                  style={group.iconStyles}
                />
                <Text
                  style={[
                    styles.optionText,
                    pressed && styles.textPressed,
                  ]}
                >
                  {group.optionText}
                </Text>
                <Text
                  style={[
                    styles.ageText,
                    pressed && styles.textPressed,
                  ]}
                >
                  {group.ageText}
                </Text>
              </>
            )}
          </Pressable>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 78
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '82%',
    marginBottom: 6,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'regular',
    width: '78%',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 36,
  },
  optionButton: {
    width: 272,
    backgroundColor: '#FCED93',
    paddingTop: 16,
    paddingBottom: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 19,
    elevation: 1,
    boxShadow: 'none',
  },
  optionButtonPressed: {
    backgroundColor: '#FFE651',
  },
  icon: {
    maxWidth: 73,
    maxHeight: 73,
  },
  optionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#889DD1',
    marginBottom: 0,
  },
  ageText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#889DD1',
    marginTop: 0,
  },
  textPressed: {
    color: '#000000',
  },

});

export default AgeSelectionScreen;
