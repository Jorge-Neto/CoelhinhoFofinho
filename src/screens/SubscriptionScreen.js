import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

const SubscriptionScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.replace("AdventureSelectionScreen")} style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>LUKINHA</Text>
      </View>
      <View style={styles.plansSection}>
        <Text style={styles.sectionTitle}>PLANOS E PREÇOS</Text>
        {[
          { name: 'Bunny Hop -', level: 'Básico', description: 'Somente 1 Tela em HD', price: 'R$ 19,90' },
          { name: 'Cottontail Club -', level: 'Intermediário', description: '2 Tela em FULL HD', price: 'R$ 29,90' },
          { name: 'Rabbit -', level: 'Avançado', description: '4 Tela em ULTRA HD', price: 'R$ 49,90' },
        ].map((plan, index) => (
          <View key={index} style={styles.planItem}>
            <View>
              <View style={styles.planTitle}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planLevel}>{plan.level}</Text>
              </View>
            </View>

            <View style={styles.planTitle}>
              <Text style={styles.planDescription}>{plan.description}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
            </View>

          </View>
        ))}
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
      </View>
      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>CONTRATAR PLANO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingBottom: 20
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#A0C8E8',
    paddingTop: 59,
    paddingHorizontal: 118,
    paddingBottom: 16,
  },
  logo: {
    width: 156,
    height: 68,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 59,
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
  planItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 40
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
    marginRight: 'auto'
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
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'regular',
  },
});

export default SubscriptionScreen;
