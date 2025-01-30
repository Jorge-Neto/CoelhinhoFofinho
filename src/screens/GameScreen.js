import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const GameScreen = ({ navigation }) => {
  const { checkAccess, fetchUserData } = useAuth();

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
    <LayoutWithFooter activeTab={'Game'}>
      <ScrollView style={styles.container}>
        <View style={styles.maintenanceContainer}>
          <Ionicons name="alert-circle" size={24} color="#717171" />

          <Text style={styles.maintenanceText}>Página em manutenção</Text>
        </View>
      </ScrollView>
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    color: '#000000',
  },
  maintenanceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintenanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#717171',
  },
});


export default GameScreen;
