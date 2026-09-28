export type UserRole = 'writer' | 'reader' | 'both';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  totalStories: number;
  totalReaders: number;
  totalListeners: number;
  publishedStories: string[];
  drafts: string[];
  readingHistory: { storyId: string; chapterId: string; progress: number; lastAccessed: string }[];
  listeningHistory: { storyId: string; chapterId: string; timestamp: number; lastAccessed: string }[];
  bookmarks: string[];
  favoriteStories: string[];
  favoriteAuthors: string[];
  votesMade: number;
  writingStreak: number;
  readingStreak: number;
  achievements: string[];
  createdAt: string;
}

export type Genre =
  | 'Romance'
  | 'Fantasy'
  | 'Mystery'
  | 'Thriller'
  | 'Horror'
  | 'Sci-Fi'
  | 'Comedy'
  | 'Drama'
  | 'Adventure'
  | 'Historical'
  | 'Young Adult'
  | 'Short Stories';

export type Mood =
  | 'Romantic'
  | 'Emotional'
  | 'Funny'
  | 'Dark'
  | 'Suspenseful'
  | 'Scary'
  | 'Inspirational'
  | 'Adventure'
  | 'Magical';

export interface DecisionChoice {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
  leadsToChapterId?: string;
}

export interface DecisionChoiceTranslation {
  id: string;
  text: string;
}

export interface DecisionPointTranslation {
  id: string;
  prompt: string;
  contextDescription: string;
  choices: DecisionChoiceTranslation[];
}

export interface ChapterTranslation {
  title: string;
  content: string;
  summary?: string;
  audioNarrationScript?: string;
  audioAvailable?: boolean;
  audioDurationSeconds?: number;
  decisionPoint?: DecisionPointTranslation;
  decisionPoints?: DecisionPointTranslation[];
}

export interface StoryTranslation {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  synopsis?: string;
  audioAvailable?: boolean;
}

export interface CharacterTranslation {
  name: string;
  description: string;
  personality: string[];
  appearance: string;
  occupation: string;
}

export interface DecisionPoint {
  id: string;
  chapterId: string;
  prompt: string;
  contextDescription: string;
  choices: DecisionChoice[];
  status: 'active' | 'closed';
  closesAt: string;
  winningChoiceId?: string;
  totalVotes: number;
  participantsCount: number;
  userVotedChoiceId?: string;
}

export interface Scene {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  chapterNumber: number;
  content: string;
  readingTimeMinutes: number;
  audioDurationSeconds: number;
  audioVoiceStyle:
    | 'Calm'
    | 'Dramatic'
    | 'Emotional'
    | 'Suspenseful'
    | 'Storyteller'
    | 'Alluring Silk'
    | 'Airy Siren'
    | 'Crystal Velvet'
    | 'Gentle Melodic'
    | 'Dramatic Shimmer';
  audioGenerated: boolean;
  scenes?: Scene[];
  decisionPoint?: DecisionPoint;
  decisionPoints?: DecisionPoint[]; // Multiple plot decision polls per chapter
  branchType: 'main' | 'alternative' | 'community_choice' | 'spin_off';
  parentChapterId?: string;
  parentChoiceId?: string;
  winningChoiceId?: string;
  completionRate: number;
  status: 'published' | 'draft' | 'scheduled';
  createdAt: string;
  summary?: string;
  originalLanguage?: 'en' | 'hi' | string;
  translations?: {
    en?: ChapterTranslation;
    hi?: ChapterTranslation;
    [lang: string]: ChapterTranslation | undefined;
  };
}

export interface Character {
  id: string;
  storyId: string;
  name: string;
  age: number | string;
  description: string;
  personality: string[];
  appearance: string;
  occupation: string;
  relationships: { characterName: string; relationship: string }[];
  avatar: string;
  voiceStyle: string;
  translations?: {
    en?: CharacterTranslation;
    hi?: CharacterTranslation;
    [lang: string]: CharacterTranslation | undefined;
  };
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  genre: Genre;
  subgenre?: string;
  moods: Mood[];
  tags: string[];
  language: string;
  originalLanguage?: 'en' | 'hi' | string;
  translations?: {
    en?: StoryTranslation;
    hi?: StoryTranslation;
    [lang: string]: StoryTranslation | undefined;
  };
  contentWarning?: string;
  ageRating: 'All Ages' | 'Teen (13+)' | 'Mature (18+)';
  status: 'published' | 'draft' | 'scheduled';
  readersCount: number;
  listenersCount: number;
  likesCount: number;
  rating: number;
  estimatedReadingTime: number; // minutes
  estimatedListeningTime: number; // minutes
  isInteractive: boolean;
  rootChapterId: string;
  chaptersCount: number;
  universeId?: string;
  universeTitle?: string;
  spinOffType?: 'official' | 'alternative' | 'community' | 'fan';
  originalStoryId?: string;
  canonStatus?: 'canonical' | 'candidate' | 'voted_canon';
  canonVotesCount?: number;
  canonVotesThreshold?: number;
  forkedFromChapterId?: string;
  forkedFromDecisionText?: string;
  createdAt: string;
  updatedAt: string;
  isSaved?: boolean;
  isFollowingAuthor?: boolean;
}

export interface Reaction {
  id: string;
  storyId: string;
  chapterId: string;
  type: 'heart' | 'cry' | 'gasp' | 'laugh' | 'fire' | 'mindblown';
  selectedText?: string;
  paragraphIndex?: number;
  timestampSeconds?: number;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  storyId: string;
  chapterId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  isSpoiler: boolean;
  revealed?: boolean;
  paragraphIndex?: number;
  timestampAudio?: string;
  replies?: Comment[];
}

export interface StoryUniverse {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  authorName: string;
  stories: {
    storyId: string;
    title: string;
    order: number;
    label: 'Main Story' | 'Alternative Ending' | 'Community Spin-off' | 'Sequel';
    description: string;
    readers: number;
  }[];
}

export interface Challenge {
  id: string;
  title: string;
  prompt: string;
  wordLimit: number;
  deadline: string;
  daysRemaining: number;
  entriesCount: number;
  prize: string;
  status: 'active' | 'completed';
  featuredWriter: { name: string; avatar: string; storyTitle: string; votes: number };
  leaderboard: { rank: number; author: string; title: string; votes: number; avatar: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'writer' | 'reader';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  dateUnlocked?: string;
}

export interface NotificationItem {
  id: string;
  type: 'vote_start' | 'vote_end' | 'new_chapter' | 'author_published' | 'comment' | 'reply' | 'like' | 'challenge' | 'milestone';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  storyId?: string;
  chapterId?: string;
}

export interface StoryPulseData {
  totalReaders: number;
  totalListeners: number;
  completionRate: number;
  averageReadingTimeMinutes: number;
  averageListeningTimeMinutes: number;
  votesCount: number;
  commentsCount: number;
  reactionsCount: number;
  bookmarksCount: number;
  followersGained: number;
  readRatio: number; // e.g. 63%
  listenRatio: number; // e.g. 37%
  chapterEngagement: { chapterNumber: number; title: string; completionRate: number; readers: number }[];
  popularDecision: { prompt: string; choiceA: string; pctA: number; choiceB: string; pctB: number; totalVotes: number };
  mostReactedMoment: { chapterNumber: number; timestamp: string; reactionCount: number; emoji: string; quote: string };
  mostPopularCharacter: { name: string; avatar: string; mentions: number; approvalRate: number };
  mostHighlightedSentence: { quote: string; chapterNumber: number; highlightsCount: number };
  retentionInsight: string;
}
