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
import { ChevronLeft, Search, Filter, MessageCircle, UserPlus } from 'lucide-react-native';
import Colors from '@/constants/colors';

const PLAYERS = [
  {
    id: '1',
    name: 'Dennis Martinez',
    level: 0.62,
    location: 'Madrid',
    distance: '2km',
    matches: 45,
    winRate: 68,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online',
    lastSeen: 'En ligne'
  },
  {
    id: '2', 
    name: 'Heni Rodriguez',
    level: 0.6,
    location: 'Madrid',
    distance: '1.5km',
    matches: 32,
    winRate: 72,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online',
    lastSeen: 'En ligne'
  },
  {
    id: '3',
    name: 'Fernando Silva', 
    level: 1.02,
    location: 'Madrid',
    distance: '3km',
    matches: 67,
    winRate: 75,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'offline',
    lastSeen: 'Il y a 2h'
  },
  {
    id: '4',
    name: 'Christian Lopez',
    level: 1.0,
    location: 'Madrid',
    distance: '4km',
    matches: 28,
    winRate: 64,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'offline',
    lastSeen: 'Il y a 1h'
  },
  {
    id: '5',
    name: 'Maria Gonzalez',
    level: 0.85,
    location: 'Madrid',
    distance: '2.5km',
    matches: 41,
    winRate: 69,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online',
    lastSeen: 'En ligne'
  }
];

const LEVEL_FILTERS = ['Tous', '0-0.5', '0.5-1.0', '1.0-1.5', '1.5+'];
const DISTANCE_FILTERS = ['Tous', '< 1km', '< 5km', '< 10km', '< 20km'];

export default function PlayerSearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [selectedDistance, setSelectedDistance] = useState('Tous');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlayers = PLAYERS.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesLevel = true;
    if (selectedLevel !== 'Tous') {
      const [min, max] = selectedLevel.split('-').map(s => parseFloat(s.replace('+', '')));
      if (selectedLevel.includes('+')) {
        matchesLevel = player.level >= min;
      } else {
        matchesLevel = player.level >= min && player.level < max;
      }
    }
    
    let matchesDistance = true;
    if (selectedDistance !== 'Tous') {
      const maxDistance = parseFloat(selectedDistance.replace('< ', '').replace('km', ''));
      const playerDistance = parseFloat(player.distance.replace('km', ''));
      matchesDistance = playerDistance <= maxDistance;
    }
    
    return matchesSearch && matchesLevel && matchesDistance;
  });

  const getLevelColor = (level: number) => {
    if (level < 0.7) return '#DAFF0D';
    if (level < 1.0) return '#DAFF0D'; 
    return '#DAFF0D';
  };

  const renderPlayerItem = ({ item }: { item: any }) => (
    <View style={styles.playerCard}>
      <View style={styles.playerHeader}>
        <View style={styles.playerAvatarContainer}>
          <View style={styles.playerAvatar}>
            <Text style={styles.playerInitial}>{item.name.charAt(0)}</Text>
          </View>
          {item.status === 'online' && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.playerLocation}>{item.location} • {item.distance}</Text>
          <Text style={styles.playerLastSeen}>{item.lastSeen}</Text>
        </View>
        
        <View style={styles.playerLevel}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.playerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.matches}</Text>
          <Text style={styles.statLabel}>Matchs</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.winRate}%</Text>
          <Text style={styles.statLabel}>Victoires</Text>
        </View>
      </View>
      
      <View style={styles.playerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.primaryActionButton}>
          <UserPlus size={20} color={Colors.text.light} />
          <Text style={styles.primaryActionText}>Inviter</Text>
        </TouchableOpacity>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Rechercher des joueurs</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.text.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par nom..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.gray}
          />
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Niveau</Text>
            <View style={styles.filterOptions}>
              {LEVEL_FILTERS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterOption,
                    selectedLevel === level && styles.selectedFilterOption
                  ]}
                  onPress={() => setSelectedLevel(level)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedLevel === level && styles.selectedFilterOptionText
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Distance</Text>
            <View style={styles.filterOptions}>
              {DISTANCE_FILTERS.map((distance) => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.filterOption,
                    selectedDistance === distance && styles.selectedFilterOption
                  ]}
                  onPress={() => setSelectedDistance(distance)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedDistance === distance && styles.selectedFilterOptionText
                  ]}>
                    {distance}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredPlayers.length} joueur{filteredPlayers.length !== 1 ? 's' : ''} trouvé{filteredPlayers.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayerItem}
        contentContainerStyle={styles.playersList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Search size={64} color={Colors.text.gray} />
            <Text style={styles.emptyTitle}>Aucun joueur trouvé</Text>
            <Text style={styles.emptySubtitle}>
              Essayez d'ajuster vos filtres de recherche
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
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.background.main,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  selectedFilterOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  selectedFilterOptionText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  playersList: {
    padding: 16,
  },
  playerCard: {
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
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  playerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInitial: {
    color: Colors.text.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: Colors.background.main,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  playerLocation: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 2,
  },
  playerLastSeen: {
    fontSize: 12,
    color: Colors.text.gray,
  },
  playerLevel: {
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 14,
    color: Colors.text.dark,
    fontWeight: 'bold',
  },
  playerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.gray,
  },
  playerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  primaryActionText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
    fontWeight: 'bold',
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