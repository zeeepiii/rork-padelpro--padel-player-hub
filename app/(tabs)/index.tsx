import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bolt, GraduationCap, Trophy, Search } from 'lucide-react-native';
import Header from '@/components/Header';
import ActionButton from '@/components/ActionButton';
import ClubCard from '@/components/ClubCard';
import LocationActivation from '@/components/LocationActivation';
import PremiumBanner from '@/components/PremiumBanner';
import Colors from '@/constants/colors';
import { CLUBS } from '@/constants/mockData';
import { useUserStore } from '@/store/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLocationEnabled, favoriteClubs, actions } = useUserStore();
  const [clubs, setClubs] = useState(CLUBS);

  const toggleFavorite = (clubId: string) => {
    actions.toggleFavoriteClub(clubId);
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, favorite: !club.favorite } : club
    ));
  };

  const handleLocationEnabled = () => {
    actions.enableLocation();
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Quel est ton état d'esprit aujourd'hui, {user?.name}?
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <ActionButton
            icon={<Bolt size={28} color={Colors.text.dark} />}
            label="Réservez un court"
            onPress={() => router.push('/booking')}
          />
          <ActionButton
            icon={<GraduationCap size={28} color={Colors.text.dark} />}
            label="Apprendre"
            onPress={() => router.push('/coaches')}
          />
          <ActionButton
            icon={<Trophy size={28} color={Colors.text.dark} />}
            label="Rivaliser"
            onPress={() => router.push('/tournaments')}
          />
          <ActionButton
            icon={<Search size={28} color={Colors.text.dark} />}
            label="Chercher match"
            onPress={() => router.push('/matches')}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clubs suggérés pour toi</Text>
            <TouchableOpacity onPress={() => router.push('/clubs')}>
              <Text style={styles.seeAllText}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.clubsContainer}>
            {!isLocationEnabled ? (
              <LocationActivation onLocationEnabled={handleLocationEnabled} />
            ) : (
              <FlatList
                data={clubs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ClubCard
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    distance={item.distance}
                    city={item.city}
                    favorite={favoriteClubs.includes(item.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                )}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>

        <PremiumBanner />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  welcomeContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.light,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  clubsContainer: {
    marginBottom: 16,
  },
});