import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import Colors from '@/constants/colors';
import { MATCHES } from '@/constants/mockData';

export default function CommunityScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Open Matches</Text>
          <TouchableOpacity onPress={() => router.push('/matches')}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={MATCHES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.matchCard}
              onPress={() => router.push(`/match/${item.id}`)}
            >
              <View style={styles.matchHeader}>
                <Text style={styles.matchClub}>{item.club}</Text>
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
                <Text style={styles.matchTime}>
                  {item.date.split('-')[2]} July • {item.time} • {item.duration} min
                </Text>
                <Text style={styles.matchLevel}>Level: {item.level}</Text>
              </View>
              
              <View style={styles.playersContainer}>
                <Text style={styles.playersTitle}>Players:</Text>
                <View style={styles.playersList}>
                  {item.players.map((player, index) => (
                    <View key={player.id} style={styles.playerItem}>
                      <View style={styles.playerAvatar}>
                        <Text style={styles.playerInitial}>
                          {player.name.charAt(0)}
                        </Text>
                      </View>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerLevel}>{player.level}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={() => router.push(`/match/${item.id}`)}
              >
                <Text style={styles.joinButtonText}>
                  {item.status === 'open' ? 'Join Match' : 'View Details'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.matchesList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  matchesList: {
    paddingBottom: 20,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  matchClub: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
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
    marginBottom: 16,
  },
  matchTime: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  matchLevel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  playersContainer: {
    marginBottom: 16,
  },
  playersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  playersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  playerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playerInitial: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 14,
    color: Colors.text.dark,
    marginRight: 4,
  },
  playerLevel: {
    fontSize: 12,
    color: Colors.text.gray,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 16,
  },
});