import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { StoryVerseAPI } from '../api/storyverseApi';
import { StoryCard } from '../components/StoryCard';
import { Story, Language } from '../types';
import { Colors, Spacing } from '../constants/theme';
import { translate } from '../services/i18nService';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    StoryVerseAPI.getStories().then(setStories);
  }, []);

  const flagship = stories[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7D2948" />

      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>StoryVerse</Text>
            <Text style={styles.brandSub}>Interactive Fiction</Text>
          </View>
        </View>

        {/* Language Pill */}
        <View style={styles.langPill}>
          <TouchableOpacity
            style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
            onPress={() => setLang('en')}
          >
            <Text style={[styles.langText, lang === 'en' && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, lang === 'hi' && styles.langBtnActive]}
            onPress={() => setLang('hi')}
          >
            <Text style={[styles.langText, lang === 'hi' && styles.langTextActive]}>हिन्दी</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Flagship Story Banner */}
        {flagship && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('StoryDetails', { storyId: flagship.id })}
            style={styles.heroCard}
          >
            <Image source={{ uri: flagship.coverImage }} style={styles.heroImage} />
            <View style={styles.heroGradient}>
              <View style={styles.flagshipPill}>
                <Text style={styles.flagshipText}>✦ FLAGSHIP INTERACTIVE</Text>
              </View>
              <Text style={styles.heroTitle}>{flagship.title}</Text>
              <Text style={styles.heroSub}>{flagship.subtitle}</Text>

              <View style={styles.heroStats}>
                <Text style={styles.statText}>📖 {flagship.estimatedReadingTime} min</Text>
                <Text style={styles.statText}>🎧 {flagship.estimatedListeningTime} min</Text>
                <Text style={styles.statText}>🗳️ 3.8k votes</Text>
              </View>

              <View style={styles.heroBtnRow}>
                <TouchableOpacity
                  style={styles.heroReadBtn}
                  onPress={() => navigation.navigate('Reader', { chapterId: flagship.rootChapterId })}
                >
                  <Text style={styles.heroReadText}>Start Reading</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.heroListenBtn}
                  onPress={() => navigation.navigate('AudioPlayer', { storyId: flagship.id, chapterId: flagship.rootChapterId })}
                >
                  <Text style={styles.heroListenText}>🎧 Listen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Section: Trending Stories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{translate(lang, 'featured_stories')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        {stories.map((story) => (
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: '#7D2948',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
    fontStyle: 'italic',
  },
  brandTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  brandSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  langPill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  langBtnActive: {
    backgroundColor: '#FFF',
  },
  langText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  langTextActive: {
    color: '#7D2948',
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 80,
  },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  heroImage: {
    width: '100%',
    height: 340,
  },
  heroGradient: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(21,18,16,0.72)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  flagshipPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8C547',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  flagshipText: {
    color: '#151210',
    fontSize: 10,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroSub: {
    color: '#E8E1D9',
    fontSize: 13,
    marginBottom: 12,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
  heroBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heroReadBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  heroReadText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  heroListenBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
  },
  heroListenText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E1B18',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
});
