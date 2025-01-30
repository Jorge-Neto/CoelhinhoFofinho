import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const EditProfileScreen = ({ navigation }) => {
  const { updateUserData, userData } = useAuth();

  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone);
  const [avatar, setAvatar] = useState(userData.avatar);

  const handleSave = async () => {
    const updatedData = { name, phone, avatar };
    try {
      await updateUserData(updatedData);
      navigation.goBack();
    } catch (error) {
      // console.error("Erro ao salvar os dados:", error.message);
    }
  };

  const handleSelectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const storageResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false || storageResult.granted === false) {
        alert('Precisamos de permissão para acessar sua galeria e armazenamento!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setAvatar(`data:image/jpeg;base64,${base64}`);
      }
    } catch (error) {
      // console.error('Erro ao selecionar imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <PressableWithSound onPress={() => navigation.replace("AdventureSelectionScreen")} style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </PressableWithSound>
      <View style={styles.fields}>
        <Text style={styles.title}>Editar Perfil</Text>

        <TouchableWithSound onPress={handleSelectImage}>
          <Image source={avatar ? { uri: avatar } : require('../../assets/images/avatar.png')} style={styles.avatar} />
          <Text style={styles.changePhotoText}>Alterar Foto</Text>
        </TouchableWithSound>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Telefone"
          maxLength={11}
          keyboardType="phone-pad"
        />
        <TouchableWithSound style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableWithSound>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#87ADD9',
    paddingTop: 59,
    paddingHorizontal: 118,
    paddingBottom: 16,
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: 29,
    paddingBottom: 37,
  },
  logo: {
    width: 156,
    height: 68,
  },
  fields: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#717171'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#87ADD9',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#717171'
  },
  saveButton: {
    backgroundColor: '#87ADD9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
