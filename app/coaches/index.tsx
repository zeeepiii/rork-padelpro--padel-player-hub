import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Star, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { COACHES } from '@/constants/mockData';

export default function CoachesScreen() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  
  const specialties = ['All', 'Technique', 'Strategy', 'Beginners', 'Advanced Players', 'Competition', 'Fitness'];
  
  const filteredCoaches = COACHES.filter(coach => {
    if (!selectedSpecialty || selectedSpecialty === 'All') return true;
    return coach.specialties.includes(selectedSpecialty);
  });

  const renderCoachItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.coachCard}
      onPress={() => router.push(`/coach/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.coachImage} />
      
      <View style={styles.coachInfo}>
        <Text style={styles.coachName}>{item.name}</Text>
        <Text style={styles.coachExperience}>{item.experience} experience</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={16} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>(45 reviews)</Text>
        </View>
        
        <View style={styles.specialtiesContainer}>
          {item.specialties.slice(0, 2).map((specialty: string, index: number) => (
            <View key={index} style={styles.specialtyBadge}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          {item.specialties.length > 2 && (
            <Text style={styles.moreSpecialties}>+{item.specialties.length - 2} more</Text>
          )}
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>€{item.price}/hour</Text>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => router.push(`/coach/${item.id}`)}
          >
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>Find Coaches</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.text.light} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Specialties:</Text>
        <FlatList
          data={specialties}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.specialtyFilter,
                (selectedSpecialty === item || (!selectedSpecialty && item === 'All')) && styles.activeSpecialtyFilter
              ]}
              onPress={() => setSelectedSpecialty(item === 'All' ? null : item)}
            >
              <Text style={[
                styles.specialtyFilterText,
                (selectedSpecialty === item || (!selectedSpecialty && item === 'All')) && styles.activeSpecialtyFilterText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.specialtyFilters}
        />
      </View>

      <FlatList
        data={filteredCoaches}
        keyExtractor={(item) => item.id}
        renderItem={renderCoachItem}
        contentContainerStyle={styles.coachesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No coaches found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your specialty filter
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
  specialtyFilters: {
    paddingRight: 16,
  },
  specialtyFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginRight: 8,
  },
  activeSpecialtyFilter: {
    backgroundColor: Colors.primary,
  },
  specialtyFilterText: {
    fontSize: 14,
    color: Colors.text.dark,
  },
  activeSpecialtyFilterText: {
    color: Colors.text.light,
    fontWeight: 'bold',
  },
  coachesList: {
    padding: 16,
  },
  coachCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  coachExperience: {
    fontSize: 14,
    color: Colors.text.gray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  specialtyBadge: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: Colors.text.dark,
  },
  moreSpecialties: {
    fontSize: 12,
    color: Colors.text.gray,
    fontStyle: 'italic',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
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
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.text.gray,
    textAlign: 'center',
  },
});