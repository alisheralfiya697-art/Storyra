import { Story, Chapter, Comment } from '../types';

export const INITIAL_MOBILE_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'The Last Door',
    subtitle: 'Every key has a consequence. Which room will you unlock?',
    description: 'In the ancestral manor of Blackwood Hall, Aria discovers a corridor with numbered doors that shift positions nightly. When door seven unlocks on a blood moon, she is faced with an impossible ultimatum.',
    authorId: 'user-1',
    authorName: 'Evelyn Cross',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    genre: 'Mystery',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    rating: 4.92,
    readersCount: 24890,
    listenersCount: 14120,
    likesCount: 3840,
    estimatedReadingTime: 28,
    estimatedListeningTime: 36,
    isInteractive: true,
    rootChapterId: 'chap-1-1',
    chaptersCount: 5,
    canonStatus: 'official',
    tags: ['mystery', 'interactive', 'thriller'],
  },
  {
    id: 'story-2',
    title: 'Echoes of the Obsidian Spire',
    subtitle: 'Magic is not learned. It is inherited through blood debt.',
    description: 'High above the shattered sky-islands of Zephyria, Kael guards the Obsidian Spire. When an unauthorized airship crashes onto the lower platform, the pilot bears the imperial crest of a dynasty presumed dead.',
    authorId: 'user-2',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    genre: 'Fantasy',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    rating: 4.88,
    readersCount: 19450,
    listenersCount: 11200,
    likesCount: 2910,
    estimatedReadingTime: 34,
    estimatedListeningTime: 42,
    isInteractive: true,
    rootChapterId: 'chap-2-1',
    chaptersCount: 4,
    canonStatus: 'official',
    tags: ['fantasy', 'magic', 'adventure'],
  },
];

export const INITIAL_MOBILE_CHAPTERS: Record<string, Chapter> = {
  'chap-1-1': {
    id: 'chap-1-1',
    storyId: 'story-1',
    title: 'Part 1: The Wax Seal',
    chapterNumber: 1,
    content: `The grandfather clock in Blackwood Hall struck midnight with a dull, hollow groan that vibrated through the floorboards. Aria stood at the foot of the grand mahogany staircase, her fingers brushing the brass key in her pocket.

It was warm. Keys made of iron or brass should not radiate body heat, yet this one throbbed with a gentle, hypnotic pulse against her palm.

She ascended the staircase slowly, counting every tread. At the landing, the gallery hallway stretched into darkness. Here was where the anomaly occurred. By daylight, the corridor ended at a large portrait of Lord Archibald Blackwood. Tonight, as the clock's twelve chimes died away, the wall dissolved into shadow, revealing an eleventh archway that had never appeared in the mansion's blueprints.

A heavy oak door stood within the arch, bound in blackened iron and sealed with a medallion of red wax. On the seal was stamped a crest she had never seen: an ouroboros swallowing a skeleton key.

Behind the wood, she heard it. Not the wind. Not mice in the wainscoting. A human breath, measured and trembling.

Then, a whisper through the keyhole:
"Aria... do not turn the key until you are prepared to choose whose life ends tonight."`,
    readingTimeMinutes: 5,
    audioDurationSeconds: 320,
    audioVoiceStyle: 'Alluring Silk',
    decisionPoint: {
      id: 'dp-1-1',
      prompt: 'What should Aria do at the door?',
      choices: [
        { id: 'c1', text: 'Break the wax seal and turn the key', voteCount: 1840, percentage: 56 },
        { id: 'c2', text: 'Demand the voice identify itself through the keyhole', voteCount: 980, percentage: 30 },
        { id: 'c3', text: 'Retreat and alert Uncle Julian', voteCount: 460, percentage: 14 },
      ],
      totalVotes: 3280,
    },
  },
};

export const StoryVerseAPI = {
  async getStories(): Promise<Story[]> {
    return INITIAL_MOBILE_STORIES;
  },

  async getStoryById(id: string): Promise<Story | undefined> {
    return INITIAL_MOBILE_STORIES.find((s) => s.id === id);
  },

  async getChapterById(chapterId: string): Promise<Chapter | undefined> {
    return INITIAL_MOBILE_CHAPTERS[chapterId] || INITIAL_MOBILE_CHAPTERS['chap-1-1'];
  },

  async castVote(chapterId: string, choiceId: string): Promise<void> {
    // In production, hits POST /api/chapters/:id/vote
    const chap = INITIAL_MOBILE_CHAPTERS[chapterId];
    if (chap?.decisionPoint) {
      chap.decisionPoint.userVotedChoiceId = choiceId;
    }
  },
};
