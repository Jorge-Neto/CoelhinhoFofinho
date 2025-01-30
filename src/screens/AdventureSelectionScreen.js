import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';
import { useAuth } from '../context/AuthContext';

import background from '../../assets/images/background.png';
import videoIcon from '../../assets/images/icons/video-icon.png';
import studyIcon from '../../assets/images/icons/study-icon.png';
import learnIcon from '../../assets/images/icons/learn-icon.png';
import gameIcon from '../../assets/images/icons/game-icon.png';

import Ionicons from '@expo/vector-icons/Ionicons'
import AnimatedRabbit from '../components/AnimatedRabbit';
import { PressableWithSound } from '../components/CustomButton';

const AdventureSelectionScreen = ({ navigation }) => {
  const { checkAccess } = useAuth();

  const handleNavigate = (selectedTab) => {
    if (checkAccess()) {
      navigation.navigate('Loading', { redirectRoute: selectedTab });
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
      <AnimatedRabbit corner="bottom-right" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <PressableWithSound style={styles.backButton} onPress={() => navigation.navigate('AgeSelectionScreen')}>
            {({ pressed }) => (
              <Text><Ionicons name="arrow-back" size={47} color={pressed ? '#889DD1' : 'white'} /></Text>
            )}
          </PressableWithSound>

          <Text style={styles.title}>QUAL AVENTURA VAMOS EMBARCAR?</Text>
          <Text style={styles.subtitle}>ESCOLHA UMA DAS OPÇÕES!</Text>

          <View style={styles.optionsContainer}>
            {/* DESENHOS */}
            <PressableWithSound style={styles.optionsLine} onPress={() => handleNavigate('Drawing')}>
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.iconButton,
                      pressed && styles.iconButtonPressed,
                    ]}>
                    <Image source={videoIcon} style={[
                      styles.icon,
                      pressed && styles.iconPressed,
                    ]} />
                  </View>

                  <View
                    style={[
                      styles.optionButton,
                      pressed && styles.optionButtonPressed,
                    ]}>

                    <Text
                      style={[
                        styles.buttonText,
                        pressed && styles.textPressed,
                      ]}>DESENHOS</Text>
                  </View>
                </>
              )}
            </PressableWithSound>
            {/* ESTUDAR */}
            <PressableWithSound style={styles.optionsLine} onPress={() => handleNavigate('Study')}>
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.optionButton,
                      styles.buttonBlue,
                      pressed && styles.buttonBluePressed,
                    ]}>

                    <Text
                      style={[
                        styles.buttonText,
                        pressed && styles.textPressed,
                      ]}>ESTUDAR</Text>
                  </View>

                  <View
                    style={[
                      styles.iconButton,
                      styles.buttonBlue,
                      pressed && styles.buttonBluePressed,
                    ]}>
                    <Image source={studyIcon} style={[
                      styles.icon,
                      pressed && styles.iconPressed,
                    ]} />
                  </View>
                </>
              )}
            </PressableWithSound>
            {/* APRENDER */}
            <PressableWithSound style={styles.optionsLine} onPress={() => handleNavigate('Learning')}>
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.iconButton,
                      pressed && styles.iconButtonPressed,
                    ]}>
                    <Image source={learnIcon} style={[
                      styles.icon,
                      pressed && styles.iconPressed,
                    ]} />
                  </View>

                  <View
                    style={[
                      styles.optionButton,
                      pressed && styles.optionButtonPressed,
                    ]}>

                    <Text
                      style={[
                        styles.buttonText,
                        pressed && styles.textPressed,
                      ]}>APRENDER</Text>
                  </View>
                </>
              )}
            </PressableWithSound>
            {/* JOGAR */}
            <PressableWithSound style={styles.optionsLine} onPress={() => handleNavigate('Game')}>
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.optionButton,
                      styles.buttonBlue,
                      pressed && styles.buttonBluePressed,
                    ]}>

                    <Text
                      style={[
                        styles.buttonText,
                        pressed && styles.textPressed,
                      ]}>JOGAR</Text>
                  </View>

                  <View
                    style={[
                      styles.iconButton,
                      styles.buttonBlue,
                      pressed && styles.buttonBluePressed,
                    ]}>
                    <Image source={gameIcon} style={[
                      styles.icon,
                      pressed && styles.iconPressed,
                    ]} />
                  </View>
                </>
              )}
            </PressableWithSound>
          </View>
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
    backgroundColor: '#f39b92',
    height: '100dvh'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 45
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
  iconButtonPressed: {
    backgroundColor: '#6EE9E6',
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#77C6C4',
    width: 169,
    borderRadius: 2.56,
    paddingVertical: 3.5,
    boxShadow: '0px 4px 4px 0px #00000040',
  },
  optionButtonPressed: {
    backgroundColor: '#6EE9E6',
  },
  buttonBlue: {
    backgroundColor: '#889DD1',
  },
  buttonBluePressed: {
    backgroundColor: '#B5CAFF',
  },
  icon: {
    resizeMode: 'contain',
  },
  iconPressed: {
    tintColor: '#4F4F4F',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#FFFFFF',
  },
  textPressed: {
    color: '#4F4F4F',
  },
});

export default AdventureSelectionScreen;
