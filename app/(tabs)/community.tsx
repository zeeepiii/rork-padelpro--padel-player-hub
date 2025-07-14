import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, Menu, Users, Plus, MessageCircle } from 'lucide-react-native';
import Header from '@/components/Header';
import Colors from '@/constants/colors';
import { MATCHES } from '@/constants/mockData';

const PLAYERS = [
  {
    id: '1',
    name: 'Dennis',
    level: 0.62,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online'
  },
  {
    id: '2', 
    name: 'Heni',
    level: 0.6,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online'
  },
  {
    id: '3',
    name: 'Fernando', 
    level: 1.02,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online'
  },
  {
    id: '4',
    name: 'Christian',
    level: 1.0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online'
  }
];

export default function CommunityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Feed' | 'Groupes'>('Feed');
  const [activeFilter, setActiveFilter] = useState<'Tous' | 'Vos posts'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('Padel');
  const [selectedClubs, setSelectedClubs] = useState('Clubs (50)');
  const [selectedTime, setSelectedTime] = useState('Demain');

  const filteredMatches = MATCHES.filter(match => 
    match.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPlayerAvatar = (player: any, isAvailable = false) => (
    <View key={player.id} style={styles.playerContainer}>
      <View style={styles.playerAvatarContainer}>
        <View style={styles.playerAvatar}>
          <Text style={styles.playerInitial}>{player.name.charAt(0)}</Text>
        </View>
        {player.status === 'online' && <View style={styles.onlineIndicator} />}
      </View>
      <Text style={styles.playerName}>{player.name}</Text>
      <View style={[styles.levelBadge, { backgroundColor: getLevelColor(player.level) }]}>
        <Text style={styles.levelText}>{player.level}</Text>
      </View>
    </View>
  );

  const renderAvailableSlot = () => (
    <View style={styles.playerContainer}>
      <View style={styles.availableSlot}>
        <Plus size={24} color={Colors.primary} />
      </View>
      <Text style={styles.playerName}>Libre</Text>
    </View>
  );

  const getLevelColor = (level: number) => {
    if (level < 0.7) return '#DAFF0D';
    if (level < 1.0) return '#DAFF0D'; 
    return '#DAFF0D';
  };

  const renderMatchCard = ({ item }: { item: any }) => {
    const matchPlayers = PLAYERS.slice(0, 3);
    const availableSlots = 4 - matchPlayers.length;

    return (
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchDate}>
            dimanche 13 juillet | {item.time}
          </Text>
        </View>

        <View style={styles.matchTypeContainer}>
          <Users size={16} color={Colors.text.gray} />
          <Text style={styles.matchType}>Match amical</Text>
          <View style={styles.levelRange}>
            <Text style={styles.levelRangeText}>0 - 3</Text>
          </View>
        </View>

        <View style={styles.playersRow}>
          {matchPlayers.map(player => renderPlayerAvatar(player))}
          {Array.from({ length: availableSlots }).map((_, index) => (
            <View key={`available-${index}`}>
              {renderAvailableSlot()}
            </View>
          ))}
        </View>

        <View style={styles.clubInfo}>
          <View style={styles.clubIcon}>
            <View style={styles.clubIconPlaceholder} />
          </View>
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>{item.club}</Text>
            <Text style={styles.clubLocation}>2km • Madrid</Text>
          </View>
          <View style={styles.matchPricing}>
            <Text style={styles.matchPrice}>6,99€</Text>
            <Text style={styles.matchDuration}>90min</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.text.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des joueurs"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.gray}
          />
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Bell size={24} color={Colors.text.light} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Menu size={24} color={Colors.text.light} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Feed' && styles.activeTab]}
          onPress={() => setActiveTab('Feed')}
        >
          <Text style={[styles.tabText, activeTab === 'Feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Groupes' && styles.activeTab]}
          onPress={() => setActiveTab('Groupes')}
        >
          <Text style={[styles.tabText, activeTab === 'Groupes' && styles.activeTabText]}>
            Groupes
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Feed' && (
        <>
          {/* Filter Pills */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterPill, activeFilter === 'Tous' && styles.activeFilterPill]}
              onPress={() => setActiveFilter('Tous')}
            >
              <Text style={[styles.filterText, activeFilter === 'Tous' && styles.activeFilterText]}>
                Tous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterPill, activeFilter === 'Vos posts' && styles.activeFilterPill]}
              onPress={() => setActiveFilter('Vos posts')}
            >
              <Text style={[styles.filterText, activeFilter === 'Vos posts' && styles.activeFilterText]}>
                Vos posts
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sport and Club Filters */}
          <View style={styles.sportFiltersContainer}>
            <TouchableOpacity style={styles.sportFilter}>
              <Text style={styles.sportFilterText}>{selectedSport}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sportFilter}>
              <Text style={styles.sportFilterText}>{selectedClubs}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sportFilter}>
              <Text style={styles.sportFilterText}>{selectedTime}</Text>
            </TouchableOpacity>
          </View>

          {/* Matches Section */}
          <View style={styles.matchesSection}>
            <Text style={styles.sectionTitle}>Matchs existants</Text>
            <Text style={styles.sectionSubtitle}>
              Ces matchs correspondent exactement à votre recherche et votre niveau
            </Text>

            <FlatList
              data={filteredMatches}
              keyExtractor={(item) => item.id}
              renderItem={renderMatchCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.matchesList}
            />
          </View>

          {/* Floating Action Button */}
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => router.push('/create-match')}
          >
            <Plus size={24} color={Colors.text.light} />
            <Text style={styles.fabText}>Commencer un match</Text>
          </TouchableOpacity>
        </>
      )}

      {activeTab === 'Groupes' && (
        <View style={styles.groupsContainer}>
          <Text style={styles.comingSoonText}>Groupes - Coming Soon</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  customHeader: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.text.light,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 8,
  },
  headerIcon: {
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.main,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.text.dark,
  },
  tabText: {
    fontSize: 16,
    color: Colors.text.gray,
  },
  activeTabText: {
    color: Colors.text.dark,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterPill: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterPill: {
    backgroundColor: Colors.text.dark,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  activeFilterText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  sportFiltersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sportFilter: {
    backgroundColor: Colors.text.dark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  sportFilterText: {
    color: Colors.text.light,
    fontSize: 14,
    fontWeight: '500',
  },
  matchesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 16,
    lineHeight: 20,
  },
  matchesList: {
    paddingBottom: 100,
  },
  matchCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  matchHeader: {
    marginBottom: 12,
  },
  matchDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  matchTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchType: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 6,
    marginRight: 12,
  },
  levelRange: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelRangeText: {
    fontSize: 12,
    color: Colors.text.dark,
  },
  playersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  playerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  playerAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
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
  availableSlot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 12,
    color: Colors.text.dark,
    fontWeight: 'bold',
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubIcon: {
    marginRight: 12,
  },
  clubIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: Colors.background.secondary,
    borderRadius: 4,
  },
  clubDetails: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  clubLocation: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  matchPricing: {
    alignItems: 'flex-end',
  },
  matchPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  matchDuration: {
    fontSize: 14,
    color: Colors.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  groupsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 18,
    color: Colors.text.gray,
  },
});