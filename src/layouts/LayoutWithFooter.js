import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import background from '../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';

const LayoutWithFooter = ({ children, activeTab }) => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Drawing' && styles.activeButton]}
          onPress={() => handleNavigate('Drawing')}
        >
          <Text style={styles.footerText}>Desenhos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Study' && styles.activeButton]}
          onPress={() => handleNavigate('Study')}
        >
          <Text style={styles.footerText}>Estudar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Learning' && styles.activeButton]}
          onPress={() => handleNavigate('Learning')}
        >
          <Text style={styles.footerText}>Aprender</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Game' && styles.activeButton]}
          onPress={() => handleNavigate('Game')}
        >
          <Text style={styles.footerText}>Jogos</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#77C6C4',
    height: '100dvh'
  },
  content: {
    flex: 1,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#87add9',
    paddingVertical: 10,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#6e9cd2',
  },
  activeButton: {
    backgroundColor: '#4a80c5',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
})

export default LayoutWithFooter;
