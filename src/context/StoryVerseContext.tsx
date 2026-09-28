import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Story,
  Chapter,
  Character,
  StoryUniverse,
  Challenge,
  Achievement,
  NotificationItem,
  StoryPulseData,
  Reaction,
  Comment,
  UserRole,
  DecisionPoint,
  StoryTranslation,
  ChapterTranslation,
  CharacterTranslation,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_STORIES,
  INITIAL_CHAPTERS,
  INITIAL_CHARACTERS,
  INITIAL_UNIVERSES,
  INITIAL_CHALLENGES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_NOTIFICATIONS,
  STORYPULSE_DATA,
  INITIAL_REACTIONS,
  INITIAL_COMMENTS,
} from '../data/mockData';
import {
  STORY_TRANSLATIONS,
  CHAPTER_TRANSLATIONS,
  CHARACTER_TRANSLATIONS,
  COMMENT_TRANSLATIONS,
  translateTextToHindi,
} from '../data/storyTranslations';
import { audioEngine } from '../utils/audioEngine';
import { AppLanguage, getTranslation } from '../i18n/translations';

export type ViewMode =
  | 'landing'
  | 'discover'
  | 'story_details'
  | 'read'
  | 'writer_dashboard'
  | 'writer_editor'
  | 'story_tree'
  | 'profile'
  | 'challenges'
  | 'admin';

export interface AudioState {
  isPlaying: boolean;
  storyId: string | null;
  activeStoryId: string | null; // convenient alias
  chapterId: string | null;
  activeChapterId: string | null; // convenient alias
  currentTime: number;
  currentTimeSeconds: number; // convenient alias
  duration: number;
  durationSeconds: number; // convenient alias
  playbackSpeed: number;
  speed: number; // convenient alias
  volume: number;
  sleepTimer: number | null; // minutes remaining
  isFullPlayerOpen: boolean;
  voiceStyle: string;
  thinnessModifier: number;
  ambientShimmer: boolean;
}

interface ReadingPreferences {
  theme: 'light' | 'dark' | 'sepia';
  fontSize: number; // in px, e.g. 18
  lineSpacing: number; // e.g. 1.75
  fontFamily: 'editorial' | 'sans' | 'display';
  isFocusMode: boolean;
}

interface StoryVerseContextType {
  // Multi-Language Support (English, Hindi, Urdu)
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
  isRTL: boolean;

  // Content Translation & Multilingual Reading/Audio
  readingLanguage: 'en' | 'hi';
  setReadingLanguage: (lang: 'en' | 'hi') => void;
  audioLanguage: 'en' | 'hi';
  setAudioLanguage: (lang: 'en' | 'hi') => void;
  switchAudioLanguage: (lang: 'en' | 'hi') => void;
  getLocalizedStory: (story: Story, lang?: AppLanguage) => Story;
  getLocalizedChapter: (chapter: Chapter, lang?: AppLanguage) => Chapter;
  getLocalizedCharacter: (char: Character, lang?: AppLanguage) => Character;
  translateStory: (storyId: string, targetLang?: 'en' | 'hi') => Promise<void>;
  translateChapter: (chapterId: string, targetLang?: 'en' | 'hi') => Promise<void>;
  isTranslating: boolean;
  commentTranslations: Record<string, boolean>;
  toggleCommentTranslation: (commentId: string) => void;
  getLocalizedCommentText: (comment: Comment) => { text: string; isTranslated: boolean };
  updateStoryTranslation: (storyId: string, lang: 'en' | 'hi', data: Partial<StoryTranslation>) => void;
  updateChapterTranslation: (chapterId: string, lang: 'en' | 'hi', data: Partial<ChapterTranslation>) => void;

  currentUser: User;
  allUsers: User[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  updateUserProfile: (updated: Partial<User>) => void;
  
  // Navigation & Views
  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;
  activeStoryId: string;
  setActiveStoryId: (id: string) => void;
  activeChapterId: string;
  setActiveChapterId: (id: string) => void;
  
  // Stories & Chapters
  stories: Story[];
  chapters: Chapter[];
  characters: Character[];
  universes: StoryUniverse[];
  challenges: Challenge[];
  achievements: Achievement[];
  notifications: NotificationItem[];
  reactions: Reaction[];
  comments: Comment[];
  storyPulse: StoryPulseData;
  pulseData: Record<string, StoryPulseData>;

  // Active Story Helpers
  activeStory: Story | undefined;
  activeChapter: Chapter | undefined;

  // Story Creation & Editing
  createNewStory: (newStory: Partial<Story>) => Story;
  updateStory: (storyId: string, updates: Partial<Story>) => void;
  createChapter: (chapter: Partial<Chapter>) => Chapter;
  updateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  updateChapterContent: (chapterId: string, title: string, content: string) => void;
  setChapterDecisionPoint: (chapterId: string, decisionPoint: DecisionPoint | undefined) => void;
  setChapterDecisionPoints: (chapterId: string, decisionPoints: DecisionPoint[]) => void;
  createCharacter: (char: Partial<Character>) => Character;
  updateCharacter: (charId: string, updates: Partial<Character>) => void;
  deleteCharacter: (charId: string) => void;

  // Interactive Decisions & Branching
  castVote: (chapterId: string, choiceId: string, decisionPointId?: string) => void;
  simulateCommunityVotingPulse: (chapterId: string) => void;
  closeDecision: (chapterId: string, winningChoiceId: string) => void;
  createChapterFromWinningChoice: (chapterId: string, choiceText: string) => Chapter;
  voteSpinOffIntoCanon: (storyId: string) => void;
  createSpinOff: (data: {
    originalStoryId: string;
    title: string;
    subtitle?: string;
    description: string;
    forkedFromChapterId?: string;
    forkedFromDecisionText?: string;
    content: string;
  }) => Story;

  // Reading Experience
  readingPrefs: ReadingPreferences;
  setReadingPrefs: React.Dispatch<React.SetStateAction<ReadingPreferences>>;
  readingProgress: Record<string, number>; // chapterId -> percentage (0-100)
  updateReadingProgress: (chapterId: string, progressPct: number) => void;
  addReaction: (reaction: Omit<Reaction, 'id' | 'createdAt'>) => void;
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes'>) => void;
  toggleCommentLike: (commentId: string) => void;
  toggleSpoiler: (commentId: string) => void;

  // Audio Experience & Read<->Listen Sync
  audioState: AudioState;
  playChapterAudio: (storyId: string, chapterId: string, startPct?: number) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  togglePlayPause: () => void;
  seekAudio: (seconds: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setAudioSpeed: (speed: number) => void;
  setVolume: (vol: number) => void;
  setAudioVolume: (vol: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  toggleFullPlayer: (open?: boolean) => void;
  setVoiceStyle: (style: string) => void;
  setVoiceThinness: (modifier: number) => void;
  toggleAmbientShimmer: () => void;
  previewVoiceSample: (style?: string) => void;
  syncReadingToAudio: () => void;
  syncAudioToReading: () => void;

  // Social & Engagement
  toggleBookmark: (storyId: string) => void;
  toggleFollowAuthor: (authorId: string) => void;
  toggleLikeStory: (storyId: string) => void;
  markNotificationRead: (notifId: string) => void;

  // Auth modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;

  // Guided Walkthrough / Investor Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (active: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  advanceDemoStep: () => void;
  resetDemoState: () => void;
}

const StoryVerseContext = createContext<StoryVerseContextType | undefined>(undefined);

export const StoryVerseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Multi-Language (English, Hindi, Urdu)
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('storyverse_language') as AppLanguage;
    return saved === 'hi' || saved === 'ur' ? saved : 'en';
  });

