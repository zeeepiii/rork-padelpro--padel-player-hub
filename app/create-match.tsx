import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy,
  Plus,
  Minus
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { CLUBS } from '@/constants/mockData';

const MATCH_TYPES = [
  { id: 'amical', name: 'Match amical', icon: '🏓' },
  { id: 'competitif', name: 'Compétitif', icon: '🏆' },
  { id: 'entrainement', name: 'Entraînement', icon: '💪' },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00'
];

export default function CreateMatchScreen() {
  const router = useRouter();
  const [selectedClub, setSelectedClub] = useState(CLUBS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [selectedType, setSelectedType] = useState('amical');
  const [duration, setDuration] = useState(90);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [minLevel, setMinLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(3);
  const [description, setDescription] = useState('');

  const handleCreateMatch = () => {
    // In a real app, this would create the match
    alert('Match créé avec succès!');
    router.back();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long'
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
        <Text style={styles.headerTitle}>Créer un match</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Club Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Club</Text>
          <TouchableOpacity style={styles.clubSelector}>
            <MapPin size={20} color={Colors.primary} />
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>{selectedClub.name}</Text>
              <Text style={styles.clubAddress}>{selectedClub.address}</Text>
            </View>
            <ChevronLeft size={20} color={Colors.text.gray} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date et heure</Text>
          
          <TouchableOpacity style={styles.dateSelector}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>

          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
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

        {/* Match Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de match</Text>
          <View style={styles.matchTypeGrid}>
            {MATCH_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.matchTypeCard,
                  selectedType === type.id && styles.selectedMatchType
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.matchTypeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.matchTypeName,
                  selectedType === type.id && styles.selectedMatchTypeName
                ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durée</Text>
          <View style={styles.durationSelector}>
            <TouchableOpacity 
              style={styles.durationButton}
              onPress={() => setDuration(Math.max(60, duration - 30))}
            >
              <Minus size={20} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.durationDisplay}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.durationText}>{duration} min</Text>
            </View>
            <TouchableOpacity 
              style={styles.durationButton}
              onPress={() => setDuration(Math.min(180, duration + 30))}
            >
              <Plus size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Players */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre de joueurs</Text>
          <View style={styles.playersSelector}>
            <TouchableOpacity 
              style={styles.playersButton}
              onPress={() => setMaxPlayers(Math.max(2, maxPlayers - 1))}
            >
              <Minus size={20} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.playersDisplay}>
              <Users size={20} color={Colors.primary} />
              <Text style={styles.playersText}>{maxPlayers} joueurs</Text>
            </View>
            <TouchableOpacity 
              style={styles.playersButton}
              onPress={() => setMaxPlayers(Math.min(6, maxPlayers + 1))}
            >
              <Plus size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Level Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Niveau requis</Text>
          <View style={styles.levelRange}>
            <View style={styles.levelInput}>
              <Text style={styles.levelLabel}>Min</Text>
              <TextInput
                style={styles.levelTextInput}
                value={minLevel.toString()}
                onChangeText={(text) => setMinLevel(parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.levelSeparator}>-</Text>
            <View style={styles.levelInput}>
              <Text style={styles.levelLabel}>Max</Text>
              <TextInput
                style={styles.levelTextInput}
                value={maxLevel.toString()}
                onChangeText={(text) => setMaxLevel(parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description (optionnel)</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Ajoutez une description pour votre match..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={Colors.text.gray}
          />
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Résumé</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Club:</Text>
              <Text style={styles.summaryValue}>{selectedClub.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{formatDate(selectedDate)} à {selectedTime}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Type:</Text>
              <Text style={styles.summaryValue}>
                {MATCH_TYPES.find(t => t.id === selectedType)?.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Durée:</Text>
              <Text style={styles.summaryValue}>{duration} minutes</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Joueurs:</Text>
              <Text style={styles.summaryValue}>{maxPlayers} maximum</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Niveau:</Text>
              <Text style={styles.summaryValue}>{minLevel} - {maxLevel}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateMatch}
        >
          <Text style={styles.createButtonText}>Créer le match</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  clubSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  clubInfo: {
    flex: 1,
    marginLeft: 12,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  clubAddress: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.ui.border,
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
  matchTypeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  matchTypeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  selectedMatchType: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  matchTypeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  matchTypeName: {
    fontSize: 14,
    color: Colors.text.dark,
    textAlign: 'center',
  },
  selectedMatchTypeName: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
  },
  playersSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playersButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  playersText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
  },
  levelRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInput: {
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 8,
  },
  levelTextInput: {
    width: 60,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.text.dark,
  },
  levelSeparator: {
    fontSize: 18,
    color: Colors.text.gray,
    marginHorizontal: 16,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.dark,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});