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
import { ChevronLeft, Trophy, Calendar, Users, MapPin, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';

const TOURNAMENTS = [
  {
    id: '1',
    name: 'Madrid Open Championship',
    date: '2025-08-15',
    endDate: '2025-08-17',
    location: 'Madrid, Spain',
    club: 'Indie Pádel Club',
    category: 'Open',
    level: 'All Levels',
    prize: '€2,000',
    participants: 32,
    maxParticipants: 64,
    registrationFee: 50,
    status: 'open',
  },
  {
    id: '2',
    name: 'Barcelona Summer Cup',
    date: '2025-07-20',
    endDate: '2025-07-21',
    location: 'Barcelona, Spain',
    club: 'Urban Padel Center',
    category: 'Amateur',
    level: 'Intermediate',
    prize: '€1,000',
    participants: 28,
    maxParticipants: 32,
    registrationFee: 35,
    status: 'open',
  },
  {
    id: '3',
    name: 'Valencia Pro Series',
    date: '2025-09-10',
    endDate: '2025-09-12',
    location: 'Valencia, Spain',
    club: 'Padel Pro Academy',
    category: 'Professional',
    level: 'Advanced',
    prize: '€5,000',
    participants: 16,
    maxParticipants: 16,
    registrationFee: 100,
    status: 'full',
  },
];

export default function TournamentsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = ['All', 'Open', 'Amateur', 'Professional'];
  
  const filteredTournaments = TOURNAMENTS.filter(tournament => {
    if (!selectedCategory || selectedCategory === 'All') return true;
    return tournament.category === selectedCategory;
  });

  const renderTournamentItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.tournamentCard}>
      <View style={styles.tournamentHeader}>
        <View>
          <Text style={styles.tournamentName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.text.gray} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.tournamentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={Colors.primary} />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })} - {new Date(item.endDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Users size={16} color={Colors.primary} />
          <Text style={styles.detailText}>
            {item.participants}/{item.maxParticipants} players
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Trophy size={16} color={Colors.primary} />
          <Text style={styles.detailText}>Prize: {item.prize}</Text>
        </View>
      </View>
      
      <View style={styles.tournamentFooter}>
        <View>
          <Text style={styles.levelText}>Level: {item.level}</Text>
          <Text style={styles.feeText}>Entry: €{item.registrationFee}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.registerButton,
            item.status === 'full' && styles.disabledButton
          ]}
          disabled={item.status === 'full'}
        >
          <Text style={styles.registerButtonText}>
            {item.status === 'full' ? 'Full' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>Tournaments</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Categories:</Text>
        <View style={styles.categoryFilters}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.categoryFilter,
                (selectedCategory === category || (!selectedCategory && category === 'All')) && styles.activeCategoryFilter
              ]}
              onPress={() => setSelectedCategory(category === 'All' ? null : category)}
            >
              <Text style={[
                styles.categoryFilterText,
                (selectedCategory === category || (!selectedCategory && category === 'All')) && styles.activeCategoryFilterText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredTournaments}
        keyExtractor={(item) => item.id}
        renderItem={renderTournamentItem}
        contentContainerStyle={styles.tournamentsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Trophy size={64} color={Colors.text.gray} />
            <Text style={styles.emptyTitle}>No tournaments found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your category filter
            </Text>
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: Colors.background.main,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  categoryFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginRight: 8,
    marginBottom: 8,
  },
  activeCategoryFilter: {
    backgroundColor: Colors.primary,
  },
  categoryFilterText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  activeCategoryFilterText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  tournamentsList: {
    padding: 16,
  },
  tournamentCard: {
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
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tournamentName: {
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
  categoryBadge: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  tournamentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 8,
  },
  tournamentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 2,
  },
  feeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: Colors.ui.inactive,
  },
  registerButtonText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
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
  },
});