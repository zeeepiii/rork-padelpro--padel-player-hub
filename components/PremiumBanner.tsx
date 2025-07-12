import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';

export default function PremiumBanner() {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/premium')}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>P</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.premiumText}>Premium plan</Text>
        <Text style={styles.unlimitedText}>UNLIMITED</Text>
        <Text style={styles.benefitsText}>
          Free on fees. Advance stats. Cancel anytime.
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.dark,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  textContainer: {
    flex: 1,
  },
  premiumText: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  unlimitedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.light,
    marginVertical: 4,
  },
  benefitsText: {
    fontSize: 14,
    color: Colors.text.light,
  },
});