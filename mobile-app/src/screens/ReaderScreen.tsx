import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StoryVerseAPI } from '../api/storyverseApi';
import { Chapter } from '../types';
import { Colors, Spacing } from '../constants/theme';

export const ReaderScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { chapterId } = route.params || { chapterId: 'chap-1-1' };
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<number>(18);
  const [votedChoiceId, setVotedChoiceId] = useState<string | null>(null);

  useEffect(() => {
    StoryVerseAPI.getChapterById(chapterId).then((ch) => {
      if (ch) setChapter(ch);
    });
  }, [chapterId]);

  if (!chapter) {
    return (
      <View style={styles.center}>
        <Text>Loading Chapter...</Text>
      </View>
    );
  }

  const themeBg =
    theme === 'dark' ? '#151210' : theme === 'sepia' ? '#F4ECD8' : '#FAF8F5';
  const themeText =
    theme === 'dark' ? '#E8E1D9' : theme === 'sepia' ? '#3D3226' : '#241F1A';

  const handleVote = (choiceId: string) => {
    setVotedChoiceId(choiceId);
    StoryVerseAPI.castVote(chapter.id, choiceId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeBg }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeBg}
      />

      {/* Reader Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: theme === 'dark' ? '#2A2420' : '#ECE6DE' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: themeText }]}>‹ Back</Text>
        </TouchableOpacity>

        {/* Listen Sync Button */}
        <TouchableOpacity
          style={styles.listenBtn}
          onPress={() =>
            navigation.navigate('AudioPlayer', {
              storyId: chapter.storyId,
              chapterId: chapter.id,
            })
          }
        >
          <Text style={styles.listenBtnText}>🎧 Listen</Text>
        </TouchableOpacity>

        {/* Quick Theme Switcher */}
        <View style={styles.themeRow}>
          <TouchableOpacity
            style={[styles.themePill, theme === 'light' && styles.themePillActive]}
            onPress={() => setTheme('light')}
          >
            <Text style={styles.themeLabel}>L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themePill, theme === 'sepia' && styles.themePillActive]}
            onPress={() => setTheme('sepia')}
          >
            <Text style={styles.themeLabel}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themePill, theme === 'dark' && styles.themePillActive]}
            onPress={() => setTheme('dark')}
          >
            <Text style={styles.themeLabel}>D</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.chapterTitle, { color: themeText }]}>{chapter.title}</Text>

        <Text style={[styles.prose, { color: themeText, fontSize, lineHeight: fontSize * 1.65 }]}>
          {chapter.content}
        </Text>

        {/* Interactive Decision Point Poll */}
        {chapter.decisionPoint && (
          <View style={[styles.decisionBox, { backgroundColor: theme === 'dark' ? '#201C19' : '#FFF' }]}>
            <View style={styles.decisionBadge}>
              <Text style={styles.decisionBadgeText}>COMMUNITY DECISION POLL</Text>
            </View>

            <Text style={styles.decisionPrompt}>"{chapter.decisionPoint.prompt}"</Text>

            <View style={styles.choicesList}>
              {chapter.decisionPoint.choices.map((c) => {
                const isSelected = votedChoiceId === c.id;
                return (
                  <TouchableOpacity
                    key={c.id}
                    activeOpacity={0.8}
                    style={[styles.choiceBtn, isSelected && styles.choiceBtnSelected]}
                    onPress={() => handleVote(c.id)}
                  >
                    <View style={[styles.choiceFill, { width: `${c.percentage}%` }]} />
                    <View style={styles.choiceRow}>
                      <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>
                        {isSelected ? '✓ ' : ''}{c.text}
                      </Text>
                      <Text style={styles.choicePercent}>{c.percentage}%</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
  },
  listenBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  listenBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  themeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  themePill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themePillActive: {
    backgroundColor: Colors.primary,
  },
  themeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 60,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  prose: {
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  decisionBox: {
    marginTop: 36,
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  decisionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  decisionBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  decisionPrompt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B18',
    marginBottom: 16,
  },
  choicesList: {
    gap: 10,
  },
  choiceBtn: {
    backgroundColor: '#F6F4F0',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECE6DE',
  },
  choiceBtnSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(125,41,72,0.08)',
  },
  choiceFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(125,41,72,0.18)',
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  choiceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1B18',
    flex: 1,
  },
  choiceTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  choicePercent: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    marginLeft: 8,
  },
});
