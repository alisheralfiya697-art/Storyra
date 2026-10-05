export type Language = 'en' | 'hi';

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  genre: string;
  coverImage: string;
  rating: number;
  readersCount: number;
  listenersCount: number;
  likesCount: number;
  estimatedReadingTime: number;
  estimatedListeningTime: number;
  isInteractive: boolean;
  rootChapterId: string;
  chaptersCount: number;
  canonStatus?: 'official' | 'candidate' | 'voted_canon';
  canonVotesCount?: number;
  tags: string[];
}

export interface Choice {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
}

export interface DecisionPoint {
  id: string;
  prompt: string;
  choices: Choice[];
  totalVotes: number;
  userVotedChoiceId?: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  chapterNumber: number;
  content: string;
  readingTimeMinutes: number;
  audioDurationSeconds: number;
  audioVoiceStyle?: string;
  decisionPoint?: DecisionPoint;
}

export interface Comment {
  id: string;
  storyId: string;
  chapterId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'reader' | 'writer' | 'admin';
  bookmarks: string[];
}
