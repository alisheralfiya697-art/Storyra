import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  GitBranch,
  Bookmark,
  Share2,
  Heart,
  UserPlus,
  Check,
  Star,
  Users,
  Clock,
  Vote,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
  Crown,
  Trophy,
  Flame,
  Plus,
  Globe,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { Chapter } from '../../types';
import { SpinOffModal } from './SpinOffModal';

export const StoryDetailsView: React.FC = () => {
  const {
    activeStory,
    stories,
    chapters,
    characters,
    universes,
    setActiveStoryId,
    setActiveChapterId,
    setViewMode,
    playChapterAudio,
    currentUser,
    toggleBookmark,
    toggleFollowAuthor,
    toggleLikeStory,
    comments,
    addComment,
    toggleCommentLike,
    toggleSpoiler,
    voteSpinOffIntoCanon,
    readingLanguage,
    setReadingLanguage,
    setLanguage,
    switchAudioLanguage,
    commentTranslations,
    toggleCommentTranslation,
    getLocalizedCommentText,
    t,
    language,
    isRTL,
  } = useStoryVerse();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'chapters' | 'canon_arena' | 'characters' | 'tree' | 'universe' | 'community'
  >('overview');
  const [isSpinOffModalOpen, setIsSpinOffModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSpoilerComment, setIsSpoilerComment] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!activeStory) return null;

  const storyChapters = chapters.filter((c) => c.storyId === activeStory.id);
  const storyCharacters = characters.filter((c) => c.storyId === activeStory.id);
  const storyUniverse = universes.find((u) => u.id === activeStory.universeId);
  const storyComments = comments.filter((c) => c.storyId === activeStory.id);

  // Spin-offs and Canon Contenders
  const relatedSpinOffs = stories.filter(
    (s) =>
      s.originalStoryId === activeStory.id ||
      (activeStory.originalStoryId && s.originalStoryId === activeStory.originalStoryId) ||
      (s.originalStoryId && s.universeId === activeStory.universeId)
  );
  const canonWinners = relatedSpinOffs.filter((s) => s.canonStatus === 'voted_canon');
  const canonContenders = relatedSpinOffs.filter(
    (s) => s.canonStatus === 'candidate' || (s.spinOffType === 'community' && s.canonStatus !== 'voted_canon')
  );
  const parentStory = activeStory.originalStoryId
    ? stories.find((s) => s.id === activeStory.originalStoryId)
    : undefined;

  const isBookmarked = currentUser.bookmarks.includes(activeStory.id);
  const isFollowing = currentUser.favoriteAuthors.includes(activeStory.authorId);

  const handleRead = (chapterId?: string) => {
    const targetId = chapterId || activeStory.rootChapterId;
    setActiveChapterId(targetId);
    setViewMode('read');
  };

  const handleListen = (chapterId?: string) => {
    const targetId = chapterId || activeStory.rootChapterId;
    setActiveChapterId(targetId);
    playChapterAudio(activeStory.id, targetId, 0);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment({
      storyId: activeStory.id,
      chapterId: activeStory.rootChapterId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentText,
      isSpoiler: isSpoilerComment,
    });
    setCommentText('');
    setIsSpoilerComment(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <button
        onClick={() => setViewMode('discover')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Stories
      </button>

      {/* Story Hero Header: Left Artwork, Right Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Large Story Artwork */}
        <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-[#ECE6DE] dark:border-[#38312B] aspect-[3/4] max-h-[520px]">
          <img
            src={activeStory.coverImage}
            alt={activeStory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {activeStory.canonStatus === 'voted_canon' && (
            <div className="absolute top-4 left-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Crown className="w-4 h-4 fill-black" />
                Official Voted Canon
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
              {activeStory.genre} · {activeStory.ageRating}
            </span>
          </div>
        </div>

        {/* Right: Story Details & Actions */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
          <div>
            {/* Status & Interactive Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {activeStory.canonStatus === 'voted_canon' ? (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Voted Into Official Canon ({activeStory.canonVotesCount?.toLocaleString()} reader approvals)
                </span>
              ) : activeStory.canonStatus === 'candidate' ? (
                <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  Canon Contender ({activeStory.canonVotesCount || 0} / {activeStory.canonVotesThreshold || 1000} votes)
                </span>
              ) : activeStory.isInteractive ? (
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Interactive Branching Story
                </span>
              ) : null}

              {activeStory.universeTitle && (
                <span className="px-3 py-1 rounded-full bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6] text-xs font-bold">
                  {activeStory.universeTitle}
                </span>
              )}

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {t('lang_badge_both')} · {t('lang_status_hi_available')}
              </span>

              <button
                onClick={() => {
                  const nextLang = readingLanguage === 'hi' ? 'en' : 'hi';
                  setReadingLanguage(nextLang);
                  setLanguage(nextLang);
                  switchAudioLanguage(nextLang);
                }}
                className="px-3 py-1 rounded-full bg-[#7D2948] text-white text-xs font-bold hover:bg-[#68203a] transition-colors cursor-pointer"
              >
                {readingLanguage === 'hi' ? '🇬🇧 Switch to English' : '🇮🇳 हिन्दी में पढ़ें (Read in Hindi)'}
              </button>
            </div>

            {/* Parent branch link if this is a spin-off */}
            {parentStory && (
              <div className="mb-3 flex items-center gap-2 text-xs text-[#8E7F73] bg-[#F6F4F0] dark:bg-[#201C19] p-2.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B]">
                <GitBranch className="w-4 h-4 text-[#7D2948] dark:text-[#F3ACB6]" />
                <span>Branched from:</span>
                <button
                  onClick={() => {
                    setActiveStoryId(parentStory.id);
                    setViewMode('story_details');
                  }}
                  className="font-bold text-[#7D2948] dark:text-[#F3ACB6] hover:underline cursor-pointer"
                >
                  {parentStory.title}
                </button>
                {activeStory.forkedFromDecisionText && (
                  <span className="italic text-[#61544B] dark:text-[#BDB1A5] truncate max-w-xs">
                    ("{activeStory.forkedFromDecisionText}")
                  </span>
                )}
              </div>
            )}

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1B18] dark:text-[#F3ECE4] leading-tight mb-2">
              {activeStory.title}
            </h1>

            <p className="font-editorial text-xl text-[#7D2948] dark:text-[#F3ACB6] mb-4">
              {activeStory.subtitle}
            </p>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 py-3 border-y border-[#ECE6DE] dark:border-[#322A24] mb-6">
              <img
                src={activeStory.authorAvatar}
                alt={activeStory.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-[#8E7F73]">Written by</p>
                <p className="text-sm font-semibold text-[#1E1B18] dark:text-[#F3ECE4]">
                  {activeStory.authorName}
                </p>
              </div>
              <button
                onClick={() => toggleFollowAuthor(activeStory.authorId)}
                className={`ml-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isFollowing
                    ? 'bg-[#ECE6DE] dark:bg-[#342D27] text-[#241F1A] dark:text-[#E8E1D9]'
                    : 'bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6] hover:bg-[#7D2948]/20'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                {isFollowing ? 'Following' : 'Follow Author'}
              </button>
            </div>

            <p className="font-editorial text-base sm:text-lg leading-relaxed text-[#4A3F37] dark:text-[#C5BCB3] mb-6">
              {activeStory.description}
            </p>

            {/* If candidate spin-off, show vote banner */}
            {activeStory.canonStatus === 'candidate' && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border border-rose-500/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 mb-1">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <span>Canon Contender Tournament</span>
                  </div>
                  <p className="text-xs text-[#61544B] dark:text-[#BDB1A5]">
                    Current votes: <strong>{activeStory.canonVotesCount || 0}</strong> /{' '}
                    <strong>{activeStory.canonVotesThreshold || 1000}</strong> needed to join canon.
                  </p>
                </div>

                <button
                  onClick={() => voteSpinOffIntoCanon(activeStory.id)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Vote This Spin-Off into Canon (+1)
                </button>
              </div>
            )}

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F6F4F0] dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] text-center mb-6">
              <div>
                <span className="text-[11px] text-[#8E7F73] uppercase tracking-wider block">{t('story_readers')}</span>
                <span className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                  {(activeStory.readersCount ?? 0).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#8E7F73] uppercase tracking-wider block">{t('story_listeners')}</span>
                <span className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                  {(activeStory.listenersCount ?? 0).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#8E7F73] uppercase tracking-wider block">{t('story_reading_time')}</span>
                <span className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                  {activeStory.estimatedReadingTime} min
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#8E7F73] uppercase tracking-wider block">Rating</span>
                <span className="font-display font-bold text-lg text-amber-600 dark:text-amber-400">
                  ★ {activeStory.rating.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="story-details-read-btn"
                onClick={() => handleRead()}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-[#7D2948] text-white font-semibold text-sm hover:bg-[#68203a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {t('story_start_reading')}
              </button>

              <button
                id="story-details-listen-btn"
                onClick={() => handleListen()}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl border-2 border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6] font-semibold text-sm hover:bg-[#7D2948]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Headphones className="w-4 h-4" />
                <span>{t('story_listen_audio')}</span>
              </button>

              <button
                onClick={() => setIsSpinOffModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-semibold text-sm hover:bg-amber-500/25 transition-all flex items-center gap-2 cursor-pointer"
                title="Write a Competitive Spin-Off"
              >
                <GitBranch className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                {t('story_spin_off')}
              </button>

              <button
                onClick={() => toggleBookmark(activeStory.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                    : 'border-[#ECE6DE] dark:border-[#38312B] hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723]'
                }`}
                title="Save to Library"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => toggleLikeStory(activeStory.id)}
                className="p-3.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] text-rose-600 cursor-pointer"
                title="Like Story"
              >
                <Heart className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] text-[#61544B] cursor-pointer"
                title="Share Story"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Story Explainer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#241F1A] border border-amber-200 dark:border-amber-900/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-amber-900 dark:text-amber-300">
                Interactive Branching & Canon System Enabled
              </h5>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
                Pivotal chapters feature live community decision polls. Readers can also write competitive spin-offs; stories that reach 1,000 community votes become official universe canon!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation: Overview, Chapters, Canon Arena, Characters, Story Tree, Universe, Community */}
      <div className="border-b border-[#ECE6DE] dark:border-[#322A24] flex items-center gap-6 overflow-x-auto">
        {[
          { id: 'overview', label: t('story_overview') },
          { id: 'chapters', label: `${t('story_chapters')} (${storyChapters.length})` },
          { id: 'canon_arena', label: `${t('story_canon_arena')} (${relatedSpinOffs.length})` },
          { id: 'characters', label: `${t('writer_character_codex')} (${storyCharacters.length})` },
          { id: 'tree', label: t('tool_story_tree') },
          { id: 'universe', label: t('story_universe') },
          { id: 'community', label: `${t('story_community')} (${storyComments.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6]'
                : 'border-transparent text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold mb-4">Chapters & Decision Branches</h3>
            <div className="space-y-3">
              {storyChapters.map((chap) => (
                <div
                  key={chap.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#7D2948]/50 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#8E7F73]">
                        Part {chap.chapterNumber}
                      </span>
                      {chap.branchType === 'community_choice' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                          ★ Community Choice
                        </span>
                      )}
                      {chap.branchType === 'alternative' && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 text-[10px] font-bold">
                          Alternative Path
                        </span>
                      )}
                      {chap.decisionPoint && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold flex items-center gap-1">
                          <Vote className="w-3 h-3" />
                          Contains Decision
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                      {chap.title}
                    </h4>
                    <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5] mt-1 line-clamp-1">
                      {chap.summary || chap.content.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRead(chap.id)}
                      className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {t('tool_read')}
                    </button>
                    <button
                      onClick={() => handleListen(chap.id)}
                      className="px-4 py-2 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] flex items-center gap-1.5 cursor-pointer"
                      title={`Listen with ${chap.audioVoiceStyle || 'Alluring Silk'} (Thin & Attractive Voice)`}
                    >
                      <Headphones className="w-3.5 h-3.5 text-[#7D2948]" />
                      <span>{t('tool_listen')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Canon Arena & Spin-offs Tab */}
        {activeTab === 'canon_arena' && (
          <div className="space-y-10">
            {/* Header Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#7D2948]/10 via-amber-500/10 to-[#FAF8F5] dark:to-[#1E1A17] border-2 border-[#7D2948]/30 relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-bold mb-3">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Community Canon Tournament
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  Where Readers & Writers Shape Universe Canon
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#52453D] dark:text-[#C5BCB3] leading-relaxed mb-6">
                  In StoryVerse, writers publish chapters with community decision polls. Readers can vote on pivotal directions or write competitive spin-offs. When a spin-off crosses <strong>1,000 community votes</strong>, it is officially inducted into the story's canonical lore!
                </p>

                <button
                  onClick={() => setIsSpinOffModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-[#7D2948] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#68203a] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Write a Competitive Spin-Off
                </button>
              </div>
            </div>

            {/* Voted into Canon Winners */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h4 className="font-display text-xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
                  Inducted into Official Canon (Community Winners)
                </h4>
              </div>

              {canonWinners.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F6F4F0] dark:bg-[#201C19] border border-dashed border-[#ECE6DE] dark:border-[#38312B] text-center text-xs text-[#8E7F73]">
                  No spin-offs have crossed the 1,000 vote threshold yet. Vote for active contenders below to canonize them!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {canonWinners.map((winner) => (
                    <div
                      key={winner.id}
                      className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 to-white dark:to-[#201C19] border-2 border-amber-500/50 shadow-xl relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                          <Crown className="w-3.5 h-3.5 fill-black" />
                          Official Canon
                        </span>
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                          {winner.canonVotesCount?.toLocaleString()} community votes
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-xl mb-1">{winner.title}</h4>
                      <p className="text-xs text-[#7D2948] dark:text-[#F3ACB6] font-medium mb-3">
                        {winner.subtitle}
                      </p>

                      <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5] line-clamp-2 mb-4 leading-relaxed">
                        {winner.description}
                      </p>

                      {winner.forkedFromDecisionText && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 mb-4">
                          <span className="font-bold">Canon Divergence Point:</span> "{winner.forkedFromDecisionText}"
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                        <div className="flex items-center gap-2">
                          <img
                            src={winner.authorAvatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-[#8E7F73]">{winner.authorName}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveStoryId(winner.id);
                              setViewMode('story_details');
                            }}
                            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Explore Canon
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Canon Contenders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <h4 className="font-display text-xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
                    Active Canon Contenders
                  </h4>
                </div>
                <span className="text-xs font-semibold text-[#8E7F73]">
                  1,000 Votes Required to Become Canon
                </span>
              </div>

              {canonContenders.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F6F4F0] dark:bg-[#201C19] border border-dashed border-[#ECE6DE] dark:border-[#38312B] text-center text-xs text-[#8E7F73]">
                  No active community contenders yet. Be the first to launch a spin-off!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {canonContenders.map((contender) => {
                    const votes = contender.canonVotesCount || 0;
                    const threshold = contender.canonVotesThreshold || 1000;
                    const pct = Math.min(100, Math.round((votes / threshold) * 100));

                    return (
                      <div
                        key={contender.id}
                        className="p-6 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] hover:border-[#7D2948]/60 transition-all shadow-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px] font-bold flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              Canon Contender
                            </span>
                            <span className="text-xs font-bold text-[#7D2948] dark:text-[#F3ACB6]">
                              {votes.toLocaleString()} / {threshold.toLocaleString()} votes
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-lg mb-1">{contender.title}</h4>
                          <p className="text-xs text-[#8E7F73] mb-3">{contender.subtitle}</p>

                          <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5] line-clamp-2 mb-4">
                            {contender.description}
                          </p>

                          {/* Progress bar towards Canon status */}
                          <div className="space-y-1 mb-4">
                            <div className="flex items-center justify-between text-[10px] text-[#8E7F73] font-bold">
                              <span>Path to Canonization</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#7D2948] to-amber-500 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>

                          {contender.forkedFromDecisionText && (
                            <p className="text-[11px] text-[#8E7F73] italic mb-4">
                              Diverged from: "{contender.forkedFromDecisionText}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#ECE6DE] dark:border-[#38312B]">
                          <button
                            onClick={() => {
                              setActiveStoryId(contender.id);
                              setViewMode('story_details');
                            }}
                            className="text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Read Branch
                          </button>

                          <button
                            onClick={() => voteSpinOffIntoCanon(contender.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7D2948] to-[#C47D5A] hover:opacity-90 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trophy className="w-3.5 h-3.5 text-amber-300" />
                            Vote into Canon (+1)
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">Character Encyclopedia</h3>
                <p className="text-xs text-[#8E7F73]">
                  Key figures who appear across the chapters with registered voice personas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storyCharacters.map((char) => (
                <div
                  key={char.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      />
                      <div>
                        <h4 className="font-display font-bold text-lg text-[#1E1B18] dark:text-[#F3ECE4]">
                          {char.name}
                        </h4>
                        <span className="text-xs text-[#8E7F73]">{char.occupation} · Age {char.age}</span>
                      </div>
                    </div>

                    <p className="font-editorial text-sm text-[#61544B] dark:text-[#BDB1A5] leading-relaxed mb-4">
                      "{char.description}"
                    </p>

                    <div className="space-y-2 text-xs border-t border-[#ECE6DE] dark:border-[#322A24] pt-3">
                      <div>
                        <span className="font-semibold text-[#8E7F73]">Personality: </span>
                        <span>{char.personality.join(' · ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#8E7F73]">Relationships: </span>
                        <span>
                          {char.relationships.map((r) => `${r.characterName} (${r.relationship})`).join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#7D2948] dark:text-[#F3ACB6] font-medium mt-2">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Voice: {char.voiceStyle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tree Tab */}
        {activeTab === 'tree' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] text-center">
            <h3 className="font-display text-2xl font-bold mb-2">Visual Story Map</h3>
            <p className="font-editorial text-base text-[#61544B] dark:text-[#BDB1A5] max-w-lg mx-auto mb-6">
              Inspect all paths, community voting outcomes, and alternative timelines.
            </p>
            <button
              onClick={() => {
                setActiveStoryId(activeStory.id);
                setViewMode('story_tree');
              }}
              className="px-6 py-3 rounded-xl bg-[#7D2948] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#68203a] transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <GitBranch className="w-4 h-4" />
              Open Interactive Story Tree Canvas
            </button>
          </div>
        )}

        {/* Universe Tab */}
        {activeTab === 'universe' && (
          <div className="space-y-6">
            {storyUniverse ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6]">
                  Connected Lore
                </span>
                <h3 className="font-display text-2xl font-bold mt-1 mb-2">{storyUniverse.title}</h3>
                <p className="font-editorial text-base text-[#61544B] dark:text-[#BDB1A5] max-w-2xl mb-6">
                  {storyUniverse.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {storyUniverse.stories.map((s) => (
                    <div
                      key={s.storyId}
                      onClick={() => {
                        setActiveStoryId(s.storyId);
                        setViewMode('story_details');
                      }}
                      className="p-4 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] hover:border-[#7D2948] transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8E7F73] px-2 py-0.5 rounded bg-[#F6F4F0] dark:bg-[#2C2723]">
                          {s.label}
                        </span>
                        <h4 className="font-display font-bold text-base mt-1">{s.title}</h4>
                        <p className="text-xs text-[#8E7F73]">{(s.readers ?? 0).toLocaleString()} readers</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8E7F73]" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#8E7F73]">This story is currently standalone.</p>
            )}
          </div>
        )}

        {/* Community & Comments Tab */}
        {activeTab === 'community' && (
          <div className="space-y-8 max-w-3xl">
            <h3 className="font-display text-xl font-bold">Reader Discussions & Theories</h3>

            {/* Post comment form */}
            <form onSubmit={handlePostComment} className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] space-y-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your theories, reactions, or questions about the latest chapter..."
                rows={3}
                className="w-full text-sm p-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-[#8E7F73] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSpoilerComment}
                    onChange={(e) => setIsSpoilerComment(e.target.checked)}
                    className="rounded text-[#7D2948]"
                  />
                  <span>Mark as spoiler</span>
                </label>

                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List with Original + Hindi Translation Preservation */}
            <div className="space-y-4">
              {storyComments.map((comm) => {
                const { text: translatedText } = getLocalizedCommentText({
                  ...comm,
                });
                const isTranslationShown =
                  commentTranslations[comm.id] !== undefined
                    ? commentTranslations[comm.id]
                    : language === 'hi';

                return (
                  <div
                    key={comm.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={comm.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <span className="font-semibold text-xs text-[#1E1B18] dark:text-[#F3ECE4] block leading-none">
                            {comm.userName}
                          </span>
                          <span className="text-[10px] text-[#8E7F73]">{comm.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {comm.timestampAudio && (
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 flex items-center gap-1">
                            <Headphones className="w-3 h-3" />
                            {comm.timestampAudio}
                          </span>
                        )}
                        <button
                          onClick={() => toggleCommentTranslation(comm.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#7D2948]/10 hover:bg-[#7D2948]/20 text-[#7D2948] dark:text-[#F3ACB6] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Globe className="w-3 h-3" />
                          {isTranslationShown ? t('comment_show_original') : t('comment_translate_to_hi')}
                        </button>
                      </div>
                    </div>

                    {comm.isSpoiler && !comm.revealed ? (
                      <div
                        onClick={() => toggleSpoiler(comm.id)}
                        className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <ShieldAlert className="w-4 h-4" />
                          {t('comment_spoiler_warning')}
                        </span>
                        <span className="font-bold">{t('comment_reveal')}</span>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7F73] block mb-0.5">
                            {t('comment_original_label')} (🇬🇧 English):
                          </span>
                          <p className="font-editorial text-sm text-[#4A3F37] dark:text-[#C5BCB3] leading-relaxed">
                            "{comm.text}"
                          </p>
                        </div>

                        {isTranslationShown && (
                          <div className="p-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2A2420] border-l-3 border-[#7D2948]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D2948] dark:text-[#F3ACB6] block mb-0.5">
                              {t('comment_translated_hi_label')} (🇮🇳 हिन्दी):
                            </span>
                            <p className="font-devanagari text-sm text-[#1E1B18] dark:text-[#F3ECE4] leading-relaxed">
                              "{translatedText}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-[#8E7F73] pt-2 border-t border-[#ECE6DE] dark:border-[#322A24]">
                      <button
                        onClick={() => toggleCommentLike(comm.id)}
                        className={`flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer ${
                          comm.isLiked ? 'text-rose-600 font-bold' : ''
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${comm.isLiked ? 'fill-rose-600' : ''}`} />
                        {comm.likes} likes
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Overview Tab Default */}
        {activeTab === 'overview' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="font-display text-xl font-bold">About this Story</h3>
            <p className="font-editorial text-base sm:text-lg text-[#4A3F37] dark:text-[#C5BCB3] leading-relaxed">
              {activeStory.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {activeStory.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-[#F6F4F0] dark:bg-[#2C2723] text-xs font-semibold text-[#8E7F73]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Overview Spotlight for Canon Arena */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#7D2948]/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
              <div>
                <div className="flex items-center gap-2 mb-1 text-[#7D2948] dark:text-[#F3ACB6]">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4]">
                    Canon Tournament & Divergent Spin-Offs
                  </h4>
                </div>
                <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5]">
                  {relatedSpinOffs.length} connected spin-offs available · Readers vote competing branches into official canon.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('canon_arena')}
                className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors cursor-pointer shrink-0"
              >
                Explore Canon Arena
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Write Spin-Off Modal */}
      <SpinOffModal
        isOpen={isSpinOffModalOpen}
        onClose={() => setIsSpinOffModalOpen(false)}
        defaultForkedChapterId={storyChapters[0]?.id}
        defaultForkedDecisionText={storyChapters[0]?.decisionPoint?.prompt}
      />
    </div>
  );
};
