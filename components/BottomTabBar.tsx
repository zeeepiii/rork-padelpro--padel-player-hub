import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Users, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRouter, usePathname } from 'expo-router';

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => router.push('/')}
      >
        <Home 
          size={24} 
          color={isActive('/') ? Colors.primary : Colors.text.gray} 
        />
        <Text 
          style={[
            styles.tabText, 
            isActive('/') && styles.activeTabText
          ]}
        >
          Accueil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => router.push('/community')}
      >
        <Users 
          size={24} 
          color={isActive('/community') ? Colors.primary : Colors.text.gray} 
        />
        <Text 
          style={[
            styles.tabText, 
            isActive('/community') && styles.activeTabText
          ]}
        >
          Communauté
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => router.push('/profile')}
      >
        <User 
          size={24} 
          color={isActive('/profile') ? Colors.primary : Colors.text.gray} 
        />
        <Text 
          style={[
            styles.tabText, 
            isActive('/profile') && styles.activeTabText
          ]}
        >
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.main,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.text.gray,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});