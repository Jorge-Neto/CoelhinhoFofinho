import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { PressableWithSound, TouchableWithSound } from '../components/CustomButton';

const PaymentMethodScreen = ({ navigation }) => {
  const { userData, updateUserData } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState(userData?.paymentMethod || '');
  const [creditCardName, setCreditCardName] = useState(userData?.creditCardName || '');
  const [creditCardNumber, setCreditCardNumber] = useState(userData?.creditCardNumber || '');
  const [creditCardExpiry, setCreditCardExpiry] = useState(userData?.creditCardExpiry || '');
  const [creditCardCVV, setCreditCardCVV] = useState(userData?.creditCardCVV || '');
  const [isSaving, setIsSaving] = useState(false);;

  const handleSavePaymentMethod = async () => {
    if (!paymentMethod) {
      Alert.alert('Erro', 'Por favor, selecione um método de pagamento.');
      return;
    }

    if (paymentMethod === 'Cartao') {
      if (!creditCardName) {
        Alert.alert('Erro', 'Por favor, informe o nome presente no cartão.');
        return;
      }
      if (!creditCardNumber) {
        Alert.alert('Erro', 'Por favor, informe o número do cartão.');
        return;
      }
      if (!/^\d{16}$/.test(creditCardNumber)) {
        Alert.alert('Erro', 'Número do cartão inválido.');
        return;
      }
      if (!creditCardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(creditCardExpiry)) {
        Alert.alert('Erro', 'Por favor, informe uma data de validade válida (MM/AA).');
        return;
      }
      if (!creditCardCVV || !/^\d{3,4}$/.test(creditCardCVV)) {
        Alert.alert('Erro', 'Por favor, informe um código de verificação válido.');
        return;
      }
    }

    setIsSaving(true);
    try {
      const updatedData = {
        paymentMethod,
        ...(paymentMethod === 'Cartao' && {
          creditCardName,
          creditCardNumber,
          creditCardExpiry,
          creditCardCVV,
        }),
      };

      await updateUserData(updatedData);
      Alert.alert('Sucesso', 'Método de pagamento atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o método de pagamento.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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


        <Text style={styles.title}>Selecione o Método de Pagamento</Text>
        <View style={styles.methodContainer}>
          <TouchableWithSound
            style={[
              styles.methodButton,
              paymentMethod === 'Pix' && styles.methodButtonSelected,
            ]}
            onPress={() => setPaymentMethod('Pix')}
          >
            <Ionicons name="cash" size={18} color={paymentMethod === 'Pix' ? "#FFFFFF" : '#717171'} />
            <Text
              style={[
                styles.methodText,
                paymentMethod === 'Pix' && styles.methodTextSelected,
              ]}
            >
              Pix
            </Text>
          </TouchableWithSound>
          <TouchableWithSound
            style={[
              styles.methodButton,
              paymentMethod === 'Cartao' && styles.methodButtonSelected,
            ]}
            onPress={() => setPaymentMethod('Cartao')}
          >
            <Ionicons name="card" size={18} color={paymentMethod === 'Cartao' ? "#FFFFFF" : '#717171'} />
            <Text
              style={[
                styles.methodText,
                paymentMethod === 'Cartao' && styles.methodTextSelected,
              ]}
            >
              Cartão
            </Text>
          </TouchableWithSound>
        </View>
        {paymentMethod === 'Cartao' && (
          <View style={styles.cardInputContainer}>
            <Text style={styles.cardInputLabel}>Nome presente no Cartão:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome presente no cartão"
              keyboardType="numeric"
              value={creditCardName}
              onChangeText={setCreditCardName}
              maxLength={16}
            />
            <Text style={styles.cardInputLabel}>Número do Cartão:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o número do cartão"
              keyboardType="numeric"
              value={creditCardNumber}
              onChangeText={setCreditCardNumber}
              maxLength={16}
            />
            <Text style={styles.cardInputLabel}>Data de Validade (MM/AA):</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              value={creditCardExpiry}
              onChangeText={setCreditCardExpiry}
              maxLength={5}
            />
            <Text style={styles.cardInputLabel}>Código de Verificação (CVV):</Text>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              value={creditCardCVV}
              onChangeText={setCreditCardCVV}
              maxLength={4}
            />
          </View>
        )}

        <TouchableWithSound
          style={[styles.saveButton]}
          onPress={handleSavePaymentMethod}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Método de Pagamento</Text>
          )}
        </TouchableWithSound>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  methodButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  methodButtonSelected: {
    backgroundColor: '#87ADD9',
    borderColor: '#87ADD9',
  },
  methodText: {
    fontSize: 16,
    color: '#717171',
    marginLeft: 8
  },
  methodTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardInputContainer: {
    marginBottom: 20,
  },
  cardInputLabel: {
    fontSize: 20,
    fontWeight: 'regular',
    marginBottom: 5,
    color: '#717171',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#87ADD9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: { backgroundColor: '#aaa' },
});

export default PaymentMethodScreen;
