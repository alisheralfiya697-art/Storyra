import React, { useState } from 'react';
import {
  PenTool,
  BookOpen,
  Headphones,
  GitBranch,
  Users,
  Vote,
  TrendingUp,
  BarChart3,
  Heart,
  MessageSquare,
  Sparkles,
  Plus,
  Sliders,
  ChevronRight,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { useStoryVerse, ViewMode } from '../../context/StoryVerseContext';
import { Story } from '../../types';

export const WriterDashboard: React.FC = () => {
  const {
    stories,
    chapters,
    pulseData,
    storyPulse,
    setActiveStoryId,
    setActiveChapterId,
    setViewMode,
    currentUser,
    t,
  } = useStoryVerse();

  const authorStories = stories.filter((s) => s.authorId === currentUser.id || s.authorId === 'user-1');
  const activeStory = authorStories[0] || stories[0];

  const storyChapters = chapters.filter((c) => c.storyId === activeStory?.id);
  const activePulse = (pulseData && activeStory?.id && pulseData[activeStory.id]) || storyPulse;

  const handleEditChapter = (chapterId: string) => {
    setActiveStoryId(activeStory.id);
    setActiveChapterId(chapterId);
    setViewMode('writer_editor');
  };

  const handleOpenTree = (storyId: string) => {
    setActiveStoryId(storyId);
    setViewMode('story_tree');
  };

  const handleOpenPulse = (storyId: string) => {
    setActiveStoryId(storyId);
    setViewMode('story_pulse');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Writer Header & Quick Launch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#ECE6DE] dark:border-[#322A24]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7D2948] dark:text-[#F3ACB6] mb-1">
            <PenTool className="w-3.5 h-3.5" />
            <span>{t('writer_tools_title')}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="font-editorial text-base text-[#8E7F73] mt-1">
            Managing {authorStories.length} published interactive worlds and community decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="writer-new-chapter-btn"
            onClick={() => {
              setActiveStoryId(activeStory.id);
              setActiveChapterId(storyChapters[0]?.id || 'chap-1-1');
              setViewMode('writer_editor');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('tool_write_chapter')}</span>
          </button>

          <button
            onClick={() => handleOpenTree(activeStory.id)}
            className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <GitBranch className="w-4 h-4 text-[#7D2948]" />
            <span>{t('tool_story_tree')}</span>
          </button>

          <button
            onClick={() => handleOpenPulse(activeStory.id)}
            className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-[#7D2948]" />
            <span>{t('tool_analytics')}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Cards (7 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>{t('story_readers')}</span>
            <BookOpen className="w-3.5 h-3.5 text-[#7D2948]" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            {(activeStory.readersCount ?? 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            +18% this month
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>{t('story_listeners')}</span>
            <Headphones className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            {(activeStory.listenersCount ?? 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-purple-600 font-semibold">
            37% of audience
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>Followers</span>
            <Users className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            14,240
          </p>
          <span className="text-[10px] text-blue-600 font-semibold">+84 this week</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>Votes Cast</span>
            <Vote className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            4,289
          </p>
          <span className="text-[10px] text-amber-600 font-semibold">Active decisions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>Story Likes</span>
            <Heart className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            {(activeStory.likesCount ?? 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-rose-600 font-semibold">98.2% positive</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-1">
            <span>Discussions</span>
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <p className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4]">
            1,842
          </p>
          <span className="text-[10px] text-indigo-600 font-semibold">Theories & notes</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#7D2948] text-white shadow-md">
          <div className="flex items-center justify-between text-xs text-white/80 mb-1">
            <span>Completion</span>
            <Award className="w-3.5 h-3.5" />
          </div>
          <p className="font-display font-bold text-xl">
            {activePulse ? `${activePulse.completionRate}%` : '88.4%'}
          </p>
          <span className="text-[10px] text-white/80 font-semibold">Top 5% of platform</span>
        </div>
      </div>

      {/* Reader vs Listener Split & Drop-off Retention Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Format Ratio */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
            Audience Consumption Split
          </h3>
          <p className="text-xs text-[#8E7F73]">
            How readers experience "{activeStory.title}" across text and audio narration.
          </p>

          <div className="w-full h-5 rounded-full overflow-hidden flex bg-neutral-200">
            <div
              className="h-full bg-[#7D2948] transition-all"
              style={{ width: `${activePulse?.readRatio ?? 63}%` }}
              title={`Reading (${activePulse?.readRatio ?? 63}%)`}
            />
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${activePulse?.listenRatio ?? 37}%` }}
              title={`Listening (${activePulse?.listenRatio ?? 37}%)`}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7D2948]" />
              <span>Reading: {activePulse?.readRatio ?? 63}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600" />
              <span>Listening: {activePulse?.listenRatio ?? 37}%</span>
            </div>
          </div>
        </div>

        {/* Right: Chapter Retention Curve */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
              Chapter Retention & Engagement
            </h3>
            <span className="text-xs text-[#8E7F73]">Average reader retention</span>
          </div>

          <div className="space-y-2.5 pt-2">
            {(activePulse?.chapterEngagement || []).map((dp) => (
              <div key={dp.chapterNumber} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="truncate max-w-xs">{dp.title} (Ch {dp.chapterNumber})</span>
                  <span className="font-bold text-[#7D2948] dark:text-[#F3ACB6]">
                    {dp.completionRate}% completion
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#ECE6DE] dark:bg-[#342D27] overflow-hidden">
                  <div
                    className="h-full bg-[#7D2948] rounded-full transition-all duration-500"
                    style={{ width: `${dp.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters in Active Story */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
              Chapters in "{activeStory.title}"
            </h3>
            <p className="text-xs text-[#8E7F73]">
              Click any chapter to launch distraction-free writing studio or decision settings.
            </p>
          </div>
          <button
            onClick={() => handleEditChapter(storyChapters[0]?.id || 'chap-1-1')}
            className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t('tool_write_chapter')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyChapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => handleEditChapter(ch.id)}
              className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] hover:border-[#7D2948]/50 shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-2">
                  <span className="font-bold">Part {ch.chapterNumber}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    {ch.status}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4] group-hover:text-[#7D2948] dark:group-hover:text-[#F3ACB6] transition-colors mb-2">
                  {ch.title}
                </h4>

                <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5] line-clamp-2 leading-relaxed mb-4">
                  {ch.summary || ch.content.slice(0, 110)}...
                </p>

                {ch.decisionPoint && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-medium mb-3">
                    <span className="font-bold flex items-center gap-1 mb-1">
                      <Vote className="w-3 h-3" />
                      Active Decision Point:
                    </span>
                    <span className="line-clamp-1 italic">"{ch.decisionPoint.prompt}"</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#ECE6DE] dark:border-[#322A24] flex items-center justify-between text-xs text-[#8E7F73]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {(ch.content ? ch.content.trim().split(/\s+/).length : 0).toLocaleString()} words
                </span>
                <span className="text-[#7D2948] dark:text-[#F3ACB6] font-semibold flex items-center gap-1">
                  {t('tool_edit')}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