  const [readingLanguage, setReadingLanguageState] = useState<'en' | 'hi'>(() => {
    const saved = localStorage.getItem('storyverse_reading_language') as 'en' | 'hi';
    if (saved === 'en' || saved === 'hi') return saved;
    const initialLang = (localStorage.getItem('storyverse_language') as AppLanguage) || 'en';
    return initialLang === 'hi' ? 'hi' : 'en';
  });

  const [audioLanguage, setAudioLanguageState] = useState<'en' | 'hi'>(() => {
    const initialLang = (localStorage.getItem('storyverse_language') as AppLanguage) || 'en';
    return initialLang === 'hi' ? 'hi' : 'en';
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const [commentTranslations, setCommentTranslations] = useState<Record<string, boolean>>({});

  const setReadingLanguage = (lang: 'en' | 'hi') => {
    setReadingLanguageState(lang);
    localStorage.setItem('storyverse_reading_language', lang);
  };

  const setAudioLanguage = (lang: 'en' | 'hi') => {
    setAudioLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => getTranslation(language, key);
  const isRTL = language === 'ur';

  // Local storage hydrated states
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('storyverse_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('storyverse_current_user_id') || 'user-writer-1';
  });

  const currentUser = allUsers.find((u) => u.id === currentUserId) || allUsers[0];
  const [currentRole, setCurrentRole] = useState<UserRole>(currentUser.role);

  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeStoryId, setActiveStoryId] = useState<string>('story-1');
  const [activeChapterId, setActiveChapterId] = useState<string>('chap-1-1');

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('storyverse_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('storyverse_chapters');
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
  });

  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('storyverse_characters');
    return saved ? JSON.parse(saved) : INITIAL_CHARACTERS;
  });

  const [universes] = useState<StoryUniverse[]>(INITIAL_UNIVERSES);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reactions, setReactions] = useState<Reaction[]>(INITIAL_REACTIONS);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [storyPulse, setStoryPulse] = useState<StoryPulseData>(STORYPULSE_DATA);

  const pulseData: Record<string, StoryPulseData> = useMemo(() => ({
    [activeStoryId]: storyPulse,
    'story-1': storyPulse,
    'story-2': { ...storyPulse, completionRate: 84.1, readRatio: 70, listenRatio: 30 },
    'story-3': { ...storyPulse, completionRate: 89.2, readRatio: 55, listenRatio: 45 },
    'story-4': { ...storyPulse, completionRate: 92.0, readRatio: 60, listenRatio: 40 },
    'story-5': { ...storyPulse, completionRate: 86.5, readRatio: 65, listenRatio: 35 },
  }), [activeStoryId, storyPulse]);

  // Audio State with Thin & Attractive Voice defaults
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    storyId: null,
    activeStoryId: null,
    chapterId: null,
    activeChapterId: null,
    currentTime: 0,
    currentTimeSeconds: 0,
    duration: 480,
    durationSeconds: 480,
    playbackSpeed: 1,
    speed: 1,
    volume: 0.9,
    sleepTimer: null,
    isFullPlayerOpen: false,
    voiceStyle: 'Alluring Silk',
    thinnessModifier: 1.0,
    ambientShimmer: true,
  });

  // Reading preferences
  const [readingPrefs, setReadingPrefs] = useState<ReadingPreferences>({
    theme: 'light',
    fontSize: 19,
    lineSpacing: 1.75,
    fontFamily: 'editorial',
    isFocusMode: false,
  });

  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({
    'chap-1-1': 73,
    'chap-1-2a': 25,
  });

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Guided Walkthrough / Demo Mode state (supporting Demo Flow #32)
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('storyverse_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('storyverse_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('storyverse_characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('storyverse_users', JSON.stringify(allUsers));
    localStorage.setItem('storyverse_current_user_id', currentUserId);
  }, [allUsers, currentUserId]);

  // Audio engine time updater callback
  useEffect(() => {
    audioEngine.setCallbacks(
      (time, pct) => {
        const floored = Math.floor(time);
        setAudioState((prev) => ({
          ...prev,
          currentTime: floored,
          currentTimeSeconds: floored,
        }));
        if (audioState.chapterId) {
          setReadingProgress((prev) => ({
            ...prev,
            [audioState.chapterId!]: Math.round(pct),
          }));
        }
      },
      () => {
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      }
    );
  }, [audioState.chapterId]);

  // Translation & Localization Engine
  const getLocalizedStory = (story: Story, lang?: AppLanguage): Story => {
    const targetLang = (lang || readingLanguage) as 'en' | 'hi';
    if (targetLang === 'hi') {
      const hiTrans = story.translations?.hi || STORY_TRANSLATIONS[story.id]?.hi;
      if (hiTrans) {
        return {
          ...story,
          title: hiTrans.title || story.title,
          subtitle: hiTrans.subtitle || story.subtitle,
          description: hiTrans.description || story.description,
          tags: hiTrans.tags || story.tags,
        };
      }
      return {
        ...story,
        title: translateTextToHindi(story.title),
        subtitle: translateTextToHindi(story.subtitle),
        description: translateTextToHindi(story.description),
      };
    }
    const enTrans = story.translations?.en || STORY_TRANSLATIONS[story.id]?.en;
    if (enTrans) {
      return {
        ...story,
        title: enTrans.title || story.title,
        subtitle: enTrans.subtitle || story.subtitle,
        description: enTrans.description || story.description,
      };
    }
    return story;
  };

  const getLocalizedChapter = (chapter: Chapter, lang?: AppLanguage): Chapter => {
    const targetLang = (lang || readingLanguage) as 'en' | 'hi';
    if (targetLang === 'hi') {
      const hiTrans = chapter.translations?.hi || CHAPTER_TRANSLATIONS[chapter.id]?.hi;
      if (hiTrans) {
        const translatedDecisionPoint = hiTrans.decisionPoint
          ? {
              ...(chapter.decisionPoint || {}),
              prompt: hiTrans.decisionPoint.prompt,
              contextDescription: hiTrans.decisionPoint.contextDescription,
              choices: (chapter.decisionPoint?.choices || []).map((c) => {
                const tc = hiTrans.decisionPoint?.choices?.find((item) => item.id === c.id);
                return tc ? { ...c, text: tc.text } : c;
              }),
            } as DecisionPoint
          : chapter.decisionPoint;

        const translatedDecisionPoints = (chapter.decisionPoints || []).map((dp) => {
          const transDP = hiTrans.decisionPoints?.find((tdp) => tdp.id === dp.id);
          if (!transDP) return dp;
          return {
            ...dp,
            prompt: transDP.prompt,
            contextDescription: transDP.contextDescription,
            choices: dp.choices.map((c) => {
              const tc = transDP.choices?.find((item) => item.id === c.id);
              return tc ? { ...c, text: tc.text } : c;
            }),
          };
        });

        return {
          ...chapter,
          title: hiTrans.title || chapter.title,
          content: hiTrans.content || chapter.content,
          summary: hiTrans.summary || chapter.summary,
          decisionPoint: translatedDecisionPoint,
          decisionPoints:
            translatedDecisionPoints.length > 0
              ? translatedDecisionPoints
              : translatedDecisionPoint
              ? [translatedDecisionPoint]
              : [],
        };
      }

      return {
        ...chapter,
        title: translateTextToHindi(chapter.title),
        content: translateTextToHindi(chapter.content),
        summary: chapter.summary ? translateTextToHindi(chapter.summary) : undefined,
        decisionPoint: chapter.decisionPoint
          ? {
              ...chapter.decisionPoint,
              prompt: translateTextToHindi(chapter.decisionPoint.prompt),
              choices: chapter.decisionPoint.choices.map((c) => ({
                ...c,
                text: translateTextToHindi(c.text),
              })),
            }
          : undefined,
      };
    }

    return chapter;
  };

  const getLocalizedCharacter = (char: Character, lang?: AppLanguage): Character => {
    const targetLang = (lang || readingLanguage) as 'en' | 'hi';
    if (targetLang === 'hi') {
      const hiTrans = char.translations?.hi || CHARACTER_TRANSLATIONS[char.id]?.hi;
      if (hiTrans) {
        return {
          ...char,
          name: hiTrans.name || char.name,
          roleDescription: hiTrans.roleDescription || char.roleDescription,
          personality: hiTrans.personality || char.personality,
          occupation: hiTrans.occupation || char.occupation,
          appearance: hiTrans.appearance || char.appearance,
        };
      }
      return {
        ...char,
        name: translateTextToHindi(char.name),
        roleDescription: translateTextToHindi(char.roleDescription),
        personality: translateTextToHindi(char.personality),
      };
    }
    return char;
  };

  const toggleCommentTranslation = (commentId: string) => {
    setCommentTranslations((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const getLocalizedCommentText = (comment: Comment): { text: string; isTranslated: boolean } => {
    const isToggledOn = commentTranslations[comment.id];
    const shouldTranslate = isToggledOn !== undefined ? isToggledOn : language === 'hi';
    if (shouldTranslate) {
      const knownTrans = COMMENT_TRANSLATIONS[comment.id]?.hi;
      if (knownTrans) {
        return { text: knownTrans, isTranslated: true };
      }
      return { text: translateTextToHindi(comment.text), isTranslated: true };
    }
    return { text: comment.text, isTranslated: false };
  };

  const updateStoryTranslation = (
    storyId: string,
    lang: 'en' | 'hi',
    data: Partial<StoryTranslation>
  ) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== storyId) return s;
        const currentTrans = s.translations?.[lang] || STORY_TRANSLATIONS[storyId]?.[lang] || {
          title: s.title,
          subtitle: s.subtitle,
          description: s.description,
        };
        return {
          ...s,
          translations: {
            ...s.translations,
            [lang]: { ...currentTrans, ...data },
          },
        };
      })
    );
  };

  const updateChapterTranslation = (
    chapterId: string,
    lang: 'en' | 'hi',
    data: Partial<ChapterTranslation>
  ) => {
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id !== chapterId) return c;
        const currentTrans = c.translations?.[lang] || CHAPTER_TRANSLATIONS[chapterId]?.[lang] || {
          title: c.title,
          content: c.content,
        };
        return {
          ...c,
          translations: {
            ...c.translations,
            [lang]: { ...currentTrans, ...data },
          },
        };
      })
    );
  };

  const translateStory = async (storyId: string, targetLang: 'en' | 'hi' = 'hi') => {
    setIsTranslating(true);
    await new Promise((r) => setTimeout(r, 600));
    const story = stories.find((s) => s.id === storyId);
    if (story) {
      const trans: StoryTranslation = {
        title: translateTextToHindi(story.title),
        subtitle: translateTextToHindi(story.subtitle),
        description: translateTextToHindi(story.description),
        tags: story.tags.map((tag) => translateTextToHindi(tag)),
        audioAvailable: true,
      };
      updateStoryTranslation(storyId, targetLang, trans);
    }
    setIsTranslating(false);
  };

  const translateChapter = async (chapterId: string, targetLang: 'en' | 'hi' = 'hi') => {
    setIsTranslating(true);
    await new Promise((r) => setTimeout(r, 700));
    const chap = chapters.find((c) => c.id === chapterId);
    if (chap) {
      const trans: ChapterTranslation = {
        title: translateTextToHindi(chap.title),
        content: translateTextToHindi(chap.content),
        summary: chap.summary ? translateTextToHindi(chap.summary) : undefined,
        audioAvailable: true,
      };
      updateChapterTranslation(chapterId, targetLang, trans);
    }
    setIsTranslating(false);
  };

  const rawActiveStory = stories.find((s) => s.id === activeStoryId) || stories[0];
  const rawActiveChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  const activeStory = useMemo(() => {
    return rawActiveStory ? getLocalizedStory(rawActiveStory, readingLanguage) : undefined;
  }, [rawActiveStory, readingLanguage]);

  const activeChapter = useMemo(() => {
    return rawActiveChapter ? getLocalizedChapter(rawActiveChapter, readingLanguage) : undefined;
  }, [rawActiveChapter, readingLanguage]);

  const switchUser = (userId: string) => {
    const target = allUsers.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      setCurrentRole(target.role);
    }
  };

  const updateUserProfile = (updated: Partial<User>) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u))
    );
  };

  const updateReadingProgress = (chapterId: string, progressPct: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(progressPct)));
    setReadingProgress((prev) => ({
      ...prev,
      [chapterId]: clamped,
    }));
  };

  // Audio Control Methods (Thin & Attractive Voice System with Multilingual Support)
  const playChapterAudio = (
    storyId: string,
    chapterId: string,
    startPct = 0,
    overrideLang?: 'en' | 'hi'
  ) => {
    const targetLang = overrideLang || audioLanguage || (readingLanguage === 'hi' ? 'hi' : 'en');
    const chap = chapters.find((c) => c.id === chapterId);
    const localizedChap = chap ? getLocalizedChapter(chap, targetLang) : undefined;
    const duration = chap ? chap.audioDurationSeconds : 480;
    const textToSpeak = localizedChap ? localizedChap.content : '';
    const style = chap?.audioVoiceStyle || audioState.voiceStyle || 'Alluring Silk';
    const curTime = Math.floor((startPct / 100) * duration);

    audioEngine.playNarration({
      text: textToSpeak,
      style,
      language: targetLang,
      startPositionFraction: startPct / 100,
      durationSeconds: duration,
      speed: audioState.playbackSpeed,
    });

    setAudioState((prev) => ({
      ...prev,
      isPlaying: true,
      storyId,
      activeStoryId: storyId,
      chapterId,
      activeChapterId: chapterId,
      currentTime: curTime,
      currentTimeSeconds: curTime,
      duration,
      durationSeconds: duration,
      voiceStyle: style,
    }));
  };

  const switchAudioLanguage = (newLang: 'en' | 'hi') => {
    setAudioLanguageState(newLang);
    if (audioState.isPlaying && audioState.chapterId && audioState.storyId) {
      const currentProgressPct = (audioState.currentTime / (audioState.duration || 1)) * 100;
      playChapterAudio(audioState.storyId, audioState.chapterId, currentProgressPct, newLang);
    }
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('storyverse_language', lang);
    const targetContentLang: 'en' | 'hi' = lang === 'hi' ? 'hi' : 'en';
    setReadingLanguage(targetContentLang);
    switchAudioLanguage(targetContentLang);
  };

  const pauseAudio = () => {
    audioEngine.pause();
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  };

  const resumeAudio = () => {
    audioEngine.resume();
    setAudioState((prev) => ({ ...prev, isPlaying: true }));
  };

  const togglePlayPause = () => {
    if (audioState.isPlaying) {
      pauseAudio();
    } else {
      if (audioState.chapterId) {
        resumeAudio();
      } else if (activeChapter && activeStory) {
        playChapterAudio(activeStory.id, activeChapter.id, 0);
      }
    }
  };

  const seekAudio = (seconds: number) => {
    audioEngine.seek(seconds);
    setAudioState((prev) => ({
      ...prev,
      currentTime: seconds,
      currentTimeSeconds: seconds,
    }));
  };

  const setPlaybackSpeed = (speed: number) => {
    audioEngine.setSpeed(speed);
    setAudioState((prev) => ({
      ...prev,
      playbackSpeed: speed,
      speed: speed,
    }));
  };

  const setAudioSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const setVolume = (vol: number) => {
    setAudioState((prev) => ({ ...prev, volume: vol }));
  };

  const setAudioVolume = (vol: number) => {
    setVolume(vol);
  };

  const setVoiceStyle = (style: string) => {
    setAudioState((prev) => ({ ...prev, voiceStyle: style }));
    // If currently playing, update live narration style
    if (audioState.isPlaying && audioState.chapterId) {
      const currentProgressPct = (audioState.currentTime / (audioState.duration || 1)) * 100;
      playChapterAudio(
        audioState.storyId || activeStory.id,
        audioState.chapterId,
        currentProgressPct
      );
    }
  };

  const setVoiceThinness = (modifier: number) => {
    audioEngine.setCustomPitchModifier(modifier);
    setAudioState((prev) => ({ ...prev, thinnessModifier: modifier }));
  };

  const toggleAmbientShimmer = () => {
    const nextVal = !audioState.ambientShimmer;
    audioEngine.setAmbientShimmer(nextVal);
    setAudioState((prev) => ({ ...prev, ambientShimmer: nextVal }));
  };

  const previewVoiceSample = (style?: string) => {
    audioEngine.previewVoice(style || audioState.voiceStyle || 'Alluring Silk', audioLanguage);
  };

  const setSleepTimer = (minutes: number | null) => {
    setAudioState((prev) => ({ ...prev, sleepTimer: minutes }));
  };

  const toggleFullPlayer = (open?: boolean) => {
    setAudioState((prev) => ({
      ...prev,
      isFullPlayerOpen: open !== undefined ? open : !prev.isFullPlayerOpen,
    }));
  };

  // Read <-> Listen Synchronization
  const syncReadingToAudio = () => {
    if (!activeChapter) return;
    const currentProg = readingProgress[activeChapter.id] || 0;
    playChapterAudio(activeStory.id, activeChapter.id, currentProg);
  };

  const syncAudioToReading = () => {
    if (!audioState.chapterId) return;
    setActiveStoryId(audioState.storyId || 'story-1');
    setActiveChapterId(audioState.chapterId);
    const audioPct = Math.round((audioState.currentTime / audioState.duration) * 100);
    updateReadingProgress(audioState.chapterId, audioPct);
    setViewMode('read');
    toggleFullPlayer(false);
  };

  // Interactive Decisions & Branching
  const castVote = (chapterId: string, choiceId: string, decisionPointId?: string) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#7D2948', '#C47D5A', '#E8C547', '#2A4736'],
      });
    } catch {
      // safe fallback
    }

    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id !== chapterId) return chap;

        let updatedDecisionPoint = chap.decisionPoint;
        let updatedDecisionPoints = chap.decisionPoints;

        // If specific decisionPointId is passed or matching decisionPoint
        if (chap.decisionPoint && (!decisionPointId || chap.decisionPoint.id === decisionPointId)) {
          const dp = chap.decisionPoint;
          const updatedChoices = dp.choices.map((c) => {
            if (c.id === choiceId) return { ...c, voteCount: c.voteCount + 1 };
            return c;
          });
          const newTotal = dp.totalVotes + 1;
          const choicesWithPct = updatedChoices.map((c) => ({
            ...c,
            percentage: Math.round((c.voteCount / newTotal) * 100),
          }));
          updatedDecisionPoint = {
            ...dp,
            choices: choicesWithPct,
            totalVotes: newTotal,
            participantsCount: dp.participantsCount + 1,
            userVotedChoiceId: choiceId,
          };
        }

        // Also update in decisionPoints array if present
        if (chap.decisionPoints && chap.decisionPoints.length > 0) {
          updatedDecisionPoints = chap.decisionPoints.map((dp) => {
            if (decisionPointId ? dp.id === decisionPointId : dp.choices.some((c) => c.id === choiceId)) {
              const updatedChoices = dp.choices.map((c) => {
                if (c.id === choiceId) return { ...c, voteCount: c.voteCount + 1 };
                return c;
              });
              const newTotal = dp.totalVotes + 1;
              const choicesWithPct = updatedChoices.map((c) => ({
                ...c,
                percentage: Math.round((c.voteCount / newTotal) * 100),
              }));
              return {
                ...dp,
                choices: choicesWithPct,
                totalVotes: newTotal,
                participantsCount: dp.participantsCount + 1,
                userVotedChoiceId: choiceId,
              };
            }
            return dp;
          });
        }

        return {
          ...chap,
          decisionPoint: updatedDecisionPoint,
          decisionPoints: updatedDecisionPoints,
        };
      })
    );

    // Update writer StoryPulse votes
    setStoryPulse((prev) => ({
      ...prev,
      votesCount: prev.votesCount + 1,
    }));
  };

  const voteSpinOffIntoCanon = (storyId: string) => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7D2948', '#10B981', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== storyId) return s;
        const currentVotes = s.canonVotesCount || 0;
        const newVotes = currentVotes + 1;
        const threshold = s.canonVotesThreshold || 1000;
        const isNowCanon = newVotes >= threshold;

        if (isNowCanon && s.canonStatus !== 'voted_canon') {
          // Add notification for achieving official canon
          const newNotif: NotificationItem = {
            id: `notif-canon-${Date.now()}`,
            type: 'milestone',
            title: '🎉 Spin-Off Voted Into Canon!',
            message: `"${s.title}" has reached ${newVotes.toLocaleString()} community votes and has officially been canonized into the story universe!`,
            timestamp: 'Just now',
            read: false,
            storyId: s.id,
          };
          setNotifications((notifs) => [newNotif, ...notifs]);
        }

        return {
          ...s,
          canonVotesCount: newVotes,
          canonStatus: isNowCanon ? 'voted_canon' : s.canonStatus || 'candidate',
          spinOffType: isNowCanon ? 'official' : s.spinOffType || 'community',
        };
      })
    );
  };

  const createSpinOff = (data: {
    originalStoryId: string;
    title: string;
    subtitle?: string;
    description: string;
    forkedFromChapterId?: string;
    forkedFromDecisionText?: string;
    content: string;
  }): Story => {
    const parentStory = stories.find((s) => s.id === data.originalStoryId);
    const newStoryId = `spinoff-${Date.now()}`;
    const newChapterId = `chap-${newStoryId}-1`;

    const newStory: Story = {
      id: newStoryId,
      title: data.title,
      subtitle: data.subtitle || 'Competitive Community Spin-off',
      description: data.description,
      coverImage:
        parentStory?.coverImage ||
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=80',
      authorId: currentUser.id,
      authorName: `${currentUser.name} (Community)`,
      authorAvatar: currentUser.avatar,
      genre: parentStory?.genre || 'Mystery',
      moods: parentStory?.moods || ['Suspenseful'],
      tags: ['Spin-off', 'Canon Contender', 'Community Branch'],
      language: 'English',
      ageRating: 'Teen (13+)',
      status: 'published',
      readersCount: 1,
      listenersCount: 0,
      likesCount: 1,
      rating: 5.0,
      estimatedReadingTime: Math.max(1, Math.round((data.content || '').split(/\s+/).length / 200)),
      estimatedListeningTime: Math.max(1, Math.round((data.content || '').split(/\s+/).length / 150)),
      isInteractive: true,
      rootChapterId: newChapterId,
      chaptersCount: 1,
      universeId: parentStory?.universeId || 'univ-1',
      universeTitle: parentStory?.universeTitle || 'StoryVerse Universe',
      spinOffType: 'community',
      canonStatus: 'candidate',
      canonVotesCount: 1,
      canonVotesThreshold: 1000,
      originalStoryId: data.originalStoryId,
      forkedFromChapterId: data.forkedFromChapterId,
      forkedFromDecisionText: data.forkedFromDecisionText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newChapter: Chapter = {
      id: newChapterId,
      storyId: newStoryId,
      title: 'Chapter 1: The Divergent Path',
      chapterNumber: 1,
      content: data.content,
      readingTimeMinutes: Math.max(1, Math.round((data.content || '').split(/\s+/).length / 200)),
      audioDurationSeconds: Math.max(60, Math.round((data.content || '').split(/\s+/).length / 2.5)),
      audioVoiceStyle: 'Dramatic',
      audioGenerated: true,
      branchType: 'spin_off',
      parentChapterId: data.forkedFromChapterId,
      completionRate: 100,
      status: 'published',
      createdAt: new Date().toISOString(),
      decisionPoint: {
        id: `dec-${newChapterId}`,
        chapterId: newChapterId,
        prompt: 'Where should this competitive spin-off journey venture next?',
        contextDescription: 'The community decides the next chapter of this community-authored branch.',
        status: 'active',
        closesAt: new Date(Date.now() + 86400000 * 5).toISOString(),
        totalVotes: 1,
        participantsCount: 1,
        choices: [
          { id: 'c1', text: 'Follow the secret cipher in the margins', voteCount: 1, percentage: 100 },
          { id: 'c2', text: 'Confront the silent messenger head-on', voteCount: 0, percentage: 0 },
        ],
      },
    };

    setStories((prev) => [newStory, ...prev]);
    setChapters((prev) => [...prev, newChapter]);
    setActiveStoryId(newStoryId);
    setActiveChapterId(newChapterId);
    setViewMode('story_details');

    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // safe fallback
    }

    return newStory;
  };

  const simulateCommunityVotingPulse = (chapterId: string) => {
    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id !== chapterId || !chap.decisionPoint) return chap;
        const dp = chap.decisionPoint;
        // Add 120 simulated votes with 64% majority on choice 1
        const add1 = 78;
        const add2 = 28;
        const add3 = 14;
        const updatedChoices = dp.choices.map((c, idx) => {
          const added = idx === 0 ? add1 : idx === 1 ? add2 : add3;
          return { ...c, voteCount: c.voteCount + added };
        });
        const newTotal = updatedChoices.reduce((sum, c) => sum + c.voteCount, 0);
        const choicesWithPct = updatedChoices.map((c) => ({
          ...c,
          percentage: Math.round((c.voteCount / newTotal) * 100),
        }));

        return {
          ...chap,
          decisionPoint: {
            ...dp,
            choices: choicesWithPct,
            totalVotes: newTotal,
            participantsCount: newTotal,
          },
        };
      })
    );
  };

  const closeDecision = (chapterId: string, winningChoiceId: string) => {
    setChapters((prev) =>
      prev.map((chap) => {
        if (chap.id !== chapterId || !chap.decisionPoint) return chap;
        return {
          ...chap,
          winningChoiceId,
          decisionPoint: {
            ...chap.decisionPoint,
            status: 'closed',
            winningChoiceId,
          },
        };
      })
    );
  };

  const createChapterFromWinningChoice = (chapterId: string, choiceText: string): Chapter => {
    const parent = chapters.find((c) => c.id === chapterId);
    const chapterNum = (parent ? parent.chapterNumber : 1) + 1;
    const newId = `chap-${activeStoryId}-${chapterNum}-community-${Date.now()}`;
    const newTitle = `Chapter ${chapterNum}: Beyond the Door`;

    const newChapter: Chapter = {
      id: newId,
      storyId: activeStoryId,
      title: newTitle,
      chapterNumber: chapterNum,
      content: `The heavy oak gave way under Aria's palm as the community's choice echoed in the silent vault.

Cold air, carrying the scent of ancient ozone and wet black marble, surged through the threshold. The key in her hand turned white-hot for a fleeting second, then cooled to the temperature of river ice.

"You chose to open it," a voice whispered from the depths beyond the archway. It was not threatening, but vast—like words spoken into a cathedral nave after midnight.

Before her, a spiral staircase of polished basalt descended into a sunken amphitheater of bookshelves, their leather bindings glowing with faint bioluminescent phosphorus.

Every choice leaves a footprint in the masonry. And now, the true labyrinth begins.`,
      readingTimeMinutes: 9,
      audioDurationSeconds: 540,
      audioVoiceStyle: 'Dramatic',
      audioGenerated: true,
      branchType: 'community_choice',
      parentChapterId: chapterId,
      parentChoiceId: parent?.decisionPoint?.winningChoiceId,
      completionRate: 0,
      status: 'published',
      createdAt: new Date().toISOString(),
      summary: `Continued after community voted: "${choiceText}"`,
      decisionPoint: {
        id: `dec-${newId}`,
        chapterId: newId,
        prompt: 'Should Aria light her lantern or follow the bioluminescent phosphorus path?',
        contextDescription: 'The darkness below is deep. The phosphorus markings trace a clear line toward the center, but the shadows whisper.',
        status: 'active',
        closesAt: new Date(Date.now() + 86400000 * 3).toISOString(),
        totalVotes: 42,
        participantsCount: 42,
        choices: [
          {
            id: 'c1',
            text: 'Follow the bioluminescent trail barefoot',
            voteCount: 28,
            percentage: 67,
          },
          {
            id: 'c2',
            text: 'Light the kerosene lantern despite the warning',
            voteCount: 14,
            percentage: 33,
          },
        ],
      },
    };

    setChapters((prev) => [...prev, newChapter]);

    // Send notification to reader
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'new_chapter',
      title: 'New Chapter Published by Aisha Khan',
      message: `Chapter ${chapterNum}: Beyond the Door has been created following your community vote to "${choiceText}".`,
      timestamp: 'Just now',
      read: false,
      storyId: activeStoryId,
      chapterId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newChapter;
  };

  // Story Creation & Edits
  const createNewStory = (newStoryData: Partial<Story>): Story => {
    const id = `story-${Date.now()}`;
    const rootChapterId = `chap-${id}-1`;

    const initialRootChapter: Chapter = {
      id: rootChapterId,
      storyId: id,
      title: 'Chapter 1: The First Step',
      chapterNumber: 1,
      content: newStoryData.description || 'Write your opening lines here...',
      readingTimeMinutes: 5,
      audioDurationSeconds: 300,
      audioVoiceStyle: 'Storyteller',
      audioGenerated: true,
      branchType: 'main',
      completionRate: 100,
      status: 'published',
      createdAt: new Date().toISOString(),
    };

    const fullStory: Story = {
      id,
      title: newStoryData.title || 'Untitled Story',
      subtitle: newStoryData.subtitle || 'An interactive journey',
      description: newStoryData.description || 'A story where readers shape destiny.',
      coverImage:
        newStoryData.coverImage ||
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      genre: newStoryData.genre || 'Mystery',
      subgenre: newStoryData.subgenre || 'Interactive Fiction',
      moods: newStoryData.moods || ['Suspenseful', 'Dark'],
      tags: newStoryData.tags || ['Interactive', 'Original', 'Branching'],
      language: newStoryData.language || 'English',
      contentWarning: newStoryData.contentWarning,
      ageRating: newStoryData.ageRating || 'Teen (13+)',
      status: newStoryData.status || 'draft',
      readersCount: 1,
      listenersCount: 0,
      likesCount: 0,
      rating: 5.0,
      estimatedReadingTime: 5,
      estimatedListeningTime: 6,
      isInteractive: true,
      rootChapterId,
      chaptersCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setStories((prev) => [fullStory, ...prev]);
    setChapters((prev) => [...prev, initialRootChapter]);
    setActiveStoryId(id);
    setActiveChapterId(rootChapterId);
    return fullStory;
  };

  const updateStory = (storyId: string, updates: Partial<Story>) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
  };

  const createChapter = (chapterData: Partial<Chapter>): Chapter => {
    const chapterId = `chap-${activeStoryId}-${Date.now()}`;
    const newChap: Chapter = {
      id: chapterId,
      storyId: activeStoryId,
      title: chapterData.title || 'Untitled Chapter',
      chapterNumber: chapterData.chapterNumber || (chapters.filter((c) => c.storyId === activeStoryId).length + 1),
      content: chapterData.content || '',
      readingTimeMinutes: Math.ceil((chapterData.content?.split(' ').length || 100) / 200),
      audioDurationSeconds: Math.ceil((chapterData.content?.split(' ').length || 100) / 2.5),
      audioVoiceStyle: chapterData.audioVoiceStyle || 'Storyteller',
      audioGenerated: true,
      branchType: chapterData.branchType || 'main',
      parentChapterId: chapterData.parentChapterId,
      parentChoiceId: chapterData.parentChoiceId,
      completionRate: 0,
      status: chapterData.status || 'draft',
      createdAt: new Date().toISOString(),
      summary: chapterData.summary,
      decisionPoint: chapterData.decisionPoint,
    };

    setChapters((prev) => [...prev, newChap]);
    setStories((prev) =>
      prev.map((s) => (s.id === activeStoryId ? { ...s, chaptersCount: s.chaptersCount + 1 } : s))
    );
    return newChap;
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, ...updates } : c))
    );
  };

  const updateChapterContent = (chapterId: string, title: string, content: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, title, content } : c))
    );
  };

  const setChapterDecisionPoint = (chapterId: string, decisionPoint: DecisionPoint | undefined) => {
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id !== chapterId) return c;
        const currentPoints = c.decisionPoints || [];
        const filtered = decisionPoint ? currentPoints.filter((dp) => dp.id !== decisionPoint.id) : [];
        const nextPoints = decisionPoint ? [...filtered, decisionPoint] : [];
        return {
          ...c,
          decisionPoint,
          decisionPoints: nextPoints.length > 0 ? nextPoints : (decisionPoint ? [decisionPoint] : []),
        };
      })
    );
  };

  const setChapterDecisionPoints = (chapterId: string, decisionPoints: DecisionPoint[]) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              decisionPoints,
              decisionPoint: decisionPoints[0] || undefined,
            }
          : c
      )
    );
  };

  const createCharacter = (charData: Partial<Character>): Character => {
    const newChar: Character = {
      id: `char-${Date.now()}`,
      storyId: activeStoryId,
      name: charData.name || 'New Character',
      age: charData.age || 25,
      description: charData.description || '',
      personality: charData.personality || ['Intrepid', 'Mysterious'],
      appearance: charData.appearance || 'Sharp dark coat with amber eyes.',
      occupation: charData.occupation || 'Wanderer',
      relationships: charData.relationships || [],
      avatar:
        charData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      voiceStyle: charData.voiceStyle || 'Calm, measured storyteller voice',
    };
    setCharacters((prev) => [...prev, newChar]);
    return newChar;
  };

  const updateCharacter = (charId: string, updates: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === charId ? { ...c, ...updates } : c))
    );
  };

  const deleteCharacter = (charId: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== charId));
  };

  // Reactions & Comments
  const addReaction = (reactionData: Omit<Reaction, 'id' | 'createdAt'>) => {
    const newReact: Reaction = {
      ...reactionData,
      id: `react-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReactions((prev) => [newReact, ...prev]);
    setStoryPulse((prev) => ({ ...prev, reactionsCount: prev.reactionsCount + 1 }));
  };

  const addComment = (commentData: Omit<Comment, 'id' | 'timestamp' | 'likes'>) => {
    const newComment: Comment = {
      ...commentData,
      id: `comm-${Date.now()}`,
      timestamp: 'Just now',
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    setStoryPulse((prev) => ({ ...prev, commentsCount: prev.commentsCount + 1 }));
  };

  const toggleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
          : c
      )
    );
  };

  const toggleSpoiler = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, revealed: !c.revealed } : c))
    );
  };

  // Bookmarking & Social
  const toggleBookmark = (storyId: string) => {
    const isBookmarked = currentUser.bookmarks.includes(storyId);
    const updatedBookmarks = isBookmarked
      ? currentUser.bookmarks.filter((id) => id !== storyId)
      : [...currentUser.bookmarks, storyId];

    updateUserProfile({ bookmarks: updatedBookmarks });
  };

  const toggleFollowAuthor = (authorId: string) => {
    const isFav = currentUser.favoriteAuthors.includes(authorId);
    const updated = isFav
      ? currentUser.favoriteAuthors.filter((a) => a !== authorId)
      : [...currentUser.favoriteAuthors, authorId];
    updateUserProfile({ favoriteAuthors: updated });
  };

  const toggleLikeStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, likesCount: s.likesCount + 1 } : s))
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  // Demo walkthrough helpers
  const advanceDemoStep = () => {
    setDemoStep((prev) => Math.min(18, prev + 1));
  };

  const resetDemoState = () => {
    setDemoStep(1);
    setIsDemoMode(false);
  };

  return (
    <StoryVerseContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL,
        readingLanguage,
        setReadingLanguage,
        audioLanguage,
        setAudioLanguage,
        switchAudioLanguage,
        getLocalizedStory,
        getLocalizedChapter,
        getLocalizedCharacter,
        translateStory,
        translateChapter,
        isTranslating,
        commentTranslations,
        toggleCommentTranslation,
        getLocalizedCommentText,
        updateStoryTranslation,
        updateChapterTranslation,
        currentUser,
        allUsers,
        currentRole,
        setCurrentRole,
        switchUser,
        updateUserProfile,
        viewMode,
        setViewMode,
        activeStoryId,
        setActiveStoryId,
        activeChapterId,
        setActiveChapterId,
        stories,
        chapters,
        characters,
        universes,
        challenges,
        achievements,
        notifications,
        reactions,
        comments,
        storyPulse,
        pulseData,
        activeStory,
        activeChapter,
        createNewStory,
        updateStory,
        createChapter,
        updateChapter,
        updateChapterContent,
        setChapterDecisionPoint,
        setChapterDecisionPoints,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        castVote,
        simulateCommunityVotingPulse,
        closeDecision,
        createChapterFromWinningChoice,
        voteSpinOffIntoCanon,
        createSpinOff,
        readingPrefs,
        setReadingPrefs,
        readingProgress,
        updateReadingProgress,
        addReaction,
        addComment,
        toggleCommentLike,
        toggleSpoiler,
        audioState,
        playChapterAudio,
        pauseAudio,
        resumeAudio,
        togglePlayPause,
        seekAudio,
        setPlaybackSpeed,
        setAudioSpeed,
        setVolume,
        setAudioVolume,
        setSleepTimer,
        toggleFullPlayer,
        setVoiceStyle,
        setVoiceThinness,
        toggleAmbientShimmer,
        previewVoiceSample,
        syncReadingToAudio,
        syncAudioToReading,
        toggleBookmark,
        toggleFollowAuthor,
        toggleLikeStory,
        markNotificationRead,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isDemoMode,
        setIsDemoMode,
        demoStep,
        setDemoStep,
        advanceDemoStep,
        resetDemoState,
      }}
    >
      {children}
    </StoryVerseContext.Provider>
  );
};

export const useStoryVerse = () => {
  const context = useContext(StoryVerseContext);
  if (!context) {
    throw new Error('useStoryVerse must be used within a StoryVerseProvider');
  }
  return context;
};
