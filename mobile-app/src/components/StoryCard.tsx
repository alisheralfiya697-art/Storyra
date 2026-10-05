import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Story } from '../types';
import { Colors, Spacing } from '../constants/theme';

interface StoryCardProps {
  story: Story;
  onPress: () => void;
  onRead: () => void;
  onListen: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onPress, onRead, onListen }) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.card}>
      <Image source={{ uri: story.coverImage }} style={styles.cover} resizeMode="cover" />
      <View style={styles.badgeRow}>
        <View style={styles.genreBadge}>
          <Text style={styles.genreText}>{story.genre.toUpperCase()}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>★ {story.rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{story.title}</Text>
        <Text style={styles.author}>by {story.authorName}</Text>
        <Text style={styles.description} numberOfLines={2}>{story.description}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.readButton} onPress={onRead}>
            <Text style={styles.readButtonText}>Read ({story.estimatedReadingTime}m)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listenButton} onPress={onListen}>
            <Text style={styles.listenButtonText}>🎧 Listen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECE6DE',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cover: {
    width: '100%',
    height: 180,
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    backgroundColor: '#E8C547',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingText: {
    color: '#151210',
    fontSize: 11,
    fontWeight: '800',
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B18',
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: '#8E7F73',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#52453D',
    lineHeight: 18,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  readButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  readButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  listenButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  listenButtonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});
