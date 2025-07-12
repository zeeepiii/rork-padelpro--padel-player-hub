import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle, Calendar, Share2 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useBookingStore } from '@/store/bookingStore';
import { CLUBS } from '@/constants/mockData';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();
  const { bookings } = useBookingStore();
  
  const booking = bookings.find(b => b.id === bookingId);
  const club = booking ? CLUBS.find(c => c.id === booking.clubId) : null;
  
  useEffect(() => {
    if (!booking) {
      router.replace('/');
    }
  }, [booking]);
  
  if (!booking || !club) {
    return null;
  }
  
  const handleAddToCalendar = () => {
    // In a real app, this would integrate with the device calendar
    alert('Added to calendar');
  };
  
  const handleShare = () => {
    // In a real app, this would open the share dialog
    alert('Shared booking');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <CheckCircle size={80} color={Colors.primary} />
        </View>
        
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successMessage}>
          Your court has been successfully booked at {club.name}.
        </Text>
        
        <View style={styles.bookingCard}>
          <Text style={styles.cardTitle}>{club.name}</Text>
          <Text style={styles.cardAddress}>{club.address}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.bookingDetails}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>
              {new Date(booking.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })} at {booking.time}
            </Text>
            
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{booking.duration} minutes</Text>
            
            <Text style={styles.detailLabel}>Court</Text>
            <Text style={styles.detailValue}>Court {booking.court}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.bookingCode}>
            <Text style={styles.codeLabel}>Booking Reference</Text>
            <Text style={styles.codeValue}>
              #{booking.id.substring(booking.id.length - 6).toUpperCase()}
            </Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddToCalendar}
          >
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Add to Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Share2 size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Share Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.text.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  bookingCard: {
    width: '100%',
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.border,
    marginVertical: 16,
  },
  bookingDetails: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 16,
  },
  bookingCode: {
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});