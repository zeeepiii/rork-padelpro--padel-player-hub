import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Share,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  Phone, 
  Clock 
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { CLUBS, TIME_SLOTS } from '@/constants/mockData';
import { useUserStore } from '@/store/userStore';
import CalendarSelector from '@/components/CalendarSelector';
import TimeSlotSelector from '@/components/TimeSlotSelector';
import { DAYS_OF_WEEK } from '@/constants/mockData';
import { useBookingStore } from '@/store/bookingStore';

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user, favoriteClubs, actions } = useUserStore();
  const { selectedDay, selectedTime, actions: bookingActions } = useBookingStore();
  
  const club = CLUBS.find(c => c.id === id) || CLUBS[0];
  const isFavorite = favoriteClubs.includes(club.id);

  const [activeTab, setActiveTab] = useState('Réserver');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${club.name} on Playatomic! ${club.address}`,
        url: Platform.OS === 'web' ? window.location.href : undefined,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleToggleFavorite = () => {
    actions.toggleFavoriteClub(club.id);
  };

  const handleSelectDay = (day: number) => {
    bookingActions.setSelectedDay(day);
  };

  const handleSelectTime = (time: string) => {
    bookingActions.setSelectedTime(time);
  };

  const handleBookCourt = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (selectedTime) {
      router.push({
        pathname: `/booking/confirm`,
        params: {
          clubId: club.id,
          day: selectedDay,
          time: selectedTime,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: club.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft color={Colors.text.light} size={24} />
            </TouchableOpacity>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={handleToggleFavorite}
              >
                <Heart 
                  size={24} 
                  color={isFavorite ? '#ef4444' : Colors.text.light} 
                  fill={isFavorite ? '#ef4444' : 'none'} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={Colors.text.light} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{club.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.text.gray} />
            <Text style={styles.locationText}>{club.address}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{club.rating}</Text>
            <Text style={styles.reviewsText}>(124 reviews)</Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Phone size={16} color={Colors.primary} />
              <Text style={styles.detailText}>+34 123 456 789</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Clock size={16} color={Colors.primary} />
              <Text style={styles.detailText}>Open 9:00 - 23:00</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Accueil' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Accueil')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'Accueil' && styles.activeTabText
              ]}
            >
              Accueil
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Réserver' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Réserver')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'Réserver' && styles.activeTabText
              ]}
            >
              Réserver
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Open Matches' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Open Matches')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'Open Matches' && styles.activeTabText
              ]}
            >
              Open Matches
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Coaches' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Coaches')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'Coaches' && styles.activeTabText
              ]}
            >
              Coaches
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'Réserver' && (
          <View style={styles.bookingContainer}>
            <CalendarSelector 
              days={DAYS_OF_WEEK}
              selectedDay={selectedDay}
              onSelectDay={handleSelectDay}
            />
            
            <View style={styles.showAvailableContainer}>
              <Text style={styles.showAvailableText}>
                Afficher uniquement les heures disponibles
              </Text>
              <View style={styles.toggleSwitch}>
                <View style={styles.toggleActive} />
              </View>
            </View>
            
            <TimeSlotSelector 
              timeSlots={TIME_SLOTS}
              selectedTime={selectedTime}
              onSelectTime={handleSelectTime}
            />
            
            <View style={styles.alertsContainer}>
              <View style={styles.alertsHeader}>
                <View style={styles.alertsIcon}>
                  <Bell size={20} color="#f59e0b" />
                </View>
                <Text style={styles.alertsTitle}>Alertes prioritaires</Text>
              </View>
              
              <Text style={styles.alertsDescription}>
                Configurez votre alerte en un clic avec vos préférences prédéfinies
              </Text>
              
              <TouchableOpacity>
                <Text style={styles.manageAlertsText}>Gérer les alertes</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.bookButton,
                !selectedTime && styles.disabledButton
              ]}
              onPress={handleBookCourt}
              disabled={!selectedTime}
            >
              <Text style={styles.bookButtonText}>
                {!user ? 'Sign In to Book' : 'Book Court'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Bell icon component for alerts section
function Bell({ size, color }: { size: number, color: string }) {
  return (
    <View>
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: color,
        position: 'relative',
      }} />
      <View style={{
        width: size / 3,
        height: size / 3,
        backgroundColor: color,
        borderRadius: size / 6,
        position: 'absolute',
        bottom: -size / 6,
        left: size / 3,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clubInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.text.dark,
  },
  tabText: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  activeTabText: {
    color: Colors.text.dark,
    fontWeight: 'bold',
  },
  bookingContainer: {
    padding: 16,
  },
  showAvailableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  showAvailableText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.text.light,
    alignSelf: 'flex-end',
  },
  alertsContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertsIcon: {
    marginRight: 8,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  alertsDescription: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 8,
  },
  manageAlertsText: {
    fontSize: 14,
    color: Colors.primary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: Colors.ui.inactive,
  },
  bookButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});