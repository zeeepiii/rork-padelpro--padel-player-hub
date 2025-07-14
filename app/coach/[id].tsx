import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Platform,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Star, 
  Calendar, 
  Clock, 
  Award,
  MessageCircle,
  Share2
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { COACHES } from '@/constants/mockData';
import { useUserStore } from '@/store/userStore';

export default function CoachDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  
  const coach = COACHES.find(c => c.id === id) || COACHES[0];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleBookSession = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select a time slot first');
      return;
    }

    Alert.alert(
      'Book Session',
      `Book a session with ${coach.name} at ${selectedTime}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book', 
          onPress: () => {
            Alert.alert('Success', 'Session booked successfully!');
          }
        }
      ]
    );
  };

  const handleMessage = () => {
    Alert.alert('Message', `Send a message to ${coach.name}`);
  };

  const handleShare = () => {
    Alert.alert('Share', `Share ${coach.name}'s profile`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.light} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coach Profile</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Image source={{ uri: coach.image }} style={styles.coachImage} />
          
          <View style={styles.profileInfo}>
            <Text style={styles.coachName}>{coach.name}</Text>
            <Text style={styles.coachExperience}>{coach.experience} of experience</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={20} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.ratingText}>{coach.rating}</Text>
              <Text style={styles.reviewsText}>(45 reviews)</Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>€{coach.price}/hour</Text>
            </View>
          </View>
        </View>

        <View style={styles.specialtiesCard}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialtiesGrid}>
            {coach.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyItem}>
                <Award size={16} color={Colors.primary} />
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Professional padel coach with {coach.experience} of experience. Specialized in helping players improve their technique and strategy. I work with players of all levels, from beginners to advanced competitors.
          </Text>
          <Text style={styles.aboutText}>
            My coaching philosophy focuses on building strong fundamentals while developing each player's unique strengths. I believe in creating a positive and encouraging environment where players can reach their full potential.
          </Text>
        </View>

        <View style={styles.availabilityCard}>
          <Text style={styles.sectionTitle}>Available Times (Today)</Text>
          <View style={styles.timeSlotsGrid}>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.selectedTimeSlotText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.reviewsCard}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerInitial}>M</Text>
              </View>
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>Maria S.</Text>
                <View style={styles.reviewRating}>
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={12} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              Excellent coach! Really helped improve my backhand technique. Highly recommended.
            </Text>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerInitial}>J</Text>
              </View>
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>Juan P.</Text>
                <View style={styles.reviewRating}>
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={12} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              Great strategic insights and very patient. Perfect for intermediate players.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={handleMessage}
        >
          <MessageCircle size={20} color={Colors.primary} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.bookButton,
            !selectedTime && styles.disabledButton
          ]}
          onPress={handleBookSession}
          disabled={!selectedTime}
        >
          <Text style={styles.bookButtonText}>
            Book Session
          </Text>
        </TouchableOpacity>
      </View>
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  coachImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  coachName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  coachExperience: {
    fontSize: 16,
    color: Colors.text.gray,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  specialtiesCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 6,
  },
  aboutCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: Colors.text.dark,
    lineHeight: 20,
    marginBottom: 12,
  },
  availabilityCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  selectedTimeSlotText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  reviewsCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: Colors.text.dark,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  messageButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  bookButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
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