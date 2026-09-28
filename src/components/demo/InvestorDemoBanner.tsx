import React from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

export const InvestorDemoBanner: React.FC = () => {
  const {
    isDemoMode,
    setIsDemoMode,
    demoStep,
    setDemoStep,
    nextDemoStep,
    prevDemoStep,
  } = useStoryVerse();

  if (!isDemoMode) return null;

  const demoStepsDescriptions: { [key: number]: { title: string; desc: string } } = {
    1: {
      title: 'Step 1: Discover StoryVerse',
      desc: 'Interactive storytelling landing page demonstrating the reader/writer cycle.',
    },
    2: {
      title: 'Step 2: Writer Persona',
      desc: 'Signed in as Aisha Khan (Author of "The Last Door").',
    },
    3: {
      title: 'Step 3: Writer Studio',
      desc: 'Accessing professional dashboard, metrics, and chapter drafts.',
    },
    4: {
      title: 'Step 4: Story Architecture',
      desc: 'Selecting "The Last Door" interactive mystery project.',
    },
    5: {
      title: 'Step 5: Distraction-Free Studio',
      desc: 'Author writing Chapter 1 prose with word counts and character drawers.',
    },
    6: {
      title: 'Step 6: Insert Decision Point',
      desc: 'Cliffhanger voting options inserted: Open door, Walk away, Call Daniel.',
    },
    7: {
      title: 'Step 7: Publishing to Ecosystem',
      desc: 'Chapter 1 published live with voice narration and interactive poll.',
    },
    8: {
      title: 'Step 8: Switch to Reader',
      desc: 'Persona switched to Elena Vance (Active community reader & listener).',
    },
    9: {
      title: 'Step 9: Personalized Discovery',
      desc: 'Browsing stories filtered by Suspenseful mood and 15-min reading time.',
    },
    10: {
      title: 'Step 10: Inspect Story Overview',
      desc: 'Reviewing artwork, characters, chapters, and community spin-offs.',
    },
    11: {
      title: 'Step 11: Immersive Reading Mode',
      desc: 'Distraction-free reading with passage reactions and progress tracking.',
    },
    12: {
      title: 'Step 12: Seamless Read-to-Listen Hand-off',
      desc: 'Audio engine synchronizes narration right from the current paragraph.',
    },
    13: {
      title: 'Step 13: Arrive at The Decision',
      desc: 'Reader encounters the suspended cliffhanger decision point.',
    },
    14: {
      title: 'Step 14: Reader Casts Vote',
      desc: 'Elena votes for "Open the door" (61% winning path).',
    },
    15: {
      title: 'Step 15: Community Voting Surge',
      desc: 'Simulating 120 community votes with real-time percentage adjustments.',
    },
    16: {
      title: 'Step 16: Switch Back to Writer',
      desc: 'Returning to Aisha Khan to review the community decision results.',
    },
    17: {
      title: 'Step 17: StoryPulse Narrative Analytics',
      desc: 'Author inspects drop-off curves, most reacted moments, and poll results.',
    },
    18: {
      title: 'Step 18: Canonize Winning Branch & Story Tree',
      desc: 'Writer reviews updated interactive Story Tree showing Chapter 2 unlocked!',
    },
  };

  const currentInfo = demoStepsDescriptions[demoStep] || demoStepsDescriptions[1];

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-[#1E1B18] text-white border-b-2 border-amber-500 shadow-2xl py-2.5 px-4 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Step Info */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-xs shrink-0">
            {demoStep}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-amber-400">
                {currentInfo.title}
              </span>
              <span className="text-[10px] text-neutral-400">({demoStep}/18)</span>
            </div>
            <p className="text-xs text-neutral-300 line-clamp-1">{currentInfo.desc}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={prevDemoStep}
            disabled={demoStep === 1}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 text-xs transition-colors cursor-pointer"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id="demo-next-step-btn"
            onClick={nextDemoStep}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>{demoStep === 18 ? 'Restart Demo' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsDemoMode(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Exit demo walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
