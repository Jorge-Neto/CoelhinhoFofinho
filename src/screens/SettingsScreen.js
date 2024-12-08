import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'

const SettingsScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

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

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.replace("AdventureSelectionScreen")} style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Pressable>

      <View style={styles.content}>

        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>LUKINHA</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ASSINATURA E COBRANÇA</Text>
          <Text style={styles.sectionText}>Seu e-mail</Text>
          <Text style={styles.sectionText}>Senha</Text>
          <Text style={styles.sectionText}>Telefone</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAGAMENTOS</Text>
          <Text style={styles.sectionText}>Cartão</Text>
          <View style={styles.paymentInfo}>
            <View style={styles.card}>
              <View style={styles.cardChip} />
              <Text style={styles.cardNumber}>**** **** **** 8640</Text>
            </View>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>
                TROCAR MÉTODO DE PAGAMENTO
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>CANCELAR ASSINATURA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETALHES DO PLANO</Text>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>Rabbit</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>ULTRA HD</Text>
            </View>
          </View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed,
            ]} onPressIn={handlePressIn}
              onPressOut={handlePressOut}

              onPress={() => handleNavigation('Subscription')}>
              <Text style={styles.linkText}>Alterar plano</Text>
              <Ionicons name="arrow-forward" size={13} color="#000000" />
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONFIGURAÇÕES</Text>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Gerenciar aparelhos</Text>
            <Ionicons name="arrow-forward" size={13} color="#000000" />

          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Excluir conta</Text>
            <Ionicons name="arrow-forward" size={13} color="#000000" />

          </TouchableOpacity>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed,
            ]} onPressIn={handlePressIn}
              onPressOut={handlePressOut}

              onPress={handleLogout}>
              <Text style={styles.linkText}>Sair da conta</Text>
              <Ionicons name="arrow-forward" size={13} color="#000000" />
            </Pressable>
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
  cardNumber: {
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
