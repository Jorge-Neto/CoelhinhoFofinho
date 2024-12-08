import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import background from '../../assets/images/background.png';
import videoIcon from '../../assets/images/icons/video-icon.png';
import studyIcon from '../../assets/images/icons/study-icon.png';
import learnIcon from '../../assets/images/icons/learn-icon.png';
import gameIcon from '../../assets/images/icons/game-icon.png';

import { useNavigation } from '@react-navigation/native';
import Header from '../components/header/Header';

const LayoutWithFooter = ({ children, activeTab }) => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.replace(screen);
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <Header />
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <Pressable
          style={styles.footerButton}
          onPress={() => handleNavigate('Drawing')}
        >
          {({ pressed }) => (
            <>
              <Image style={[styles.footerImage, pressed && styles.activeButton]} source={videoIcon} />
              <Text style={styles.footerText}>Desenhos</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.footerButton}
          onPress={() => handleNavigate('Study')}
        >
          {({ pressed }) => (
            <>
              <Image style={[styles.footerImage, pressed && styles.activeButton]} source={studyIcon} />
              <Text style={styles.footerText}>Estudar</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.footerButton}
          onPress={() => handleNavigate('Learning')}
        >
          {({ pressed }) => (
            <>
              <Image style={[styles.footerImage, pressed && styles.activeButton]} source={learnIcon} />
              <Text style={styles.footerText}>Aprender</Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.footerButton}
          onPress={() => handleNavigate('Game')}
        >
          {({ pressed }) => (
            <>
              <Image style={[styles.footerImage, pressed && styles.activeButton]} source={gameIcon} />
              <Text style={styles.footerText}>Jogos</Text>
            </>
          )}
        </Pressable>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#DFE3D9',
    height: '100dvh'
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#87add9',
    paddingVertical: 10,
    paddingHorizontal: 24
  },
  footerButton: {
    width: 64,
    height: 48,
    textAlign: 'center',
    justifyContent: 'center'
  },
  activeButton: {
    tintColor: '#F8BB99',
  },
  footerImage: {
    objectFit: 'contain',
    maxWidth: 50,
    maxHeight: 36,
    marginHorizontal: 'auto',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
    marginHorizontal: 'auto',
    marginTop: 2,
  },
})

export default LayoutWithFooter;
