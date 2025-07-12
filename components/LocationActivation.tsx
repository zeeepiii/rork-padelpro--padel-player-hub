import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

interface LocationActivationProps {
  onLocationEnabled: () => void;
}

export default function LocationActivation({ onLocationEnabled }: LocationActivationProps) {
  const requestLocation = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web implementation
        navigator.geolocation.getCurrentPosition(
          () => onLocationEnabled(),
          (error) => console.log(error),
          { enableHighAccuracy: true }
        );
      } else {
        // Native implementation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          await Location.getCurrentPositionAsync({});
          onLocationEnabled();
        }
      }
    } catch (error) {
      console.log('Error requesting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MapPin size={32} color={Colors.text.dark} />
      </View>
      <Text style={styles.title}>Active la localisation</Text>
      <Text style={styles.description}>
        pour recevoir des suggestions pertinentes autour de toi
      </Text>
      <TouchableOpacity style={styles.button} onPress={requestLocation}>
        <Text style={styles.buttonText}>Activer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 14,
  },
});