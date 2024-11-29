import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

import background from '../../assets/images/background.png';
import videoIcon from '../../assets/images/icons/video-icon.png';
import studyIcon from '../../assets/images/icons/study-icon.png';
import learnIcon from '../../assets/images/icons/learn-icon.png';
import gameIcon from '../../assets/images/icons/game-icon.png';

import Ionicons from '@expo/vector-icons/Ionicons'

const AdventureSelectionScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}><Ionicons name="arrow-back" size={46} color="white" /></Text>
        </TouchableOpacity>

        <Text style={styles.title}>QUAL AVENTURA VAMOS EMBARCAR?</Text>
        <Text style={styles.subtitle}>ESCOLHA UMA DAS OPÇÕES!</Text>

        <View style={styles.optionsContainer}>
          {/* DESENHOS */}
          <View style={styles.optionsLine}>
            <TouchableOpacity style={styles.iconButton}
              onPress={() => console.log('DESENHOS')}
            >
              <Image source={videoIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => console.log('DESENHOS')}
            >
              <Text style={styles.buttonText}>DESENHOS</Text>
            </TouchableOpacity>
          </View>
          {/* ESTUDAR */}
          <View style={styles.optionsLine}>
            <TouchableOpacity
              style={[styles.optionButton, styles.buttonBlue]}
              onPress={() => console.log('ESTUDAR')}
            >
              <Text style={styles.buttonText}>ESTUDAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.buttonBlue]}
              onPress={() => console.log('ESTUDAR')}
            >
              <Image source={studyIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          {/* APRENDER */}
          <View style={styles.optionsLine}>
            <TouchableOpacity style={styles.iconButton}
              onPress={() => console.log('APRENDER')}
            >
              <Image source={learnIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => console.log('APRENDER')}
            >
              <Text style={styles.buttonText}>APRENDER</Text>
            </TouchableOpacity>
          </View>
          {/* JOGAR */}
          <View style={styles.optionsLine}>
            <TouchableOpacity
              style={[styles.optionButton, styles.buttonBlue]}
              onPress={() => console.log('JOGAR')}
            >
              <Text style={styles.buttonText}>JOGAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.buttonBlue]}
              onPress={() => console.log('JOGAR')}
            >
              <Image source={gameIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#f39b92',
    height: '100dvh'
  },
  container: {
    flex: 1,
    paddingTop: 58,
    width: 324,
    marginHorizontal: 'auto'
  },
  backButton: {
  },
  title: {
    fontSize: 21,
    fontWeight: 700,
    color: '#FFFFFF',
    marginTop: 12,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // width: 324,
    // marginHorizontal: 'auto'
  },
  optionsLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 15.86,
    alignItems: 'center'
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7FC7C0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 100,
    width: 139.13,
    height: 139.13,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7FC7C0',
    width: 169,
    borderRadius: 2.56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3.41 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonBlue: {
    backgroundColor: '#889DD1',
  },
  iconWrapper: {
    backgroundColor: '#7FC7C0',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#FFFFFF',
  },
});

export default AdventureSelectionScreen;
