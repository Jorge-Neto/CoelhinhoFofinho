import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native';
import background from '../../../assets/images/background.png';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { PressableWithSound, TouchableWithSound } from '../CustomButton';

const CustomSwitch = ({ value, onValueChange, label }) => {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{label}</Text>
      <PressableWithSound
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
      </PressableWithSound>
    </View>
  );
};

const Header = ({ activeTab }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const { userData } = useAuth()
  const { isClickSoundEnabled, toggleClickSound, isPlaying, isMusicEnabled, toggleMusic } = useAudio();

  const handleNavigate = (redirectRoute) => {
    setModalVisible(false)
    navigation.navigate('Loading', { redirectRoute });
  };

  const handleSearch = () => {
    if (route.name !== 'SearchScreen') {
      navigation.replace("SearchScreen")
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableWithSound onPress={() => setModalVisible(true)}>
        <Image
          source={userData?.avatar ? { uri: userData.avatar } : require('../../../assets/images/avatar.png')}
          style={styles.avatar}
        />
      </TouchableWithSound>

      <TouchableWithSound onPress={() => navigation.replace("AdventureSelectionScreen")}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </TouchableWithSound>

      <TouchableWithSound onPress={handleSearch} disabled={route.name == 'SearchScreen'}>
        {activeTab !== 'Game' && <Ionicons name="search" size={40} color="#889DD1" />}
      </TouchableWithSound>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <PressableWithSound
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <PressableWithSound style={styles.modalContainer} onPress={() => { }}>
            <ImageBackground
              source={background}
              resizeMode="cover"
              style={styles.background}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={userData?.avatar ? { uri: userData.avatar } : require('../../../assets/images/avatar.png')}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalTitle}>{userData?.name}</Text>
              </View>
              <View style={styles.optionsContainer}>
                <CustomSwitch
                  value={isMusicEnabled}
                  onValueChange={toggleMusic}
                  label="Música do App"
                />
                <CustomSwitch
                  value={isClickSoundEnabled}
                  onValueChange={toggleClickSound}
                  label="Efeitos Sonoros"
                />
              </View>
              {/* <PressableWithSound onPress={() => console.log('Mudar Perfil')}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.modalButtonPressed,
                ]}>
                {({ pressed }) => (
                  <Text style={[styles.modalButtonText, pressed && styles.modalButtonTextPressed]}>Mudar Perfil</Text>
                )}
              </PressableWithSound > */}
              <PressableWithSound onPress={() => handleNavigate("Settings")}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.modalButtonPressed,
                ]}>
                {({ pressed }) => (
                  <Text style={[styles.modalButtonText, pressed && styles.modalButtonTextPressed]}>Configurações</Text>
                )}
              </PressableWithSound >
            </ImageBackground>
          </PressableWithSound>
        </PressableWithSound>
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
    borderRadius: 50,
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
    borderRadius: 50,
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
