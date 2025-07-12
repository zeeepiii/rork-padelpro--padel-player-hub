import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Users } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface TimeSlot {
  time: string;
  available: boolean;
  players?: { name: string; level: number }[];
  price: number;
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotSelector({ 
  timeSlots, 
  selectedTime, 
  onSelectTime 
}: TimeSlotSelectorProps) {
  const renderTimeSlot = ({ item }: { item: TimeSlot }) => {
    const isSelected = selectedTime === item.time;
    const hasPlayers = item.players && item.players.length > 0;

    return (
      <TouchableOpacity
        style={[
          styles.timeSlot,
          !item.available && styles.unavailableTimeSlot,
          isSelected && styles.selectedTimeSlot
        ]}
        onPress={() => item.available && onSelectTime(item.time)}
        disabled={!item.available}
      >
        <Text 
          style={[
            styles.timeText,
            !item.available && styles.unavailableTimeText,
            isSelected && styles.selectedTimeText
          ]}
        >
          {item.time}
        </Text>
        
        <Text 
          style={[
            styles.priceText,
            !item.available && styles.unavailableTimeText,
            isSelected && styles.selectedTimeText
          ]}
        >
          €{item.price}
        </Text>

        {hasPlayers && item.available && (
          <View style={styles.playersIndicator}>
            <Users size={12} color={isSelected ? Colors.text.light : Colors.primary} />
            <Text 
              style={[
                styles.playersCount,
                isSelected && styles.selectedTimeText
              ]}
            >
              {item.players!.length}
            </Text>
          </View>
        )}

        {!item.available && (
          <Text style={styles.unavailableText}>Booked</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      
      <FlatList
        data={timeSlots}
        numColumns={3}
        keyExtractor={(item) => item.time}
        renderItem={renderTimeSlot}
        contentContainerStyle={styles.timeSlotGrid}
        scrollEnabled={false}
      />

      {selectedTime && (
        <View style={styles.selectedSlotInfo}>
          <Text style={styles.selectedSlotTitle}>Selected Time Slot</Text>
          <View style={styles.selectedSlotDetails}>
            <Text style={styles.selectedSlotTime}>{selectedTime}</Text>
            <Text style={styles.selectedSlotPrice}>
              €{timeSlots.find(slot => slot.time === selectedTime)?.price}
            </Text>
          </View>
          
          {timeSlots.find(slot => slot.time === selectedTime)?.players && (
            <View style={styles.playersSection}>
              <Text style={styles.playersTitle}>Other Players:</Text>
              {timeSlots.find(slot => slot.time === selectedTime)?.players?.map((player, index) => (
                <View key={index} style={styles.playerItem}>
                  <View style={styles.playerAvatar}>
                    <Text style={styles.playerInitial}>{player.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerLevel}>Level {player.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  timeSlotGrid: {
    paddingHorizontal: 16,
  },
  timeSlot: {
    flex: 1,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    backgroundColor: Colors.background.main,
    position: 'relative',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unavailableTimeSlot: {
    backgroundColor: Colors.background.secondary,
    borderColor: Colors.ui.inactive,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  selectedTimeText: {
    color: Colors.text.light,
  },
  unavailableTimeText: {
    color: Colors.ui.inactive,
  },
  priceText: {
    fontSize: 12,
    color: Colors.text.gray,
  },
  unavailableText: {
    fontSize: 10,
    color: Colors.ui.inactive,
    marginTop: 2,
  },
  playersIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  playersCount: {
    fontSize: 10,
    color: Colors.primary,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  selectedSlotInfo: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
  },
  selectedSlotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  selectedSlotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedSlotTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  selectedSlotPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  playersSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  playersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playerInitial: {
    color: Colors.text.light,
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 14,
    color: Colors.text.dark,
    marginRight: 8,
  },
  playerLevel: {
    fontSize: 12,
    color: Colors.text.gray,
  },
});