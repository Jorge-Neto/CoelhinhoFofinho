import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatString } from '../utils/convertText';
import { TouchableWithSound } from './CustomButton';

const PaymentCardSection = ({ paymentMethod, creditCardNumber, creditCardExpiry, creditCardCVV }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <View>
      {!paymentMethod ? (
        <Text style={styles.sectionText}>Nenhum pagamento selecionado</Text>
      ) : (
        creditCardNumber && creditCardExpiry && creditCardCVV
          ? (
            <View>
              <Text style={styles.sectionText}>Cartão</Text>
              <View style={styles.paymentInfo}>
                <View style={styles.card}>
                  <Text style={styles.creditCard}>
                    {showCardNumber
                      ? formatString(creditCardNumber)
                      : `**** **** **** ${formatString(creditCardNumber).slice(-4)}`}
                  </Text>
                  <Text style={styles.cardDetails}>
                    Válido até: {creditCardExpiry} | CVV: ***
                  </Text>
                </View>
                <TouchableWithSound
                  style={styles.paymentButton}
                  onPress={() => setShowCardNumber((prev) => !prev)}
                >
                  <Text style={styles.paymentButtonText}>
                    {showCardNumber ? 'Ocultar cartão' : 'Mostrar cartão'}
                  </Text>
                </TouchableWithSound>
              </View>
            </View>
          )
          : <Text style={styles.sectionText}>Pagamento no pix</Text>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'column',
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
  cardDetails: {
    color: '#717171',
    marginTop: 8

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

  noCardText: {
    fontSize: 16,
    color: '#666',
  },
});

export default PaymentCardSection;
