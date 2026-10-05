import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../types';

const KEYS = {
  LANGUAGE: '@storyverse_language',
  AUTH_TOKEN: '@storyverse_token',
  USER_DATA: '@storyverse_user',
  BOOKMARKS: '@storyverse_bookmarks',
  READING_PROGRESS: '@storyverse_reading_progress',
};

export const StorageService = {
  async getLanguage(): Promise<Language> {
    try {
      const saved = await AsyncStorage.getItem(KEYS.LANGUAGE);
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  },

  async setLanguage(lang: Language): Promise<void> {
    await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
  },

  async getBookmarks(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async toggleBookmark(storyId: string): Promise<string[]> {
    const list = await this.getBookmarks();
    const exists = list.includes(storyId);
    const updated = exists ? list.filter((id) => id !== storyId) : [...list, storyId];
    await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  },

  async getReadingProgress(): Promise<Record<string, number>> {
    try {
      const data = await AsyncStorage.getItem(KEYS.READING_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  async saveReadingProgress(chapterId: string, percentage: number): Promise<void> {
    const progress = await this.getReadingProgress();
    progress[chapterId] = percentage;
    await AsyncStorage.setItem(KEYS.READING_PROGRESS, JSON.stringify(progress));
  },
};
