import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';

interface ClubCardProps {
  id: string;
  name: string;
  image: string;
  distance: string;
  city: string;
  favorite: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function ClubCard({ 
  id, 
  name, 
  image, 
  distance, 
  city, 
  favorite, 
  onToggleFavorite 
}: ClubCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/club/${id}`)}
    >
      <Image source={{ uri: image }} style={styles.image} />
      
      {onToggleFavorite && (
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(id)}
        >
          <Heart 
            size={24} 
            color={favorite ? '#ef4444' : Colors.text.light} 
            fill={favorite ? '#ef4444' : 'none'} 
          />
        </TouchableOpacity>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.distance}>{distance} — {city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    color: Colors.text.gray,
  },
});