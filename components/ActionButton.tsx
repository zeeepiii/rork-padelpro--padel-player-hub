import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/colors';
import { LucideIcon } from 'lucide-react-native';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {icon}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: Colors.text.dark,
    fontSize: 14,
    textAlign: 'center',
  },
});