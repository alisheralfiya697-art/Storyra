import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  Sparkles,
  Clock,
  Heart,
  Bookmark,
  TrendingUp,
  Flame,
  Star,
  Users,
  GitBranch,
  ArrowRight,
  Filter,
  Globe,
  Search,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { Mood, Story } from '../../types';
import { PWAInstallButton } from '../mobile/PWAInstallButton';

export const DiscoverView: React.FC = () => {
  const {
    stories,
    setActiveStoryId,
    setActiveChapterId,
    setViewMode,
    playChapterAudio,
    currentUser,
    toggleBookmark,
    readingProgress,
    t,
    language,
    isRTL,
  } = useStoryVerse();

  const [selectedMood, setSelectedMood] = useState<Mood | 'All'>('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'en' | 'hi' | 'both'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const moodsList: { label: Mood; displayKey: string; emoji: string }[] = [
    { label: 'Suspenseful', displayKey: 'discovery_mood_suspenseful', emoji: '⚡' },
    { label: 'Dark', displayKey: 'discovery_mood_dark', emoji: '🌑' },
    { label: 'Emotional', displayKey: 'discovery_mood_emotional', emoji: '🥀' },
    { label: 'Romantic', displayKey: 'discovery_mood_romantic', emoji: '🌹' },
    { label: 'Scary', displayKey: 'discovery_mood_scary', emoji: '👁️' },
    { label: 'Adventure', displayKey: 'discovery_mood_adventure', emoji: '🧭' },
    { label: 'Inspirational', displayKey: 'discovery_mood_inspirational', emoji: '✨' },
    { label: 'Funny', displayKey: 'discovery_mood_funny', emoji: '🎭' },
  ];

  const timeOptions = [
    { label: t('discovery_time_any'), value: 'all' },
    { label: t('discovery_time_5'), value: '5' },
    { label: t('discovery_time_15'), value: '15' },
    { label: t('discovery_time_30'), value: '30' },
    { label: t('discovery_time_60'), value: '60' },
  ];

  // Filtered stories based on mood, time, genre, language, and search
  const filteredStories = stories.filter((story) => {
    if (selectedMood !== 'All' && !story.moods.includes(selectedMood)) {
      return false;
    }
    if (genreFilter !== 'all' && story.genre !== genreFilter) {
      return false;
    }
    if (selectedTimeFilter === '5' && story.estimatedReadingTime > 10) return false;
    if (selectedTimeFilter === '15' && (story.estimatedReadingTime < 10 || story.estimatedReadingTime > 25)) return false;
    if (selectedTimeFilter === '30' && (story.estimatedReadingTime < 25 || story.estimatedReadingTime > 45)) return false;
    if (selectedTimeFilter === '60' && story.estimatedReadingTime < 40) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchDesc = story.description.toLowerCase().includes(q);
      const matchAuthor = story.authorName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAuthor) return false;
    }
    return true;
  });

  const flagshipStory = stories.find((s) => s.id === 'story-1') || stories[0];

  const handleOpenStory = (storyId: string) => {
    setActiveStoryId(storyId);
    setViewMode('story_details');
  };

  const handleRead = (story: Story, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStoryId(story.id);
    setActiveChapterId(story.rootChapterId);
    setViewMode('read');
  };

  const handleListen = (story: Story, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStoryId(story.id);
    setActiveChapterId(story.rootChapterId);
    playChapterAudio(story.id, story.rootChapterId, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* Mobile App Install Banner */}
      <PWAInstallButton variant="banner" />

      {/* Personalized Discovery Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ECE6DE] dark:border-[#322A24]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t('discovery_title')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-[#1E1B18] dark:text-[#F3ECE4]">
              {t('discovery_mood_question')}
            </h2>
          </div>

          {/* Time filter selector */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8E7F73]" />
            <span className="text-xs font-semibold text-[#8E7F73]">{t('discovery_time_available')}</span>
            <div className="flex items-center gap-1 bg-[#F6F4F0] dark:bg-[#2B2521] p-1 rounded-xl">
              {timeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedTimeFilter(opt.value)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedTimeFilter === opt.value
                      ? 'bg-[#7D2948] text-white'
                      : 'text-[#61544B] dark:text-[#C5BCB3] hover:bg-black/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Chips */}
        <div className="pt-6 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSelectedMood('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedMood === 'All'
                ? 'bg-[#7D2948] text-white shadow-sm'
                : 'bg-[#F6F4F0] dark:bg-[#2B2521] text-[#61544B] dark:text-[#C5BCB3] hover:bg-[#ECE7DF]'
            }`}
          >
            {t('discovery_all_moods')}
          </button>
          {moodsList.map(({ label, displayKey, emoji }) => (
            <button
              key={label}
              onClick={() => setSelectedMood(label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedMood === label
                  ? 'bg-[#7D2948] text-white shadow-sm'
                  : 'bg-[#F6F4F0] dark:bg-[#2B2521] text-[#61544B] dark:text-[#C5BCB3] hover:bg-[#ECE7DF]'
              }`}
            >
              <span>{emoji}</span>
              <span>{t(displayKey)}</span>
            </button>
          ))}
        </div>

        {/* Language & Search Discovery Row */}
        <div className="mt-6 pt-5 border-t border-[#ECE6DE] dark:border-[#322A24] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Language Filter: [All] [English] [Hindi] [English + Hindi] */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#8E7F73] flex items-center gap-1.5 mr-1">
              <Globe className="w-3.5 h-3.5 text-[#7D2948]" />
              {t('lang_filter_label')}
            </span>
            {[
              { id: 'all', label: t('lang_filter_all') },
              { id: 'en', label: `🇬🇧 ${t('lang_filter_en')}` },
              { id: 'hi', label: `🇮🇳 ${t('lang_filter_hi')}` },
              { id: 'both', label: `🌐 ${t('lang_filter_both')}` },
            ].map((lf) => (
              <button
                key={lf.id}
                onClick={() => setLanguageFilter(lf.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  languageFilter === lf.id
                    ? 'bg-[#7D2948] text-white shadow-sm'
                    : 'bg-[#F6F4F0] dark:bg-[#2B2521] text-[#61544B] dark:text-[#C5BCB3] hover:bg-[#ECE7DF]'
                }`}
              >
                {lf.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#8E7F73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('tool_search')}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F6F4F0] dark:bg-[#2B2521] text-xs border border-transparent focus:border-[#7D2948] outline-none"
            />
          </div>
        </div>
      </div>

      {/* "Continue Reading & Listening" Section (if user has history) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#7D2948]" />
            <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
              {t('discovery_continue')}
            </h3>
          </div>
          <span className="text-xs text-[#8E7F73]">{t('discovery_sync_note')}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Continue item 1 */}
          <div
            onClick={() => handleOpenStory('story-1')}
            className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex gap-5 hover:border-[#7D2948]/50 transition-all cursor-pointer group"
          >
            <img
              src={flagshipStory.coverImage}
              alt={flagshipStory.title}
              className="w-24 h-32 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D2948] dark:text-[#F3ACB6]">
                  Chapter 1: The Wax Seal
                </span>
                <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4] leading-snug">
                  {flagshipStory.title}
                </h4>
                <p className="text-xs text-[#8E7F73]">by {flagshipStory.authorName}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#61544B] dark:text-[#C5BCB3]">
                  <span>Progress</span>
                  <span>{readingProgress['chap-1-1'] || 73}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#ECE6DE] dark:bg-[#38312B] overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#7D2948] rounded-full"
                    style={{ width: `${readingProgress['chap-1-1'] || 73}%` }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleRead(flagshipStory, e)}
                    className="px-3 py-1 rounded-lg bg-[#7D2948] text-white text-xs font-medium hover:bg-[#68203a] flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {t('story_start_reading')}
                  </button>
                  <button
                    onClick={(e) => handleListen(flagshipStory, e)}
                    className="px-3 py-1 rounded-lg border border-[#ECE6DE] dark:border-[#3E3630] text-xs font-medium hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] flex items-center gap-1 cursor-pointer"
                    title="Listen with thin & attractive voice narration"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#7D2948]" />
                    <span>{t('story_listen_audio')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue item 2 */}
          <div
            onClick={() => handleOpenStory('story-2')}
            className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex gap-5 hover:border-[#7D2948]/50 transition-all cursor-pointer group"
          >
            <img
              src={stories[1]?.coverImage}
              alt=""
              className="w-24 h-32 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  Chapter 1: The Singing Granite
                </span>
                <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4] leading-snug">
                  {stories[1]?.title}
                </h4>
                <p className="text-xs text-[#8E7F73]">by {stories[1]?.authorName}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#61544B] dark:text-[#C5BCB3]">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#ECE6DE] dark:bg-[#38312B] overflow-hidden mb-3">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '45%' }} />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleRead(stories[1], e)}
                    className="px-3 py-1 rounded-lg bg-purple-700 text-white text-xs font-medium hover:bg-purple-800 flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {t('story_start_reading')}
                  </button>
                  <button
                    onClick={(e) => handleListen(stories[1], e)}
                    className="px-3 py-1 rounded-lg border border-[#ECE6DE] dark:border-[#3E3630] text-xs font-medium hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] flex items-center gap-1 cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-purple-700" />
                    {t('story_listen_audio')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Main Stories Grid */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
              {selectedMood === 'All' ? t('discovery_stories_for_you') : `${selectedMood} Stories`}
            </h3>
            <p className="font-editorial text-sm text-[#8E7F73] mt-1">
              {filteredStories.length} {t('discovery_showing_works')}
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: t('discovery_genre_all') },
              { id: 'Mystery', label: t('discovery_genre_mystery') },
              { id: 'Fantasy', label: t('discovery_genre_fantasy') },
              { id: 'Sci-Fi', label: t('discovery_genre_scifi') },
              { id: 'Horror', label: t('discovery_genre_horror') },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGenreFilter(g.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  genreFilter === g.id
                    ? 'bg-[#1E1B18] text-white dark:bg-white dark:text-[#1E1B18]'
                    : 'bg-[#F6F4F0] dark:bg-[#2C2723] text-[#61544B] dark:text-[#C5BCB3] hover:bg-[#ECE6DE]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => handleOpenStory(story.id)}
              className="group bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#7D2948]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Artwork Container with subtle zoom on hover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Badges including Multilingual Availability Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        {story.isInteractive && <GitBranch className="w-3 h-3 text-amber-400" />}
                        {story.genre}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#7D2948]/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                        {languageFilter === 'en'
                          ? t('lang_badge_en')
                          : languageFilter === 'hi'
                          ? t('lang_badge_hi')
                          : t('lang_badge_both')}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(story.id);
                      }}
                      className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-amber-400 transition-colors"
                      aria-label="Bookmark story"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          currentUser.bookmarks.includes(story.id) ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom Stats Banner */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        {story.estimatedReadingTime}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5 text-purple-400" />
                        {story.estimatedListeningTime}m
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300">
                      ★ {story.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#8E7F73] mb-1">
                    <img
                      src={story.authorAvatar}
                      alt={story.authorName}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>{story.authorName}</span>
                    {story.spinOffType && story.spinOffType !== 'official' && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-semibold capitalize">
                        {story.spinOffType} Spin-off
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-xl text-[#1E1B18] dark:text-[#F3ECE4] group-hover:text-[#7D2948] dark:group-hover:text-[#F3ACB6] transition-colors leading-tight mb-2">
                    {story.title}
                  </h4>

                  <p className="font-editorial text-sm text-[#61544B] dark:text-[#BDB1A5] line-clamp-2 leading-relaxed mb-4">
                    {story.subtitle || story.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {story.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#F6F4F0] dark:bg-[#2C2723] text-[10px] text-[#8E7F73] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-[#ECE6DE] dark:border-[#322A24] flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#8E7F73] flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {(story.readersCount ?? 0).toLocaleString()} readers
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleRead(story, e)}
                    className="px-3 py-1.5 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    {t('tool_read')}
                  </button>

                  <button
                    onClick={(e) => handleListen(story, e)}
                    className="px-3 py-1.5 rounded-xl border border-[#ECE6DE] dark:border-[#3E3630] text-[#241F1A] dark:text-[#E8E1D9] text-xs font-semibold hover:bg-[#F6F4F0] dark:hover:bg-[#2E2824] transition-colors flex items-center gap-1 cursor-pointer"
                    title="Listen with thin & attractive voice narration"
                  >
                    <Headphones className="w-3 h-3 text-[#7D2948]" />
                    <span>{t('tool_listen')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Community Spin-Offs & Universe Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#241F1C] to-[#151210] text-white relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 block">
            Multiverse of Stories
          </span>
          <h3 className="font-display text-3xl font-bold mb-3">
            The Last Door Universe & Community Spin-Offs
          </h3>
          <p className="font-editorial text-base text-neutral-300 mb-6 leading-relaxed">
            When Aria opened the door, she wasn't the only one affected. Explore alternative endings, companion novels written from Daniel's point of view, and community spin-offs canonized by popular vote.
          </p>
          <button
            onClick={() => {
              setActiveStoryId('story-1');
              setViewMode('story_details');
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            Explore Story Universe
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
