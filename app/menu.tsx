import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  User, 
  Calendar, 
  Trophy, 
  Users, 
  Settings, 
  HelpCircle, 
  Shield, 
  Star,
  ChevronRight,
  LogOut
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/userStore';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      {
        icon: <User size={20} color={Colors.primary} />,
        title: 'Profile',
        subtitle: 'Manage your profile and preferences',
        route: '/profile',
      },
      {
        icon: <Calendar size={20} color={Colors.primary} />,
        title: 'My Bookings',
        subtitle: 'View and manage your court bookings',
        route: '/bookings',
      },
      {
        icon: <Trophy size={20} color={Colors.primary} />,
        title: 'Match History',
        subtitle: 'See your past matches and stats',
        route: '/history',
      },
    ],
  },
  {
    title: 'Discover',
    items: [
      {
        icon: <Users size={20} color={Colors.primary} />,
        title: 'Find Players',
        subtitle: 'Connect with other padel players',
        route: '/matches',
      },
      {
        icon: <Trophy size={20} color={Colors.primary} />,
        title: 'Tournaments',
        subtitle: 'Join competitive tournaments',
        route: '/tournaments',
      },
      {
        icon: <Star size={20} color={Colors.primary} />,
        title: 'Coaches',
        subtitle: 'Find professional coaches',
        route: '/coaches',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: <Settings size={20} color={Colors.primary} />,
        title: 'Settings',
        subtitle: 'App preferences and notifications',
        route: '/settings',
      },
      {
        icon: <HelpCircle size={20} color={Colors.primary} />,
        title: 'Help & Support',
        subtitle: 'Get help and contact support',
        route: '/help',
      },
      {
        icon: <Shield size={20} color={Colors.primary} />,
        title: 'Privacy Policy',
        subtitle: 'Read our privacy policy',
        route: '/privacy',
      },
    ],
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const { user, actions } = useUserStore();

  const handleSignOut = () => {
    actions.setUser(null);
    router.replace('/');
  };

  const renderMenuItem = (item: any) => (
    <TouchableOpacity 
      key={item.title}
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
    >
      <View style={styles.menuItemIcon}>
        {item.icon}
      </View>
      
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
      </View>
      
      <ChevronRight size={20} color={Colors.text.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.light} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {user && (
          <View style={styles.userSection}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userLevel}>Level {user.level}</Text>
            </View>
            <TouchableOpacity 
              style={styles.premiumButton}
              onPress={() => router.push('/premium')}
            >
              <Star size={16} color="#FFD700" />
              <Text style={styles.premiumText}>Premium</Text>
            </TouchableOpacity>
          </View>
        )}

        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderMenuItem)}
          </View>
        ))}

        {user && (
          <View style={styles.menuSection}>
            <TouchableOpacity 
              style={styles.signOutItem}
              onPress={handleSignOut}
            >
              <View style={styles.signOutIcon}>
                <LogOut size={20} color="#ef4444" />
              </View>
              
              <View style={styles.menuItemContent}>
                <Text style={styles.signOutTitle}>Sign Out</Text>
                <Text style={styles.menuItemSubtitle}>Sign out of your account</Text>
              </View>
              
              <ChevronRight size={20} color={Colors.text.gray} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Playatomic v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 Playatomic. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 4,
  },
  menuSection: {
    backgroundColor: Colors.background.main,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.gray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  signOutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  signOutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  signOutTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
    marginBottom: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.text.gray,
    textAlign: 'center',
  },
});