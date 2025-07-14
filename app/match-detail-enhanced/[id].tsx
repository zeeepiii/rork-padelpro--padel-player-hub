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
  Share2, 
  MessageCircle, 
  MapPin,
  Calendar,
  Clock,
  Info,
  Users,
  Plus
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { MATCHES } from '@/constants/mockData';
import { useUserStore } from '@/store/userStore';

const PLAYERS = [
  {
    id: '1',
    name: 'Dennis',
    level: 0.62,
    avatar: 'D',
    status: 'confirmed'
  },
  {
    id: '2', 
    name: 'Heni',
    level: 0.6,
    avatar: 'H',
    status: 'confirmed'
  },
  {
    id: '3',
    name: 'Fernando', 
    level: 1.02,
    avatar: 'F',
    status: 'confirmed'
  }
];

export default function MatchDetailEnhancedScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const [hasJoined, setHasJoined] = useState(false);
  
  const match = MATCHES.find(m => m.id === id) || MATCHES[0];
  const isUserInMatch = PLAYERS.some(player => player.id === user?.id);
  const canJoin = match.status === 'open' && PLAYERS.length < 4 && !isUserInMatch && !hasJoined;

  const handleJoinMatch = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    Alert.alert(
      'Réserver place',
      `Voulez-vous réserver votre place pour ce match à ${match.club}?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Réserver - 6,99€', 
          onPress: () => {
            setHasJoined(true);
            Alert.alert('Succès', 'Votre place a été réservée!');
          }
        }
      ]
    );
  };

  const handleChat = () => {
    Alert.alert('Chat', 'Ouvrir le chat du match');
  };

  const handleShare = () => {
    Alert.alert('Partager', 'Partager ce match');
  };

  const getLevelColor = (level: number) => {
    if (level < 0.7) return '#DAFF0D';
    if (level < 1.0) return '#DAFF0D'; 
    return '#DAFF0D';
  };

  const renderPlayer = (player: any, index: number) => (
    <View key={player.id} style={styles.playerContainer}>
      <View style={styles.playerAvatar}>
        <Text style={styles.playerInitial}>{player.avatar}</Text>
      </View>
      <Text style={styles.playerName}>{player.name}</Text>
      <View style={[styles.levelBadge, { backgroundColor: getLevelColor(player.level) }]}>
        <Text style={styles.levelText}>{player.level}</Text>
      </View>
      {player.id === user?.id && (
        <View style={styles.youIndicator}>
          <Text style={styles.youText}>(Vous)</Text>
        </View>
      )}
    </View>
  );

  const renderAvailableSlot = (index: number) => (
    <View key={`slot-${index}`} style={styles.playerContainer}>
      <View style={styles.availableSlot}>
        <Plus size={20} color={Colors.primary} />
      </View>
      <Text style={styles.playerName}>Libre</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.dark} size={24} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 color={Colors.text.dark} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <View style={styles.moreDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Players Section */}
        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>Joueurs</Text>
          
          <View style={styles.playersGrid}>
            {PLAYERS.map((player, index) => renderPlayer(player, index))}
            {Array.from({ length: 4 - PLAYERS.length }).map((_, index) => 
              renderAvailableSlot(index)
            )}
          </View>

          <View style={styles.teamDivider}>
            <View style={styles.teamLabel}>
              <Text style={styles.teamText}>A</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={styles.teamLabel}>
              <Text style={styles.teamText}>B</Text>
            </View>
          </View>
        </View>

        {/* Chat Button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <MessageCircle size={20} color={Colors.text.light} />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>

        {/* Club Information */}
        <View style={styles.clubSection}>
          <View style={styles.clubHeader}>
            <View style={styles.clubImagePlaceholder} />
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>{match.club}</Text>
              <Text style={styles.clubAddress}>Paseo de las Delicias, 61 (detrás...</Text>
              <TouchableOpacity>
                <Text style={styles.moreInfoText}>Plus d'informations ></Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.directionsButton}>
              <MapPin size={20} color={Colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Match Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations</Text>
          
          <View style={styles.infoItem}>
            <Info size={20} color={Colors.text.gray} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nom du court</Text>
              <Text style={styles.infoValue}>Pádel 2</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.courtIcon}>
              <View style={styles.courtIconPlaceholder} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Type de court</Text>
              <Text style={styles.infoValue}>Extérieur, Vitre, Doubles</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Calendar size={20} color={Colors.text.gray} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Fin inscription</Text>
              <Text style={styles.infoValue}>Demain à 12:15</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      {canJoin && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.reserveButton}
            onPress={handleJoinMatch}
          >
            <Text style={styles.reserveButtonText}>Réserver place - 6,99€</Text>
          </TouchableOpacity>
        </View>
      )}

      {(isUserInMatch || hasJoined) && (
        <View style={styles.footer}>
          <View style={styles.joinedIndicator}>
            <Text style={styles.joinedText}>✓ Vous participez à ce match</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    backgroundColor: Colors.background.main,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreDots: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.text.dark,
    marginVertical: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  playersSection: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  playersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.text.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerInitial: {
    color: Colors.text.light,
    fontSize: 18,
    fontWeight: 'bold',
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
  youIndicator: {
    marginTop: 4,
  },
  youText: {
    fontSize: 12,
    color: Colors.text.gray,
    fontStyle: 'italic',
  },
  teamDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLabel: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.ui.border,
    marginHorizontal: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 16,
  },
  chatButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  clubSection: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
    marginRight: 12,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  clubAddress: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 4,
  },
  moreInfoText: {
    fontSize: 14,
    color: Colors.primary,
  },
  directionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text.dark,
    fontWeight: '500',
  },
  courtIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtIconPlaceholder: {
    width: 16,
    height: 16,
    backgroundColor: Colors.text.gray,
    borderRadius: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
  },
  reserveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinedIndicator: {
    backgroundColor: '#dcfce7',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinedText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});