import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Spacing } from '../constants/theme';

export const AudioPlayerScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { storyId, chapterId } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLang, setAudioLang] = useState<'en' | 'hi'>('en');
  const [speed, setSpeed] = useState(1.0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151210" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕ Close</Text>
        </TouchableOpacity>

        {/* Audio Language Switcher */}
        <View style={styles.langSwitch}>
          <TouchableOpacity
            style={[styles.langPill, audioLang === 'en' && styles.langPillActive]}
            onPress={() => setAudioLang('en')}
          >
            <Text style={[styles.langText, audioLang === 'en' && styles.langTextActive]}>
              🇬🇧 English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langPill, audioLang === 'hi' && styles.langPillActive]}
            onPress={() => setAudioLang('hi')}
          >
            <Text style={[styles.langText, audioLang === 'hi' && styles.langTextActive]}>
              🇮🇳 हिन्दी
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.switchReadBtn}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('Reader', { chapterId: chapterId || 'chap-1-1' });
          }}
        >
          <Text style={styles.switchReadText}>📖 Read</Text>
        </TouchableOpacity>
      </View>

      {/* Story Cover */}
      <View style={styles.artworkContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
          }}
          style={styles.artwork}
        />
      </View>

      {/* Titles */}
      <View style={styles.metaBox}>
        <View style={styles.voiceBadge}>
          <Text style={styles.voiceBadgeText}>✨ Thin & Alluring Voice · Alluring Silk</Text>
        </View>
        <Text style={styles.storyTitle}>THE LAST DOOR</Text>
        <Text style={styles.chapterTitle}>Part 1: The Wax Seal</Text>
        <Text style={styles.langIndicator}>
          Playing in: {audioLang === 'hi' ? '🇮🇳 हिन्दी (Natural AI Voice)' : '🇬🇧 English (Silk Voice)'}
        </Text>
      </View>

      {/* Scrubber Progress Bar */}
      <View style={styles.scrubberBox}>
        <View style={styles.track}>
          <View style={[styles.progressFill, { width: '42%' }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>01:24</Text>
          <Text style={styles.timeText}>-03:28</Text>
        </View>
      </View>

      {/* Main Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipText}>-15s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playPauseBtn}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Text style={styles.playPauseIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipText}>+30s</Text>
        </TouchableOpacity>
      </View>

      {/* Speed Controls */}
      <View style={styles.speedRow}>
        {[0.75, 1.0, 1.25, 1.5].map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSpeed(s)}
            style={[styles.speedPill, speed === s && styles.speedPillActive]}
          >
            <Text style={[styles.speedText, speed === s && styles.speedTextActive]}>{s}x</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151210',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    color: '#D8CFBF',
    fontWeight: '700',
    fontSize: 13,
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 2,
  },
  langPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  langPillActive: {
    backgroundColor: Colors.primary,
  },
  langText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
  },
  langTextActive: {
    color: '#FFF',
  },
  switchReadBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  switchReadText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  artworkContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  artwork: {
    width: 240,
    height: 240,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  metaBox: {
    alignItems: 'center',
  },
  voiceBadge: {
    backgroundColor: 'rgba(232,197,71,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(232,197,71,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  voiceBadgeText: {
    color: '#E8C547',
    fontSize: 10,
    fontWeight: '700',
  },
  storyTitle: {
    color: '#F3ACB6',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  chapterTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  langIndicator: {
    color: '#8E7F73',
    fontSize: 11,
    marginTop: 6,
  },
  scrubberBox: {
    width: '100%',
  },
  track: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  skipBtn: {
    padding: 12,
  },
  skipText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  playPauseBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  playPauseIcon: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
  },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  speedPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  speedPillActive: {
    backgroundColor: '#FFF',
  },
  speedText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
  },
  speedTextActive: {
    color: '#151210',
  },
});
