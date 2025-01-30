import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'
import { useAuth } from '../context/AuthContext';
import PaymentCardSection from '../components/PaymentCardSection';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const SettingsScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const { checkAccess, userData, fetchUserData, handleLogout, currentUser } = useAuth()

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.01,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigation = (redirectRoute) => {
    navigation.navigate('Loading', { redirectRoute });
  };

  const handleProfileEdit = () => {
    navigation.navigate('EditProfileScreen', { userData });
  };

  const handleChangePlan = () => {
    navigation.navigate('Subscription', { userData });
  };

  const handleCancelSubscription = () => {
    navigation.navigate('CancelSubscription');
  };

  const hangleDeletePress = async () => {
    navigation.navigate('DeleteAccount');
  };

  const hangleLogoutPress = async () => {
    try {
      await handleLogout()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchUserData();

    if (!checkAccess()) {
      handleLogout()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    }
  }, [navigation]);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PressableWithSound onPress={() => navigation.replace("AdventureSelectionScreen")} style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </PressableWithSound>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image source={userData?.avatar ? { uri: userData.avatar } : require('../../assets/images/avatar.png')} style={styles.avatar} />
          <Text style={styles.profileName}>{userData?.name}</Text>
          <TouchableWithSound
            style={styles.editProfileButton}
            onPress={handleProfileEdit}
          >
            <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
          </TouchableWithSound>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ASSINATURA E COBRANÇA</Text>
          <Text style={styles.sectionText}>Seu e-mail: {currentUser?.email}</Text>
          <Text style={styles.sectionText}>Telefone: {userData?.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAGAMENTOS</Text>
          <PaymentCardSection
            paymentMethod={userData?.paymentMethod}
            creditCardNumber={userData?.creditCardNumber}
            creditCardExpiry={userData?.creditCardExpiry}
            creditCardCVV={userData?.creditCardCVV}
          />
          <TouchableWithSound
            style={styles.paymentButton}
            onPress={() => navigation.navigate('PaymentMethod')}
          >
            <Text style={styles.paymentButtonText}>TROCAR MÉTODO DE PAGAMENTO</Text>
          </TouchableWithSound>

          {userData?.subscriptionPlan !== "Free" ?
            (
              <TouchableWithSound style={styles.cancelButton} onPress={handleCancelSubscription}>
                <Text style={styles.cancelButtonText}>CANCELAR ASSINATURA</Text>
              </TouchableWithSound>
            ) :
            (<View style={{ marginTop: 24 }} />)
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETALHES DO PLANO</Text>
          <View style={styles.planInfo}>
            {userData?.subscriptionPlan == "Free" ?
              <Text style={styles.planName}>Gratuito</Text> :
              (<View style={{ flexDirection: 'row' }}>
                <Text style={styles.planName}>{userData?.subscriptionPlan}</Text>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{userData?.subscriptionPlan == 'Rabbit' ? 'Anual' : 'Mensal'}</Text>
                </View>
              </View>)
            }
          </View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <PressableWithSound style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed,
            ]} onPressIn={handlePressIn}
              onPressOut={handlePressOut}

              onPress={handleChangePlan}>
              <Text style={styles.linkText}>Alterar plano</Text>
              <Ionicons name="arrow-forward" size={13} color="#000000" />
            </PressableWithSound>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONFIGURAÇÕES</Text>
          <TouchableWithSound style={styles.link} onPress={hangleDeletePress}>
            <Text style={styles.linkText}>Excluir conta</Text>
            <Ionicons name="arrow-forward" size={13} color="#000000" />

          </TouchableWithSound>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <PressableWithSound style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed,
            ]} onPressIn={handlePressIn}
              onPressOut={handlePressOut}

              onPress={hangleLogoutPress}>
              <Text style={styles.linkText}>Sair da conta</Text>
              <Ionicons name="arrow-forward" size={13} color="#000000" />
            </PressableWithSound>
          </Animated.View>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 57,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#717171',
  },
  editProfileButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#87ADD9',
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    borderBottomColor: "#717171",
    borderBottomWidth: 2,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#717171',
    marginBottom: 24,
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#717171',
    marginBottom: 11,
  },
  paymentInfo: {
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardChip: {
    width: 62,
    height: 33,
    backgroundColor: '#717171',
    marginRight: 10,
  },
  creditCard: {
    fontSize: 20,
    color: '#717171',
  },
  paymentButton: {
    marginTop: 16,
    borderRadius: 5,
    marginVertical: 0,
  },
  paymentButtonText: {
    fontSize: 12,
    color: '#717171',
    fontWeight: 'regular',
    textAlign: 'left',
  },
  cancelButton: {
    marginVertical: 29,
    padding: 10,
    backgroundColor: '#717171',
    width: 200,
    marginHorizontal: 'auto'
    // marginHorizontal: '50%',
    // transform: [{ translateX: -100 }],
  },
  cancelButtonText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'regular',
    textAlign: 'center',
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  planName: {
    fontSize: 20,
    color: '#000000',
    marginRight: 26,
  },
  planBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    borderColor: '#000000',
    borderWidth: 1,
  },
  planBadgeText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'regular',
  },
  link: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 353,
    padding: 4
  },
  linkPressed: {
    backgroundColor: '#B3B3B3',
  },
  linkText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'regular',
  },
});

export default SettingsScreen;
