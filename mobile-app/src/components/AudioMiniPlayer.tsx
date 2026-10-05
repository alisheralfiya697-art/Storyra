import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface AudioMiniPlayerProps {
  storyTitle: string;
  chapterTitle: string;
  coverImage: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPress: () => void;
}

export const AudioMiniPlayer: React.FC<AudioMiniPlayerProps> = ({
  storyTitle,
  chapterTitle,
  coverImage,
  isPlaying,
  onTogglePlay,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.storyTitle} numberOfLines={1}>{storyTitle}</Text>
        <Text style={styles.chapterTitle} numberOfLines={1}>🎧 {chapterTitle}</Text>
      </View>
      <TouchableOpacity onPress={onTogglePlay} style={styles.playBtn}>
        <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B18',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#38312B',
  },
  thumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  storyTitle: {
    color: '#F3ACB6',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  chapterTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  playBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
