import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const PasswordPrompt = ({ visible, onConfirm, onCancel }) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (password.trim() === "") {
      Alert.alert("Erro", "Por favor, insira sua senha.");
      return;
    }
    onConfirm(password);
    setPassword("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Confirmação de Senha</Text>
          <Text style={styles.message}>Digite sua senha para confirmar a exclusão da conta.</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onCancel} color="#d9534f" />
            <Button title="Confirmar" color='#87ADD9' onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default PasswordPrompt;
