import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/colors';

interface Day {
  short: string;
  day: number;
  month: string;
}

interface CalendarSelectorProps {
  days: Day[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export default function CalendarSelector({ days, selectedDay, onSelectDay }: CalendarSelectorProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.racketContainer}>
          <View style={styles.racket}>
            {/* Racket icon */}
          </View>
        </View>
        
        {days.map((day) => (
          <TouchableOpacity
            key={day.day}
            style={[
              styles.dayButton,
              selectedDay === day.day && styles.selectedDayButton
            ]}
            onPress={() => onSelectDay(day.day)}
          >
            <Text style={styles.dayShort}>{day.short}</Text>
            <Text style={[
              styles.dayNumber,
              selectedDay === day.day && styles.selectedDayText
            ]}>
              {day.day}
            </Text>
            <Text style={styles.month}>{day.month}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  racketContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 8,
  },
  racket: {
    width: 30,
    height: 30,
  },
  dayButton: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 30,
    backgroundColor: Colors.background.main,
  },
  selectedDayButton: {
    backgroundColor: Colors.background.dark,
  },
  dayShort: {
    fontSize: 12,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  selectedDayText: {
    color: Colors.text.light,
  },
  month: {
    fontSize: 12,
    color: Colors.text.gray,
  },
});