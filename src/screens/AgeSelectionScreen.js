import React from 'react';
import {
  View,
  Text, ScrollView, StyleSheet, Image, ImageBackground,
} from 'react-native';
import AnimatedRabbit from '../components/AnimatedRabbit';

import background from '../../assets/images/background.png';
import faseUm from '../../assets/images/habbits/fase-um.png';
import faseDois from '../../assets/images/habbits/fase-dois.png';
import faseTres from '../../assets/images/habbits/fase-tres.png';
import { useAgeGroup } from '../context/AgeGroupContext';
import { useAuth } from '../context/AuthContext';
import { PressableWithSound } from '../components/CustomButton';

const AgeSelectionScreen = ({ navigation }) => {
  const { setSelectedAgeGroup } = useAgeGroup();
  const { checkAccess } = useAuth();

  const ageGroups = [
    {
      id: 1,
      iconStyles: {
        maxWidth: 69,
        maxHeight: 69
      },
      imageSource: faseUm,
      optionText: 'Pré-escolar',
      ageSubtitle: 'Até 3 anos',
      ageText: 'para bebês até 3 anos'
    },
    {
      id: 2,
      iconStyles: {
        maxWidth: 69,
        maxHeight: 69
      },
      imageSource: faseDois,
      optionText: 'Crianças Menores',
      ageSubtitle: 'De 4 a 6 anos',
      ageText: 'para crianças de 4 até 6 anos crianças menores'
    },
    {
      id: 3,
      iconStyles: {
        maxWidth: 73,
        maxHeight: 73
      },
      imageSource: faseTres,
      optionText: 'Crianças Maiores',
      ageSubtitle: 'De 7 a 9 anos',
      ageText: 'para crianças de 7 até 9 anos crianças maiores'
    },
  ];

  const handleSelection = async (ageGroup) => {
    if (checkAccess()) {
      await setSelectedAgeGroup(ageGroup)
      navigation.navigate('AdventureSelectionScreen');
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    }
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <AnimatedRabbit corner="bottom-left" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.container}>
          <Text style={styles.title}>Escolha uma experiência de conteúdo para seu filho</Text>
          <Text style={styles.subtitle}>
            Sua escolha afetará os tipos de conteúdos que ficarão disponíveis no app.
          </Text>
          {ageGroups.map((group) => (
            <PressableWithSound key={group.id}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.optionButtonPressed,
              ]}
              onPress={() => handleSelection(group.ageText)}>
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
                    {group.ageSubtitle}
                  </Text>
                </>
              )}
            </PressableWithSound>
          ))}
        </View>
      </ScrollView>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#969aca',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 45
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
