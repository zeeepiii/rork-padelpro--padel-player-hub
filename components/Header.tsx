import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Bell, Menu } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';

interface HeaderProps {
  showMenu?: boolean;
  showNotification?: boolean;
}

export default function Header({ showMenu = true, showNotification = true }: HeaderProps) {
  const router = useRouter();
  
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>PLAYATOMIC</Text>
      <View style={styles.rightContainer}>
        {showNotification && (
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
            <Bell color={Colors.text.light} size={24} />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
            <Menu color={Colors.text.light} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  logo: {
    color: Colors.text.light,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
});