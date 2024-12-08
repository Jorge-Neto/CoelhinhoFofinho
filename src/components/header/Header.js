import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Switch,
  Button,
  Pressable
} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import background from '../../../assets/images/background.png';

const CustomSwitch = ({ value, onValueChange, label }) => {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{label}</Text>
      <Pressable
        style={[
          styles.switchBase,
          value ? styles.switchActive : styles.switchInactive,
        ]}
        onPress={() => onValueChange(!value)}
      >
        <View
          style={[
            styles.switchThumb,
            value ? styles.thumbActive : styles.thumbInactive,
          ]}
        />
      </Pressable>
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  const handleNavigate = (redirectRoute) => {
    setModalVisible(false)
    navigation.navigate('Loading', { redirectRoute });
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../../assets/images/avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("AdventureSelectionScreen")}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity> */}
      <Ionicons name="search" size={40} color="#889DD1" />
      {/* </TouchableOpacity> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => { }}>
            <ImageBackground
              source={background}
              resizeMode="cover"
              style={styles.background}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../../assets/images/avatar.png')}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalTitle}>LUKINHA</Text>
              </View>
              <View style={styles.optionsContainer}>
                <CustomSwitch
                  value={musicEnabled}
                  onValueChange={setMusicEnabled}
                  label="Música do App"
                />
                <CustomSwitch
                  value={effectsEnabled}
                  onValueChange={setEffectsEnabled}
                  label="Efeitos Sonoros"
                />
              </View>
              <Pressable onPress={() => console.log('Mudar Perfil')}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.modalButtonPressed,
                ]}>
                {({ pressed }) => (
                  <Text style={[styles.modalButtonText, pressed && styles.modalButtonTextPressed]}>Mudar Perfil</Text>
                )}
              </Pressable >
              <Pressable onPress={() => handleNavigate("Settings")}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.modalButtonPressed,
                ]}>
                {({ pressed }) => (
                  <Text style={[styles.modalButtonText, pressed && styles.modalButtonTextPressed]}>Configurações</Text>
                )}
              </Pressable >
            </ImageBackground>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 69,
    marginBottom: 33,
    marginHorizontal: 29.5,
  },
  avatar: {
    width: 61,
    height: 61,
    borderRadius: 20,
  },
  logo: {
    width: 142,
    height: 62,
    resizeMode: 'contain',
  },
  searchIcon: {
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#77C6C4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
    paddingBottom: 37,
    paddingHorizontal: 18.5,
    borderRadius: 10,
  },
  modalContainer: {
    width: 338,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 46
  },
  modalAvatar: {
    width: 94,
    height: 94,
    borderRadius: 30,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#FFFFFF',
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 91
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 1,
  },
  toggleText: {
    fontWeight: 'regular',
    fontSize: 20,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  modalButton: {
    paddingVertical: 11.5,
    backgroundColor: '#C0C8B3',
    marginBottom: 15,
    width: 231,
    borderRadius: 7
  },
  modalButtonPressed: {
    backgroundColor: '#626262',
  },
  modalButtonText: {
    textAlign: 'center',
    fontWeight: 'regular',
    fontSize: 20,
    color: '#FBF3B8',
    textTransform: 'uppercase',
  },
  modalButtonTextPressed: {
    color: '#FFFFFF',
  },
  switchBase: {
    width: 62,
    height: 23,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#767577',
  },
  switchActive: {
    backgroundColor: '#D9D9D9',
  },
  switchInactive: {
    backgroundColor: '#D9D9D9',
  },
  switchThumb: {
    width: 31,
    height: 23,
    borderRadius: 5,
  },
  thumbActive: {
    backgroundColor: '#ACD29C',
    alignSelf: 'flex-end',
  },
  thumbInactive: {
    backgroundColor: '#f4f3f4',
    alignSelf: 'flex-start',
  },
});

export default Header;
