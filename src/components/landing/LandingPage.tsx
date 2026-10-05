import React from 'react';
import {
  BookOpen,
  Headphones,
  GitBranch,
  ArrowRight,
  Vote,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  Volume2,
  Layers,
  Award,
  Globe,
  Compass,
  Sliders,
  BarChart3,
  BookMarked,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { PWAInstallButton } from '../mobile/PWAInstallButton';

export const LandingPage: React.FC = () => {
  const {
    setViewMode,
    setActiveStoryId,
    setActiveChapterId,
    playChapterAudio,
    castVote,
    chapters,
    stories,
    readingPrefs,
    t,
    language,
    setLanguage,
    isRTL,
    setIsAuthModalOpen,
    setAuthMode,
  } = useStoryVerse();

  const isDarkMode = readingPrefs.theme === 'dark';
  const flagshipStory = stories.find((s) => s.id === 'story-1') || stories[0];
  const chapter1 = chapters.find((c) => c.id === 'chap-1-1');
  const decision = chapter1?.decisionPoint;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#ECE6DE] dark:border-[#2E2824]">
        {/* Subtle architectural ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#7D2948]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7D2948]/10 text-[#7D2948] dark:bg-[#7D2948]/20 dark:text-[#F3ACB6] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t('app_tagline')}
            </div>

            {/* Language Quick-Switch Banner */}
            <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#F6F4F0] dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] rounded-full shadow-sm">
              <span className="text-[11px] font-bold text-[#8E7F73] px-2 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#7D2948]" />
                {t('nav_language')}:
              </span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#7D2948] text-white shadow-sm'
                    : 'text-[#61544B] dark:text-[#BDB1A5] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#7D2948] text-white shadow-sm'
                    : 'text-[#61544B] dark:text-[#BDB1A5] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                🇮🇳 हिन्दी
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  language === 'ur'
                    ? 'bg-[#7D2948] text-white shadow-sm'
                    : 'text-[#61544B] dark:text-[#BDB1A5] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                🇵🇰 اردو
              </button>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E1B18] dark:text-[#F3ECE4] leading-[1.1] mb-6">
              {t('app_hero_title')}
            </h1>

            <p className="font-editorial text-xl sm:text-2xl text-[#61544B] dark:text-[#BDB1A5] leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('app_hero_sub')}
            </p>

            {/* Primary Action Buttons including Log In / Register options */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button
                id="hero-start-writing-btn"
                onClick={() => setViewMode('writer_dashboard')}
                className="px-7 py-3 rounded-xl bg-[#7D2948] text-white font-medium text-sm hover:bg-[#68203a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('nav_writer')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-stories-btn"
                onClick={() => setViewMode('discover')}
                className="px-7 py-3 rounded-xl bg-white dark:bg-[#2A2420] text-[#241F1A] dark:text-[#E8E1D9] border border-[#ECE6DE] dark:border-[#3E3630] font-medium text-sm hover:bg-[#F6F4F0] dark:hover:bg-[#342D27] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#7D2948]" />
                <span>{t('nav_discover')}</span>
              </button>

              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl border border-[#7D2948]/30 hover:border-[#7D2948] bg-white/70 dark:bg-[#2A2420]/70 text-[#7D2948] dark:text-[#F3ACB6] font-medium text-sm hover:bg-[#7D2948]/5 transition-all cursor-pointer"
              >
                <span>{t('nav_login')}</span>
              </button>

              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-[#241F1A] dark:bg-white text-white dark:text-[#241F1A] font-medium text-sm hover:opacity-90 transition-all cursor-pointer shadow-sm"
              >
                <span>{t('nav_register')}</span>
              </button>
            </div>

            {/* Mobile App Install Banner */}
            <PWAInstallButton variant="banner" className="mb-10 text-left" />

            {/* Interactive Visual Demonstration Flow: Writer -> Story -> Reader -> Vote -> Next Chapter */}
            <div className="p-6 rounded-2xl bg-[#F6F3EE] dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm">
              <p className="text-xs uppercase tracking-widest text-[#8E7F73] font-bold mb-5">
                The StoryVerse Cycle
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-[#2A2420] border border-[#ECE6DE] dark:border-[#3E3630] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-1.5 font-bold text-xs">
                    01
                  </div>
                  <span className="font-semibold text-xs text-[#241F1A] dark:text-[#E8E1D9]">Writer</span>
                  <span className="text-[11px] text-[#8E7F73] mt-0.5">Pens chapter</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#2A2420] border border-[#ECE6DE] dark:border-[#3E3630] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-1.5 font-bold text-xs">
                    02
                  </div>
                  <span className="font-semibold text-xs text-[#241F1A] dark:text-[#E8E1D9]">Story</span>
                  <span className="text-[11px] text-[#8E7F73] mt-0.5">Read & Listen</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#2A2420] border border-[#ECE6DE] dark:border-[#3E3630] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-1.5 font-bold text-xs">
                    03
                  </div>
                  <span className="font-semibold text-xs text-[#241F1A] dark:text-[#E8E1D9]">Reader</span>
                  <span className="text-[11px] text-[#8E7F73] mt-0.5">Reacts & highlights</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mb-1.5 font-bold text-xs">
                    04
                  </div>
                  <span className="font-semibold text-xs text-amber-900 dark:text-amber-300">Vote</span>
                  <span className="text-[11px] text-[#8E7F73] mt-0.5">Community choice</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#7D2948] text-white flex flex-col items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-1.5 font-bold text-xs">
                    05
                  </div>
                  <span className="font-semibold text-xs">Next Chapter</span>
                  <span className="text-[11px] text-white/80 mt-0.5">Canon unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Interactive Story Preview ("The Last Door") */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] font-bold">
            Flagship Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-[#1E1B18] dark:text-[#F3ECE4]">
            Experience a Story in Motion
          </h2>
          <p className="font-editorial text-lg text-[#61544B] dark:text-[#BDB1A5] mt-2">
            See how readers both consume the prose and directly cast votes that steer the author's next release.
          </p>
        </div>

        <div className="bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Story Cover Artwork & Metadata */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[500px]">
            <img
              src={flagshipStory.coverImage}
              alt={flagshipStory.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-bold w-fit mb-3">
                ✦ Interactive Flagship
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1">
                {flagshipStory.title}
              </h3>
              <p className="text-sm text-neutral-300 font-editorial mb-4">
                by {flagshipStory.authorName} · {flagshipStory.genre}
              </p>
              <div className="flex items-center gap-4 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  28 min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-purple-400" />
                  36 min listen
                </span>
                <span className="flex items-center gap-1.5">
                  <Vote className="w-3.5 h-3.5 text-rose-400" />
                  3,840 votes
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Chapter Sample & Live Decision Voting */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#ECE6DE] dark:border-[#322A24] mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8E7F73]">Sample Excerpt</span>
                  <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                    Chapter 1: The Wax Seal
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveStoryId('story-1');
                      setActiveChapterId('chap-1-1');
                      setViewMode('read');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Now
                  </button>
                  <button
                    onClick={() => {
                      setActiveStoryId('story-1');
                      setActiveChapterId('chap-1-1');
                      playChapterAudio('story-1', 'chap-1-1', 0);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-[#ECE6DE] dark:border-[#3A322C] text-xs font-semibold hover:bg-[#F6F4F0] dark:hover:bg-[#2C2621] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#7D2948]" />
                    <span>Listen (Thin Voice)</span>
                  </button>
                </div>
              </div>

              <blockquote className="font-editorial text-base sm:text-lg leading-relaxed text-[#4A3F37] dark:text-[#C5BCB3] mb-8 italic pl-4 border-l-2 border-[#7D2948]">
                "Behind the heavy oak panel, she could hear something moving—a soft, rhythmic breathing, like a bellows drawing cold air through an iron chimney. Her hands began to tremble..."
              </blockquote>

              {/* The Live Interactive Decision Box */}
              {decision && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F5] dark:bg-[#1A1614] border-2 border-[#7D2948]/30 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#7D2948] dark:text-[#F3ACB6] flex items-center gap-1.5">
                      <Vote className="w-3.5 h-3.5" />
                      The Decision
                    </span>
                    <span className="text-xs text-[#8E7F73] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {(decision.totalVotes ?? 0).toLocaleString()} votes cast
                    </span>
                  </div>

                  <p className="font-display font-semibold text-base sm:text-lg text-[#1E1B18] dark:text-[#F3ECE4] mb-4">
                    {decision.prompt}
                  </p>

                  <div className="space-y-2.5">
                    {decision.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => castVote('chap-1-1', choice.id)}
                        className={`w-full relative overflow-hidden text-left p-3.5 rounded-xl border transition-all cursor-pointer group ${
                          decision.userVotedChoiceId === choice.id
                            ? 'border-[#7D2948] bg-[#7D2948]/10'
                            : 'border-[#ECE6DE] dark:border-[#38312B] bg-white dark:bg-[#241F1B] hover:border-[#7D2948]/50'
                        }`}
                      >
                        {/* Vote progress fill bar */}
                        <div
                          className="absolute inset-y-0 left-0 bg-[#7D2948]/15 dark:bg-[#7D2948]/25 transition-all duration-500 rounded-xl"
                          style={{ width: `${choice.percentage}%` }}
                        />

                        <div className="relative flex items-center justify-between text-xs sm:text-sm font-medium">
                          <span className="text-[#241F1A] dark:text-[#E8E1D9] flex items-center gap-2">
                            {decision.winningChoiceId === choice.id && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            )}
                            {choice.text}
                          </span>
                          <span className="font-bold text-[#7D2948] dark:text-[#F3ACB6]">
                            {choice.percentage}%
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#8E7F73] text-center mt-3">
                    Click any option to cast a live simulated vote and witness instant percentage calculation.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECE6DE] dark:border-[#322A24] flex items-center justify-between">
              <span className="text-xs text-[#8E7F73]">Next chapter unlocked by community vote</span>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setViewMode('story_tree');
                }}
                className="text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Inspect Branching Tree
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Sets & Platform Tools Interactive Showcase */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#ECE6DE] dark:border-[#2E2824]">
        {/* The Sets Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] font-bold">
              ✦ {t('sets_title')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-[#1E1B18] dark:text-[#F3ECE4]">
              {t('sets_title')}
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#61544B] dark:text-[#BDB1A5] mt-2">
              {t('sets_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Set 1: Flagship Set */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-4 font-bold text-sm">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2 group-hover:text-[#7D2948] transition-colors">
                  {t('set_flagship_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('set_flagship_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setViewMode('story_details');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420] hover:bg-[#7D2948] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('story_start_reading')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Set 2: Canon Arena Set */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 font-bold text-sm">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2 group-hover:text-[#7D2948] transition-colors">
                  {t('set_canon_arena_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('set_canon_arena_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setViewMode('story_details');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420] hover:bg-[#7D2948] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('story_canon_arena')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Set 3: Discovery Set */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4 font-bold text-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2 group-hover:text-[#7D2948] transition-colors">
                  {t('set_discovery_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('set_discovery_desc')}
                </p>
              </div>
              <button
                onClick={() => setViewMode('discover')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420] hover:bg-[#7D2948] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('nav_discover')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Set 4: Challenges Set */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 font-bold text-sm">
                  <BookMarked className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2 group-hover:text-[#7D2948] transition-colors">
                  {t('set_challenges_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('set_challenges_desc')}
                </p>
              </div>
              <button
                onClick={() => setViewMode('challenges')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420] hover:bg-[#7D2948] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('nav_challenges')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* The Interactive Tools Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] font-bold">
              ⚙️ {t('tools_title')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-[#1E1B18] dark:text-[#F3ECE4]">
              {t('tools_title')}
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#61544B] dark:text-[#BDB1A5] mt-2">
              {t('tools_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1: Reader Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Reader Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_reader_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_reader_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setActiveChapterId('chap-1-1');
                  setViewMode('read');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('tool_read')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 2: Voice Synthesizer Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Audio Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_voice_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_voice_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  playChapterAudio('story-1', 'chap-1-1', 0);
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('tool_listen')}</span>
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 3: Story Tree Graph Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Tree Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_branching_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_branching_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setViewMode('story_tree');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('nav_tree')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 4: Decision Poll Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Vote className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Voting Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_voting_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_voting_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  castVote('chap-1-1', 'choice-1');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('tool_vote')}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 5: Analytics Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Analytics Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_analytics_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_analytics_desc')}
                </p>
              </div>
              <button
                onClick={() => setViewMode('writer_dashboard')}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('writer_pulse')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 6: Lore Codex Tool */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E7F73]">
                    Lore Tool
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-2">
                  {t('tool_codex_title')}
                </h4>
                <p className="text-xs text-[#8E7F73] leading-relaxed mb-6">
                  {t('tool_codex_desc')}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoryId('story-1');
                  setViewMode('story_details');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{t('story_universe')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Major Benefits: WRITE, LISTEN, INFLUENCE */}
      <section className="py-16 sm:py-20 bg-[#F6F3EE] dark:bg-[#1A1614] border-y border-[#ECE6DE] dark:border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
              {t('dim_title')}
            </h2>
            <p className="font-editorial text-lg text-[#61544B] dark:text-[#BDB1A5] mt-2">
              {t('dim_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1: WRITE */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6]">
                {t('dim_01')}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4] mt-1 mb-3">
                {t('dim_write_title')}
              </h3>
              <p className="text-sm font-editorial text-[#61544B] dark:text-[#BDB1A5] leading-relaxed mb-6">
                {t('dim_write_quote')}
              </p>
              <p className="text-xs text-[#8E7F73] leading-normal">
                {t('dim_write_desc')}
              </p>
            </div>

            {/* Benefit 2: LISTEN */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400">
                {t('dim_02')}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4] mt-1 mb-3">
                {t('dim_listen_title')}
              </h3>
              <p className="text-sm font-editorial text-[#61544B] dark:text-[#BDB1A5] leading-relaxed mb-6">
                {t('dim_listen_quote')}
              </p>
              <p className="text-xs text-[#8E7F73] leading-normal">
                {t('dim_listen_desc')}
              </p>
            </div>

            {/* Benefit 3: INFLUENCE */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-6">
                <Vote className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                {t('dim_03')}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4] mt-1 mb-3">
                {t('dim_influence_title')}
              </h3>
              <p className="text-sm font-editorial text-[#61544B] dark:text-[#BDB1A5] leading-relaxed mb-6">
                {t('dim_influence_quote')}
              </p>
              <p className="text-xs text-[#8E7F73] leading-normal">
                {t('dim_influence_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "How StoryVerse Works" Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] font-bold">
            {t('process_badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E1B18] dark:text-[#F3ECE4] mt-2">
            {t('process_title')}
          </h2>
          <p className="font-editorial text-lg text-[#61544B] dark:text-[#BDB1A5] mt-2">
            {t('process_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] relative">
            <span className="font-display text-3xl font-bold text-[#7D2948]/30 dark:text-[#7D2948]/50 block mb-2">01</span>
            <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-1">
              {t('process_step1_title')}
            </h4>
            <p className="text-xs text-[#8E7F73] leading-relaxed">
              {t('process_step1_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] relative">
            <span className="font-display text-3xl font-bold text-[#7D2948]/30 dark:text-[#7D2948]/50 block mb-2">02</span>
            <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-1">
              {t('process_step2_title')}
            </h4>
            <p className="text-xs text-[#8E7F73] leading-relaxed">
              {t('process_step2_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] relative">
            <span className="font-display text-3xl font-bold text-[#7D2948]/30 dark:text-[#7D2948]/50 block mb-2">03</span>
            <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-1">
              {t('process_step3_title')}
            </h4>
            <p className="text-xs text-[#8E7F73] leading-relaxed">
              {t('process_step3_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] relative">
            <span className="font-display text-3xl font-bold text-[#7D2948]/30 dark:text-[#7D2948]/50 block mb-2">04</span>
            <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] mb-1">
              {t('process_step4_title')}
            </h4>
            <p className="text-xs text-[#8E7F73] leading-relaxed">
              {t('process_step4_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#7D2948] text-white border border-[#7D2948] relative shadow-md">
            <span className="font-display text-3xl font-bold text-white/40 block mb-2">05</span>
            <h4 className="font-display font-bold text-base mb-1">
              {t('process_step5_title')}
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              {t('process_step5_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#201C19] text-[#E8E1D9] text-center border-t border-[#38312B]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t('footer_cta_title')}
          </h2>
          <p className="font-editorial text-lg text-[#BDB1A5] max-w-xl mx-auto mb-8">
            {t('footer_cta_sub')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setViewMode('discover')}
              className="px-8 py-3.5 rounded-xl bg-white text-[#201C19] font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              {t('footer_cta_btn_read')}
            </button>
            <button
              onClick={() => setViewMode('writer_dashboard')}
              className="px-8 py-3.5 rounded-xl bg-[#7D2948] text-white font-semibold text-sm hover:bg-[#68203a] transition-colors cursor-pointer"
            >
              {t('footer_cta_btn_write')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
