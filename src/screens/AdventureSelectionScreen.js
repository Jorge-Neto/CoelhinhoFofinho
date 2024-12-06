import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

import background from '../../assets/images/background.png';
import videoIcon from '../../assets/images/icons/video-icon.png';
import studyIcon from '../../assets/images/icons/study-icon.png';
import learnIcon from '../../assets/images/icons/learn-icon.png';
import gameIcon from '../../assets/images/icons/game-icon.png';

import Ionicons from '@expo/vector-icons/Ionicons'

const AdventureSelectionScreen = ({ navigation }) => {

  const handleNavigate = (selectedTab) => {
    navigation.navigate(selectedTab, { tab: selectedTab });
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AgeSelectionScreen')}>
          <Text><Ionicons name="arrow-back" size={47} color="white" /></Text>
        </TouchableOpacity>

        <Text style={styles.title}>QUAL AVENTURA VAMOS EMBARCAR?</Text>
        <Text style={styles.subtitle}>ESCOLHA UMA DAS OPÇÕES!</Text>

        <View style={styles.optionsContainer}>
          {/* DESENHOS */}
          <TouchableOpacity style={styles.optionsLine} onPress={() => handleNavigate('Drawing')}>
            <View style={styles.iconButton}>
              <Image source={videoIcon} style={styles.icon} />
            </View>
            <View
              style={styles.optionButton}>
              <Text style={styles.buttonText}>DESENHOS</Text>
            </View>
          </TouchableOpacity>
          {/* ESTUDAR */}
          <TouchableOpacity style={styles.optionsLine} onPress={() => handleNavigate('Study')}>
            <View
              style={[styles.optionButton, styles.buttonBlue]}
            >
              <Text style={styles.buttonText}>ESTUDAR</Text>
            </View>
            <View style={[styles.iconButton, styles.buttonBlue]}
            >
              <Image source={studyIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>
          {/* APRENDER */}
          <TouchableOpacity style={styles.optionsLine} onPress={() => handleNavigate('Learning')}>
            <View style={styles.iconButton}
            >
              <Image source={learnIcon} style={styles.icon} />
            </View>
            <View
              style={styles.optionButton}
            >
              <Text style={styles.buttonText}>APRENDER</Text>
            </View>
          </TouchableOpacity>
          {/* JOGAR */}
          <TouchableOpacity style={styles.optionsLine} onPress={() => handleNavigate('Game')}>
            <View
              style={[styles.optionButton, styles.buttonBlue]}
            >
              <Text style={styles.buttonText}>JOGAR</Text>
            </View>
            <View style={[styles.iconButton, styles.buttonBlue]}
            >
              <Image source={gameIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>
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
    width: '70%',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'Regular',
    color: '#FFFFFF',
    marginTop: 9,
    marginBottom: 34,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    borderRadius: 100,
    width: 139,
    height: 139,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7FC7C0',
    width: 169,
    borderRadius: 2.56,
    paddingVertical: 3.5,
    boxShadow: '0px 4px 4px 0px #00000040',
  },
  buttonBlue: {
    backgroundColor: '#889DD1',
  },
  icon: {
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#FFFFFF',
  },
});

export default AdventureSelectionScreen;
