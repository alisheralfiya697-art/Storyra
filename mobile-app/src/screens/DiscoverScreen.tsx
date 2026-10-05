import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StoryVerseAPI } from '../api/storyverseApi';
import { StoryCard } from '../components/StoryCard';
import { Story } from '../types';
import { Colors } from '../constants/theme';

export const DiscoverScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    StoryVerseAPI.getStories().then(setStories);
  }, []);

  const genres = ['All', 'Mystery', 'Fantasy', 'Sci-Fi', 'Horror'];

  const filtered = stories.filter((s) => {
    if (selectedGenre !== 'All' && s.genre !== selectedGenre) return false;
    if (search.trim() && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7D2948" />

      {/* Header Search */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Stories</Text>
        <TextInput
          placeholder="Search by title, author, or genre..."
          placeholderTextColor="#8E7F73"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Genres Horizontal Scroll */}
      <View style={styles.genreRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreScroll}>
          {genres.map((g) => (
            <TouchableOpacity
              key={g}
              onPress={() => setSelectedGenre(g)}
              style={[styles.genrePill, selectedGenre === g && styles.genrePillActive]}
            >
              <Text style={[styles.genreText, selectedGenre === g && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filtered.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onPress={() => navigation.navigate('StoryDetails', { storyId: story.id })}
            onRead={() => navigation.navigate('Reader', { chapterId: story.rootChapterId })}
            onListen={() => navigation.navigate('AudioPlayer', { storyId: story.id, chapterId: story.rootChapterId })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    backgroundColor: '#7D2948',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E1B18',
  },
  genreRow: {
    paddingVertical: 12,
    backgroundColor: '#FAF8F5',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6DE',
  },
  genreScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  genrePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ECE6DE',
  },
  genrePillActive: {
    backgroundColor: Colors.primary,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52453D',
  },
  genreTextActive: {
    color: '#FFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
});
