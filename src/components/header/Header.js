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

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  const handleNavigate = (redirectRoute) => {
    // alert(`Conteúdo recomendado para crianças do grupo: ${ageGroup.ageText}`);
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

      <TouchableOpacity onPress={() => navigation.navigate("AdventureSelectionScreen")}>
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
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleText}>Música do App</Text>
                  <Switch
                    value={musicEnabled}
                    onValueChange={setMusicEnabled}
                    trackColor={{ false: '#767577', true: '#D9D9D9' }}
                    thumbColor={musicEnabled ? '#ACD29C' : '#f4f3f4'}
                  />
                </View>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleText}>Efeitos Sonoros</Text>
                  <Switch
                    value={effectsEnabled}
                    onValueChange={setEffectsEnabled}
                    trackColor={{ false: '#767577', true: '#D9D9D9' }}
                    thumbColor={effectsEnabled ? '#ACD29C' : '#f4f3f4'}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Mudar Perfil')}>
                <Text style={styles.modalButtonText}>Mudar Perfil</Text>

              </TouchableOpacity >
              <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate("Settings")}>
                <Text style={styles.modalButtonText}>Configurações</Text>
              </TouchableOpacity >
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
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
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
    // width: 24,
    // height: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    // flex: 1,
    // resizeMode: 'cover',
    backgroundColor: '#77C6C4',
    // height: '100dvh',
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
    fontWeight: 400,
    color: '#FFFFFF',
  },
  optionsContainer: {
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
    fontWeight: 400,
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
  modalButtonText: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 20,
    color: '#FBF3B8',
    textTransform: 'uppercase',
  },
});

export default Header;
