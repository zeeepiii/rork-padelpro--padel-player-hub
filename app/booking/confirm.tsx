import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Users, Clock, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { CLUBS } from '@/constants/mockData';
import { useBookingStore } from '@/store/bookingStore';

export default function BookingConfirmScreen() {
  const { clubId, day, time } = useLocalSearchParams();
  const router = useRouter();
  const { actions } = useBookingStore();
  
  const club = CLUBS.find(c => c.id === clubId) || CLUBS[0];
  const [duration, setDuration] = useState(60);
  const [players, setPlayers] = useState(4);
  
  const handleConfirmBooking = () => {
    const bookingId = Date.now().toString();
    
    actions.addBooking({
      id: bookingId,
      clubId: club.id,
      date: `2025-07-${day}`,
      time: time as string,
      duration,
      court: Math.floor(Math.random() * club.courts) + 1,
      players: [],
    });
    
    router.push({
      pathname: '/booking/success',
      params: { bookingId },
    });
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
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.clubCard}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubAddress}>{club.address}</Text>
        </View>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Calendar size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>July {day}, 2025</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Clock size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{time}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Users size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Players</Text>
              <Text style={styles.detailValue}>{players} players</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationOptions}>
            <TouchableOpacity 
              style={[
                styles.durationOption,
                duration === 60 && styles.selectedDuration
              ]}
              onPress={() => setDuration(60)}
            >
              <Text 
                style={[
                  styles.durationText,
                  duration === 60 && styles.selectedDurationText
                ]}
              >
                60 min
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.durationOption,
                duration === 90 && styles.selectedDuration
              ]}
              onPress={() => setDuration(90)}
            >
              <Text 
                style={[
                  styles.durationText,
                  duration === 90 && styles.selectedDurationText
                ]}
              >
                90 min
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.durationOption,
                duration === 120 && styles.selectedDuration
              ]}
              onPress={() => setDuration(120)}
            >
              <Text 
                style={[
                  styles.durationText,
                  duration === 120 && styles.selectedDurationText
                ]}
              >
                120 min
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Number of Players</Text>
          <View style={styles.playersOptions}>
            <TouchableOpacity 
              style={[
                styles.playersOption,
                players === 2 && styles.selectedPlayers
              ]}
              onPress={() => setPlayers(2)}
            >
              <Text 
                style={[
                  styles.playersText,
                  players === 2 && styles.selectedPlayersText
                ]}
              >
                2
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.playersOption,
                players === 4 && styles.selectedPlayers
              ]}
              onPress={() => setPlayers(4)}
            >
              <Text 
                style={[
                  styles.playersText,
                  players === 4 && styles.selectedPlayersText
                ]}
              >
                4
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Court Rental ({duration} min)</Text>
            <Text style={styles.priceValue}>€{duration === 60 ? 20 : duration === 90 ? 30 : 40}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>€2</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>€{duration === 60 ? 22 : duration === 90 ? 32 : 42}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  clubCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  clubAddress: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  bookingDetails: {
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedDuration: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  durationText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  selectedDurationText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  playersOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playersOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedPlayers: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  playersText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  selectedPlayersText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  priceContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  priceValue: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});