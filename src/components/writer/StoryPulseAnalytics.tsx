import React from 'react';
import {
  BarChart3,
  ArrowLeft,
  Users,
  Vote,
  Sparkles,
  Heart,
  Highlighter,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Award,
  BookOpen,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

export const StoryPulseAnalytics: React.FC = () => {
  const { activeStory, storyPulse, pulseData, setViewMode } = useStoryVerse();

  const pulse = (pulseData && activeStory?.id && pulseData[activeStory.id]) || storyPulse;

  if (!activeStory) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECE6DE] dark:border-[#322A24]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('writer_dashboard')}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#7D2948]" />
              <h1 className="font-display font-bold text-2xl sm:text-3xl">StoryPulse Analytics</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6]">
                Narrative Intelligence
              </span>
            </div>
            <p className="font-editorial text-sm text-[#8E7F73] mt-0.5">
              Audience psychology, retention thresholds, and reaction density for "{activeStory.title}".
            </p>
          </div>
        </div>

        <button
          onClick={() => setViewMode('story_tree')}
          className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] cursor-pointer self-start sm:self-auto"
        >
          View Story Tree
        </button>
      </div>

      {/* Narrative Highlights Grid (Top moments, quotes, characters) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Most Reacted Moment */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-2">
              <span className="font-bold uppercase tracking-wider">Top Moment</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="font-display font-bold text-lg mb-1">Most Reacted Scene</h4>
            <p className="text-xs text-[#8E7F73] mb-3">Chapter {pulse.mostReactedMoment.chapterNumber} · {pulse.mostReactedMoment.timestamp}</p>
            <blockquote className="font-editorial text-xs italic text-[#4A3F37] dark:text-[#C5BCB3] bg-[#F6F4F0] dark:bg-[#2A2420] p-3 rounded-xl border border-black/5">
              {pulse.mostReactedMoment.quote}
            </blockquote>
          </div>
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-4 block">
            {pulse.mostReactedMoment.reactionCount} shock & gasp {pulse.mostReactedMoment.emoji}
          </span>
        </div>

        {/* Most Highlighted Sentence */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-2">
              <span className="font-bold uppercase tracking-wider">Quoted Prose</span>
              <Highlighter className="w-4 h-4 text-purple-500" />
            </div>
            <h4 className="font-display font-bold text-lg mb-1">Most Highlighted</h4>
            <p className="text-xs text-[#8E7F73] mb-3">Chapter {pulse.mostHighlightedSentence.chapterNumber} climax</p>
            <blockquote className="font-editorial text-xs italic text-[#4A3F37] dark:text-[#C5BCB3] bg-[#F6F4F0] dark:bg-[#2A2420] p-3 rounded-xl border border-black/5">
              "{pulse.mostHighlightedSentence.quote}"
            </blockquote>
          </div>
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 mt-4 block">
            {pulse.mostHighlightedSentence.highlightsCount} reader bookmarks
          </span>
        </div>

        {/* Most Popular Decision */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-2">
              <span className="font-bold uppercase tracking-wider">Audience Choice</span>
              <Vote className="w-4 h-4 text-emerald-500" />
            </div>
            <h4 className="font-display font-bold text-lg mb-1">Decisive Pivot</h4>
            <p className="text-xs text-[#8E7F73] mb-3">{pulse.popularDecision.prompt}</p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
              "{pulse.popularDecision.choiceA}" ({pulse.popularDecision.pctA}%)
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-4 block">
            {(pulse.popularDecision?.totalVotes ?? 0).toLocaleString()} community votes
          </span>
        </div>

        {/* Most Popular Character */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-2">
              <span className="font-bold uppercase tracking-wider">Favorability</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <h4 className="font-display font-bold text-lg mb-1">Fan Favorite</h4>
            <p className="text-xs text-[#8E7F73] mb-3">Character Codex</p>
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420]">
              <img
                src={pulse.mostPopularCharacter.avatar}
                alt={pulse.mostPopularCharacter.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-bold text-sm">{pulse.mostPopularCharacter.name}</p>
                <span className="text-[10px] text-[#8E7F73]">{pulse.mostPopularCharacter.mentions} mentions</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-4 block">
            {pulse.mostPopularCharacter.approvalRate}% reader sentiment
          </span>
        </div>
      </div>

      {/* Reader Retention & Drop-Off Curve Deep Dive */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
            Narrative Pacing & Chapter Engagement
          </h3>
          <p className="font-editorial text-sm text-[#8E7F73]">
            Pinpoints completion percentages and active readership across chapters.
          </p>
        </div>

        <div className="space-y-4">
          {(pulse.chapterEngagement || []).map((dp, idx) => (
            <div key={dp.chapterNumber} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#1E1B18] dark:text-[#F3ECE4]">
                  {dp.title} (Part {dp.chapterNumber})
                </span>
                <span className="font-mono text-[#7D2948] dark:text-[#F3ACB6]">
                  {dp.completionRate}% completion · {(dp.readers ?? 0).toLocaleString()} readers
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#F6F4F0] dark:bg-[#2C2723] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7D2948] to-[#B03E65] transition-all duration-700"
                  style={{ width: `${dp.completionRate}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#8E7F73]">
                <span>
                  {idx === 0
                    ? 'Root beginning'
                    : `Retention rate: ${dp.completionRate}%`}
                </span>
                <span>
                  {dp.completionRate > 85 ? 'Strong reader pacing' : 'Moderate drop-off'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Intelligence Recommendation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#7D2948]/5 dark:bg-[#7D2948]/15 border border-[#7D2948]/20 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          StoryVerse Narrative Advisor
        </span>
        <h4 className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
          Audience Insight & Audio Synergy
        </h4>
        <p className="font-editorial text-base text-[#4A3F37] dark:text-[#C5BCB3] leading-relaxed">
          {pulse.retentionInsight}
        </p>
      </div>
    </div>
  );
};
