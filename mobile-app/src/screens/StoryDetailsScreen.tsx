import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StoryVerseAPI } from '../api/storyverseApi';
import { Story, Chapter } from '../types';
import { Colors, Spacing } from '../constants/theme';

export const StoryDetailsScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { storyId } = route.params || { storyId: 'story-1' };
  const [story, setStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'community'>('overview');

  useEffect(() => {
    StoryVerseAPI.getStoryById(storyId).then((s) => {
      if (s) setStory(s);
    });
  }, [storyId]);

  if (!story) {
    return (
      <View style={styles.center}>
        <Text>Loading story...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#151210" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{story.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover & Hero Meta */}
        <View style={styles.heroRow}>
          <Image source={{ uri: story.coverImage }} style={styles.cover} />
          <View style={styles.heroMeta}>
            <View style={styles.genrePill}>
              <Text style={styles.genreText}>{story.genre.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.author}>by {story.authorName}</Text>
            <Text style={styles.rating}>★ {story.rating.toFixed(2)} rating</Text>
            <Text style={styles.langBadge}>🌐 English + हिन्दी</Text>
          </View>
        </View>

        {/* Primary Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.readPrimaryBtn}
            onPress={() => navigation.navigate('Reader', { chapterId: story.rootChapterId })}
          >
            <Text style={styles.readPrimaryText}>Start Reading</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listenSecondaryBtn}
            onPress={() =>
              navigation.navigate('AudioPlayer', {
                storyId: story.id,
                chapterId: story.rootChapterId,
              })
            }
          >
            <Text style={styles.listenSecondaryText}>🎧 Listen</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['overview', 'chapters', 'community'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Body */}
        {activeTab === 'overview' && (
          <View style={styles.tabBody}>
            <Text style={styles.subtitle}>{story.subtitle}</Text>
            <Text style={styles.description}>{story.description}</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{story.readersCount.toLocaleString()}</Text>
                <Text style={styles.statLbl}>Readers</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{story.listenersCount.toLocaleString()}</Text>
                <Text style={styles.statLbl}>Listeners</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{story.estimatedReadingTime}m</Text>
                <Text style={styles.statLbl}>Reading Time</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'chapters' && (
          <View style={styles.tabBody}>
            <TouchableOpacity
              style={styles.chapterCard}
              onPress={() => navigation.navigate('Reader', { chapterId: story.rootChapterId })}
            >
              <View>
                <Text style={styles.chapPart}>Part 1</Text>
                <Text style={styles.chapTitle}>The Wax Seal</Text>
                <Text style={styles.chapMeta}>5 min read · Contains community poll</Text>
              </View>
              <Text style={styles.readArrow}>Read →</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'community' && (
          <View style={styles.tabBody}>
            <View style={styles.commentBox}>
              <Text style={styles.commentAuthor}>Clara Miller · 2 hours ago</Text>
              <Text style={styles.commentText}>
                "The whisper through the keyhole gave me chills! I voted to demand the identity first."
              </Text>
              <Text style={styles.commentHi}>
                🇮🇳 "चाबी के छेद से आई फुसफुसाहट ने मेरे रोंगटे खड़े कर दिए!"
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E1B18',
  },
  backBtn: {
    padding: 4,
  },
  backText: {
    color: '#D8CFBF',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  heroRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  cover: {
    width: 120,
    height: 160,
    borderRadius: 16,
  },
  heroMeta: {
    flex: 1,
    justifyContent: 'space-between',
  },
  genrePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(125,41,72,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  genreText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E1B18',
  },
  author: {
    fontSize: 12,
    color: '#8E7F73',
  },
  rating: {
    color: '#E8C547',
    fontSize: 12,
    fontWeight: '700',
  },
  langBadge: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  readPrimaryBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  readPrimaryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  listenSecondaryBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  listenSecondaryText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6DE',
    marginBottom: 16,
  },
  tabBtn: {
    paddingVertical: 10,
    marginRight: 20,
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8E7F73',
  },
  tabTextActive: {
    color: Colors.primary,
  },
  tabBody: {
    gap: 12,
  },
  subtitle: {
    fontSize: 15,
    fontStyle: 'italic',
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#52453D',
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECE6DE',
    marginTop: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B18',
  },
  statLbl: {
    fontSize: 10,
    color: '#8E7F73',
    marginTop: 2,
  },
  chapterCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE6DE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapPart: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8E7F73',
  },
  chapTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1B18',
    marginTop: 2,
  },
  chapMeta: {
    fontSize: 11,
    color: '#8E7F73',
    marginTop: 4,
  },
  readArrow: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  commentBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE6DE',
    gap: 6,
  },
  commentAuthor: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E7F73',
  },
  commentText: {
    fontSize: 13,
    color: '#1E1B18',
  },
  commentHi: {
    fontSize: 12,
    color: Colors.primary,
  },
});
