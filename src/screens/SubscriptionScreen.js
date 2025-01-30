import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import PaymentCardSection from '../components/PaymentCardSection';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const SubscriptionScreen = ({ navigation }) => {
  const { updateUserData, userData } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState(userData?.subscriptionPlan || '');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscription = () => {
    if (!selectedPlan) {
      alert('Por favor, selecione um plano.');
      return;
    }

    const updatedData = {
      ...userData,
      subscriptionPlan: selectedPlan,
    };

    updateUserData(updatedData);
    alert('Plano contratado com sucesso!');
    navigation.replace('Settings');
  };

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
        </View>

        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>PLANOS E PREÇOS</Text>
          {[
            { name: 'Bunny Hop', level: ' - Mensal', description: 'Plano Mensal', price: 'R$ 9,90' },
            { name: 'Rabbit', level: ' - Anual', description: 'Plano Anual', price: 'R$ 99,90' },
          ].map((plan, index) => (
            <TouchableWithSound
              key={index}
              style={[
                styles.planItem,
                selectedPlan === plan.name && { backgroundColor: '#87ADD950', borderRadius: '4px' }, // Destaque para o plano selecionado
              ]}
              onPress={() => handleSelectPlan(plan.name)}
            >
              <View style={styles.planTitle}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planLevel}>{plan.level}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
            </TouchableWithSound>
          ))}
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
        </View>

        <TouchableWithSound style={styles.subscribeButton} onPress={handleSubscription}>
          <Text style={styles.subscribeButtonText}>
            {selectedPlan && selectedPlan !== 'Free' ? 'CONTRATAR ' + selectedPlan.toUpperCase() : 'Continuar com plano'}
          </Text>
        </TouchableWithSound>
      </View>
    </ScrollView >
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
    alignItems: 'center'
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
  plansSection: {
    width: '90%',
    borderBottomColor: "#717171",
    borderBottomWidth: 2,
    marginBottom: 27,
  },
  section: {
    width: '90%',
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
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
  },
  planTitle: {
    flexDirection: 'row'
  },
  planName: {
    fontSize: 20,
    fontWeight: 'regular',
  },
  planLevel: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#717171',
    marginLeft: 4
  },
  planDescription: {
    fontSize: 17,
    fontWeight: 'regular',
    color: '#717171',
    marginTop: 12,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'regular',
  },
  subscribeButton: {
    width: 201,
    backgroundColor: '#717171',
    alignItems: 'center',
    marginVertical: 28,
    paddingVertical: 8,
    marginHorizontal: 'auto'
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'regular',
  },
  noCardText: {
    fontSize: 12,
  }
});

export default SubscriptionScreen;
