import React, { createContext, useContext, useState, useEffect } from "react";
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isClickSoundEnabled, setIsClickSoundEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedMusicSetting = await AsyncStorage.getItem("musicSetting");
        if (savedMusicSetting !== null) {
          setIsMusicEnabled(JSON.parse(savedMusicSetting));
        }
        const savedClickSoundSetting = await AsyncStorage.getItem("clickSoundSetting");
        if (savedClickSoundSetting !== null) {
          setIsClickSoundEnabled(JSON.parse(savedClickSoundSetting));
        }
      } catch (error) {
        // console.error("Erro ao carregar preferências de áudio:", error);
      }
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    const manageMusic = async () => {
      if (isMusicEnabled && !sound) {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            require("../../assets/music/background-music.mp3"),
            { isLooping: true, shouldPlay: true },
          )
          setSound(newSound)
        } catch (error) {
          // console.error("Erro ao carregar ou reproduzir o som:", error)
        }
      } else if (!isMusicEnabled && sound) {
        try {
          await sound.stopAsync()
          await sound.unloadAsync()
        } catch (error) {
          // console.error("Erro ao parar ou descarregar o som:", error)
        }
        setSound(null)
      }
    }
    manageMusic()

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isMusicEnabled, sound]);

  const toggleMusic = async () => {
    const newState = !isMusicEnabled;
    setIsMusicEnabled(newState);
    try {
      await AsyncStorage.setItem("musicSetting", JSON.stringify(newState));
    } catch (error) {
      // console.error("Erro ao salvar preferências de áudio:", error);
    }
  };

  const toggleClickSound = async () => {
    const newState = !isClickSoundEnabled;
    setIsClickSoundEnabled(newState);
    try {
      await AsyncStorage.setItem('clickSoundSetting', JSON.stringify(newState));
    } catch (error) {
      // console.error('Erro ao salvar configurações de som:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ isMusicEnabled, toggleMusic, isClickSoundEnabled, toggleClickSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);