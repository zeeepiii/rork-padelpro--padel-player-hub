import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Trophy,
  Share2
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { MATCHES } from '@/constants/mockData';
import { useUserStore } from '@/store/userStore';

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const [hasJoined, setHasJoined] = useState(false);
  
  const match = MATCHES.find(m => m.id === id) || MATCHES[0];
  const isUserInMatch = match.players.some(player => player.id === user?.id);
  const canJoin = match.status === 'open' && match.players.length < 4 && !isUserInMatch && !hasJoined;

  const handleJoinMatch = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    Alert.alert(
      'Join Match',
      `Are you sure you want to join this match at ${match.club}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Join', 
          onPress: () => {
            setHasJoined(true);
            Alert.alert('Success', 'You have joined the match!');
          }
        }
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Share', 'Match details shared!');
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
        <Text style={styles.headerTitle}>Match Details</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <Text style={styles.clubName}>{match.club}</Text>
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusDot, 
                { backgroundColor: match.status === 'open' ? '#22c55e' : Colors.primary }
              ]} />
              <Text style={styles.statusText}>
                {match.status === 'open' ? 'Open for Players' : 'Confirmed'}
              </Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.text.gray} />
            <Text style={styles.locationText}>Madrid, Spain</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Match Information</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Calendar size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {new Date(match.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Clock size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Time & Duration</Text>
              <Text style={styles.detailValue}>{match.time} • {match.duration} minutes</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Trophy size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Level</Text>
              <Text style={styles.detailValue}>{match.level}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Users size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Court</Text>
              <Text style={styles.detailValue}>Court {match.court}</Text>
            </View>
          </View>
        </View>

        <View style={styles.playersCard}>
          <View style={styles.playersHeader}>
            <Text style={styles.sectionTitle}>Players ({match.players.length}/4)</Text>
            <View style={styles.spotsLeft}>
              <Text style={styles.spotsLeftText}>
                {4 - match.players.length} spots left
              </Text>
            </View>
          </View>

          {match.players.map((player, index) => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerAvatar}>
                <Text style={styles.playerInitial}>
                  {player.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerLevel}>Level {player.level}</Text>
              </View>
              {player.id === user?.id && (
                <View style={styles.youBadge}>
                  <Text style={styles.youBadgeText}>You</Text>
                </View>
              )}
            </View>
          ))}

          {Array.from({ length: 4 - match.players.length }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyPlayerRow}>
              <View style={styles.emptyPlayerAvatar}>
                <Users size={20} color={Colors.text.gray} />
              </View>
              <Text style={styles.emptyPlayerText}>Waiting for player...</Text>
            </View>
          ))}
        </View>

        <View style={styles.rulesCard}>
          <Text style={styles.sectionTitle}>Match Rules</Text>
          <Text style={styles.ruleText}>• Arrive 10 minutes before match time</Text>
          <Text style={styles.ruleText}>• Bring your own racket and balls</Text>
          <Text style={styles.ruleText}>• Respect other players and court rules</Text>
          <Text style={styles.ruleText}>• Cancel at least 2 hours in advance</Text>
        </View>
      </ScrollView>

      {canJoin && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={handleJoinMatch}
          >
            <Text style={styles.joinButtonText}>Join Match</Text>
          </TouchableOpacity>
        </View>
      )}

      {(isUserInMatch || hasJoined) && (
        <View style={styles.footer}>
          <View style={styles.joinedIndicator}>
            <Text style={styles.joinedText}>✓ You have joined this match</Text>
          </View>
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
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
    marginBottom: 8,
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  statusContainer: {
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  detailsCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  playersCard: {
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
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  spotsLeft: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  spotsLeftText: {
    fontSize: 12,
    color: Colors.text.dark,
    fontWeight: 'bold',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerInitial: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: 16,
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
  playerLevel: {
    fontSize: 14,
    color: Colors.text.gray,
  },
  youBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  youBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  emptyPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyPlayerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emptyPlayerText: {
    fontSize: 16,
    color: Colors.text.gray,
    fontStyle: 'italic',
  },
  rulesCard: {
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
  ruleText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinedIndicator: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinedText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});