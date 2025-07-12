import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, MapPin, Users, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useBookingStore } from '@/store/bookingStore';
import { CLUBS } from '@/constants/mockData';

export default function BookingsScreen() {
  const router = useRouter();
  const { bookings, actions } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const now = new Date();
  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= now);
  const pastBookings = bookings.filter(booking => new Date(booking.date) < now);

  const handleCancelBooking = (bookingId: string) => {
    actions.cancelBooking(bookingId);
  };

  const renderBookingItem = ({ item }: { item: any }) => {
    const club = CLUBS.find(c => c.id === item.clubId);
    const bookingDate = new Date(item.date);
    const isPast = bookingDate < now;

    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.clubName}>{club?.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.text.gray} />
              <Text style={styles.locationText}>{club?.city}</Text>
            </View>
          </View>
          
          {!isPast && (
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(item.id)}
            >
              <X size={20} color={Colors.text.gray} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.primary} />
            <Text style={styles.detailText}>
              {bookingDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{item.time} • {item.duration} min</Text>
          </View>

          <View style={styles.detailItem}>
            <Users size={16} color={Colors.primary} />
            <Text style={styles.detailText}>Court {item.court}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <View style={styles.bookingCode}>
            <Text style={styles.codeLabel}>Booking #</Text>
            <Text style={styles.codeValue}>
              {item.id.substring(item.id.length - 6).toUpperCase()}
            </Text>
          </View>

          <View style={[
            styles.statusBadge,
            isPast ? styles.pastBadge : styles.upcomingBadge
          ]}>
            <Text style={[
              styles.statusText,
              isPast ? styles.pastStatusText : styles.upcomingStatusText
            ]}>
              {isPast ? 'Completed' : 'Upcoming'}
            </Text>
          </View>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>
            Upcoming ({upcomingBookings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>
            Past ({pastBookings.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'upcoming' ? upcomingBookings : pastBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.bookingsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={64} color={Colors.text.gray} />
            <Text style={styles.emptyTitle}>
              No {activeTab} bookings
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming' 
                ? 'Book a court to start playing!' 
                : 'Your completed bookings will appear here'
              }
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity 
                style={styles.bookNowButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.main,
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
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bookingsList: {
    padding: 16,
  },
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  cancelButton: {
    padding: 4,
  },
  bookingDetails: {
    marginBottom: 16,
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
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 12,
    color: Colors.text.gray,
  },
  codeValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: '#dcfce7',
  },
  pastBadge: {
    backgroundColor: Colors.background.secondary,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  upcomingStatusText: {
    color: '#16a34a',
  },
  pastStatusText: {
    color: Colors.text.gray,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.text.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  bookNowButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookNowText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 16,
  },
});