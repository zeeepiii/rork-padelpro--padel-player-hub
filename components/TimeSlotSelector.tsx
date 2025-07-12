import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '@/constants/colors';

interface TimeSlotSelectorProps {
  timeSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotSelector({ 
  timeSlots, 
  selectedTime, 
  onSelectTime 
}: TimeSlotSelectorProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={timeSlots}
        numColumns={5}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              selectedTime === item && styles.selectedTimeSlot
            ]}
            onPress={() => onSelectTime(item)}
          >
            <Text 
              style={[
                styles.timeText,
                selectedTime === item && styles.selectedTimeText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.timeSlotGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  timeSlotGrid: {
    paddingHorizontal: 16,
  },
  timeSlot: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    backgroundColor: Colors.background.main,
  },
  selectedTimeSlot: {
    backgroundColor: Colors.background.dark,
    borderColor: Colors.background.dark,
  },
  timeText: {
    fontSize: 16,
    color: Colors.text.dark,
  },
  selectedTimeText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
});