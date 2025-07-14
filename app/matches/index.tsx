import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search, Filter, MapPin, Users, Clock, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { MATCHES } from '@/constants/mockData';

export default function MatchesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [matches, setMatches] = useState(MATCHES);

  const levels = ['Beginner', 'Intermediate', 'Intermediate-Advanced', 'Advanced'];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || match.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const renderMatchItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.matchCard}
      onPress={() => router.push(`/match/${item.id}`)}
    >
      <View style={styles.matchHeader}>
        <View>
          <Text style={styles.matchClub}>{item.club}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.text.gray} />
            <Text style={styles.locationText}>Madrid</Text>
          </View>
        </View>
        
        <View style={styles.matchStatus}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: item.status === 'open' ? '#22c55e' : Colors.primary }
          ]} />
          <Text style={styles.statusText}>
            {item.status === 'open' ? 'Open' : 'Confirmed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.matchDetails}>
        <View style={styles.detailItem}>
          <Calendar size={16} color={Colors.primary} />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{item.time} • {item.duration} min</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Users size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{item.players.length}/4 players</Text>
        </View>
      </View>
      
      <View style={styles.levelContainer}>
        <Text style={styles.levelLabel}>Level: </Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.joinButton,
          item.status !== 'open' && styles.disabledButton
        ]}
        disabled={item.status !== 'open'}
      >
        <Text style={styles.joinButtonText}>
          {item.status === 'open' ? 'Join Match' : 'Full'}
        </Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Find Matches</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.text.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs or matches..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.gray}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filter by Level:</Text>
        <View style={styles.levelFilters}>
          <TouchableOpacity 
            style={[
              styles.levelFilter,
              !selectedLevel && styles.activeLevelFilter
            ]}
            onPress={() => setSelectedLevel(null)}
          >
            <Text style={[
              styles.levelFilterText,
              !selectedLevel && styles.activeLevelFilterText
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {levels.map((level) => (
            <TouchableOpacity 
              key={level}
              style={[
                styles.levelFilter,
                selectedLevel === level && styles.activeLevelFilter
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[
                styles.levelFilterText,
                selectedLevel === level && styles.activeLevelFilterText
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        renderItem={renderMatchItem}
        contentContainerStyle={styles.matchesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={64} color={Colors.text.gray} />
            <Text style={styles.emptyTitle}>No matches found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
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
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.background.main,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 12,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  levelFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  levelFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginRight: 8,
    marginBottom: 8,
  },
  activeLevelFilter: {
    backgroundColor: Colors.primary,
  },
  levelFilterText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  activeLevelFilterText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  matchesList: {
    padding: 16,
  },
  matchCard: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  matchClub: {
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
  matchStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  levelBadge: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.ui.inactive,
  },
  joinButtonText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 16,
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