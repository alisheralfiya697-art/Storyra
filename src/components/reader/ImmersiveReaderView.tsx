import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Headphones,
  Sliders,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageSquare,
  Highlighter,
  Vote,
  Clock,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Minimize2,
  X,
  GitBranch,
  Trophy,
  Flame,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { SpinOffModal } from '../story/SpinOffModal';

export const ImmersiveReaderView: React.FC = () => {
  const {
    activeStory,
    activeChapter,
    chapters,
    setActiveChapterId,
    setViewMode,
    readingPrefs,
    setReadingPrefs,
    readingProgress,
    updateReadingProgress,
    syncReadingToAudio,
    castVote,
    simulateCommunityVotingPulse,
    createChapterFromWinningChoice,
    reactions,
    addReaction,
    comments,
    addComment,
    currentUser,
    toggleBookmark,
    language,
    t,
    isRTL,
  } = useStoryVerse();

  const [showSettings, setShowSettings] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedParagraphIdx, setSelectedParagraphIdx] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [hasVotedNotice, setHasVotedNotice] = useState(false);
  const [isSpinOffModalOpen, setIsSpinOffModalOpen] = useState(false);
  const [forkPrompt, setForkPrompt] = useState<string>('');
  const contentContainerRef = useRef<HTMLDivElement>(null);

  if (!activeStory || !activeChapter) return null;

  const currentProgress = readingProgress[activeChapter.id] || 0;
  const isBookmarked = currentUser.bookmarks.includes(activeStory.id);

  const decisionPoints =
    activeChapter.decisionPoints && activeChapter.decisionPoints.length > 0
      ? activeChapter.decisionPoints
      : activeChapter.decisionPoint
      ? [activeChapter.decisionPoint]
      : [];

  // Track scroll position to update reading progress %
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const pct = Math.round((el.scrollTop / totalHeight) * 100);
        updateReadingProgress(activeChapter.id, pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeChapter.id]);

  // Handle text selection for floating reaction toolbar
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 2) {
      const text = selection.toString().trim();
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPosition({
        x: rect.left + rect.width / 2,
        y: Math.max(10, rect.top - 55),
      });
    } else if (!showCommentBox) {
      setToolbarPosition(null);
      setSelectedText('');
    }
  };

  const handleReact = (type: 'heart' | 'cry' | 'gasp' | 'laugh' | 'fire' | 'mindblown') => {
    addReaction({
      storyId: activeStory.id,
      chapterId: activeChapter.id,
      type,
      selectedText: selectedText || undefined,
      paragraphIndex: selectedParagraphIdx || undefined,
      userId: currentUser.id,
      userName: currentUser.name,
    });
    setToolbarPosition(null);
    setSelectedText('');
  };

  const handleHighlight = () => {
    handleReact('fire');
  };

  const handlePostPassageComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment({
      storyId: activeStory.id,
      chapterId: activeChapter.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentInput,
      isSpoiler: false,
      paragraphIndex: selectedParagraphIdx || undefined,
    });
    setCommentInput('');
    setShowCommentBox(false);
    setToolbarPosition(null);
  };

  // Chapter navigation helpers
  const storyChapters = chapters.filter((c) => c.storyId === activeStory.id);
  const currentIndex = storyChapters.findIndex((c) => c.id === activeChapter.id);
  const prevChapter = currentIndex > 0 ? storyChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < storyChapters.length - 1 ? storyChapters[currentIndex + 1] : null;

  // Reading theme styling
  const getThemeClasses = () => {
    switch (readingPrefs.theme) {
      case 'dark':
        return 'bg-[#151210] text-[#D8CFBF]';
      case 'sepia':
        return 'bg-[#F4ECD8] text-[#3D3226]';
      case 'light':
      default:
        return 'bg-[#FAF8F5] text-[#241F1A]';
    }
  };

  const getFontFamilyClass = () => {
    switch (readingPrefs.fontFamily) {
      case 'sans':
        return 'font-sans-ui';
      case 'display':
        return 'font-display';
      case 'editorial':
      default:
        return 'font-editorial';
    }
  };

  const paragraphs = activeChapter.content.split('\n\n');

  return (
    <div
      onMouseUp={handleMouseUp}
      className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}
    >
      {/* Top Distraction-Free Sticky Reader Bar */}
      <div
        className={`sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors ${
          readingPrefs.theme === 'dark'
            ? 'bg-[#151210]/95 border-[#2A2420]'
            : readingPrefs.theme === 'sepia'
            ? 'bg-[#F4ECD8]/95 border-[#E2D6BE]'
            : 'bg-[#FAF8F5]/95 border-[#ECE6DE]'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => setViewMode('story_details')}
            className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          {/* Centered Chapter Progress */}
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-60">
              {activeStory.title}
            </span>
            <span className="text-xs font-semibold">
              {activeChapter.title.split(':')[0]} · {currentProgress}%
            </span>
          </div>

          {/* Controls: Listen Sync, Typography Settings, Theme */}
          <div className="flex items-center gap-2">
            {/* Read <-> Listen Switcher */}
            <button
              id="reader-switch-to-audio-btn"
              onClick={syncReadingToAudio}
              className="px-3 py-1.5 rounded-lg bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Continue listening from here with thin & attractive voice"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen (Thin & Attractive Voice) →</span>
              <span className="sm:hidden">Listen</span>
            </button>

            {/* Typography / Theme Drawer Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Reading preferences"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(activeStory.id)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#7D2948] text-[#7D2948]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Reader Preferences Popup */}
        {showSettings && (
          <div
            className={`absolute right-4 top-16 w-80 p-5 rounded-2xl shadow-2xl border z-50 text-xs space-y-4 ${
              readingPrefs.theme === 'dark'
                ? 'bg-[#221D1A] border-[#38312B] text-neutral-200'
                : 'bg-white border-[#ECE6DE] text-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
              <span className="font-bold text-sm">{t('reader_tools_title')}</span>
              <button onClick={() => setShowSettings(false)} className="cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Selector: Light, Dark, Sepia */}
            <div>
              <span className="font-semibold block mb-2 opacity-70">{t('reader_theme')}</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light', label: t('reader_theme_light'), bg: 'bg-[#FAF8F5]', text: 'text-black' },
                  { id: 'sepia', label: t('reader_theme_sepia'), bg: 'bg-[#F4ECD8]', text: 'text-[#3D3226]' },
                  { id: 'dark', label: t('reader_theme_dark'), bg: 'bg-[#151210]', text: 'text-white' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setReadingPrefs((p) => ({ ...p, theme: item.id as any }))}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${item.bg} ${item.text} ${
                      readingPrefs.theme === item.id
                        ? 'border-[#7D2948] ring-2 ring-[#7D2948]/30 font-bold'
                        : 'border-transparent opacity-80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold opacity-70">{t('reader_font_size')}</span>
                <span>{readingPrefs.fontSize}px</span>
              </div>
              <input
                type="range"
                min="15"
                max="26"
                value={readingPrefs.fontSize}
                onChange={(e) =>
                  setReadingPrefs((p) => ({ ...p, fontSize: Number(e.target.value) }))
                }
                className="w-full accent-[#7D2948]"
              />
            </div>

            {/* Line Spacing */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold opacity-70">{t('reader_line_spacing')}</span>
                <span>{readingPrefs.lineSpacing.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.4"
                max="2.2"
                step="0.1"
                value={readingPrefs.lineSpacing}
                onChange={(e) =>
                  setReadingPrefs((p) => ({ ...p, lineSpacing: Number(e.target.value) }))
                }
                className="w-full accent-[#7D2948]"
              />
            </div>

            {/* Font Family */}
            <div>
              <span className="font-semibold block mb-2 opacity-70">{t('reader_font_family')}</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'editorial', label: 'Editorial' },
                  { id: 'sans', label: 'Modern Sans' },
                  { id: 'display', label: 'Display' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setReadingPrefs((p) => ({ ...p, fontFamily: f.id as any }))}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      readingPrefs.fontFamily === f.id
                        ? 'border-[#7D2948] bg-[#7D2948]/10 font-bold'
                        : 'border-black/10 dark:border-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Selection Mini-Toolbar for Reactions & Comments */}
      {toolbarPosition && (
        <div
          style={{
            position: 'fixed',
            left: `${toolbarPosition.x}px`,
            top: `${toolbarPosition.y}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#1E1B18] text-white shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            onClick={() => handleReact('heart')}
            className="p-1.5 hover:scale-125 transition-transform"
            title="Love"
          >
            ❤️
          </button>
          <button
            onClick={() => handleReact('gasp')}
            className="p-1.5 hover:scale-125 transition-transform"
            title="Shock"
          >
            😱
          </button>
          <button
            onClick={() => handleReact('fire')}
            className="p-1.5 hover:scale-125 transition-transform"
            title="Fire"
          >
            🔥
          </button>
          <button
            onClick={() => handleReact('mindblown')}
            className="p-1.5 hover:scale-125 transition-transform"
            title="Mindblown"
          >
            🤯
          </button>
          <button
            onClick={() => handleReact('cry')}
            className="p-1.5 hover:scale-125 transition-transform"
            title="Tears"
          >
            😭
          </button>
          <div className="w-[1px] h-4 bg-white/20 mx-1" />
          <button
            onClick={() => setShowCommentBox(true)}
            className="p-1.5 hover:text-amber-400 flex items-center gap-1 text-xs px-2"
            title="Comment on passage"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comment</span>
          </button>
          <button
            onClick={handleHighlight}
            className="p-1.5 hover:text-amber-400"
            title="Highlight"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Inline Comment Popover */}
      {showCommentBox && (
        <div
          style={{
            position: 'fixed',
            left: `${toolbarPosition?.x || 100}px`,
            top: `${(toolbarPosition?.y || 100) + 45}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-50 w-72 p-3 rounded-2xl bg-[#231F1C] text-white shadow-2xl border border-white/20"
        >
          <form onSubmit={handlePostPassageComment} className="space-y-2">
            <p className="text-[11px] text-amber-300 italic line-clamp-1">
              "{selectedText}"
            </p>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a note or reaction on this passage..."
              rows={2}
              className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-amber-400"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCommentBox(false)}
                className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-md bg-[#7D2948] text-white text-xs font-semibold"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      {/* The Centered Reading Column */}
      <main
        ref={contentContainerRef}
        className="max-w-2xl mx-auto px-6 py-16 sm:py-24 transition-all"
        style={{
          fontSize: `${readingPrefs.fontSize}px`,
          lineHeight: readingPrefs.lineSpacing,
        }}
      >
        {/* Chapter Header */}
        <header className="text-center mb-14 pb-8 border-b border-black/10 dark:border-white/10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#7D2948] dark:text-[#F3ACB6] block mb-2">
            {activeStory.title}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
            {activeChapter.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8E7F73] mt-3">
            <span>{activeChapter.readingTimeMinutes} min read</span>
            <span>·</span>
            <span>Estimated audio: {Math.round(activeChapter.audioDurationSeconds / 60)} min</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
              <Sparkles className="w-3 h-3" />
              Thin & Attractive Voice Available
            </span>
          </div>
        </header>

        {/* Story Prose Paragraphs */}
        <article className={`space-y-6 ${getFontFamilyClass()}`}>
          {paragraphs.map((p, idx) => {
            const paraReactions = reactions.filter(
              (r) => r.chapterId === activeChapter.id && r.paragraphIndex === idx
            );

            return (
              <div key={idx} className="relative group">
                <p
                  onClick={() => setSelectedParagraphIdx(idx)}
                  className="cursor-text select-text transition-colors"
                >
                  {p}
                </p>

                {/* Subtle reaction markers on paragraphs that have community reactions */}
                {paraReactions.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5 opacity-80">
                    {paraReactions.map((r) => (
                      <span
                        key={r.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-black/5 dark:bg-white/10"
                      >
                        {r.type === 'heart' && '❤️'}
                        {r.type === 'gasp' && '😱'}
                        {r.type === 'fire' && '🔥'}
                        {r.type === 'mindblown' && '🤯'}
                        {r.type === 'cry' && '😭'}
                        <span className="text-[10px] text-[#8E7F73]">{r.userName}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </article>

        {/* Interactive Decision Points UI */}
        {decisionPoints.length > 0 && (
          <section className="mt-16 pt-10 border-t-2 border-dashed border-[#7D2948]/40 space-y-8">
            {decisionPoints.map((dp, dpIdx) => (
              <div
                key={dp.id}
                className="p-8 rounded-3xl bg-white/70 dark:bg-[#1C1815] border-2 border-[#7D2948] shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#7D2948] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5" />
                    {decisionPoints.length > 1 ? `Decision Poll ${dpIdx + 1} of ${decisionPoints.length}` : 'The Decision'}
                  </span>
                  <span className="text-xs font-semibold text-[#8E7F73] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Voting closes in: 08:42:17
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold mb-2">
                  "{dp.prompt}"
                </h3>

                {dp.contextDescription && (
                  <p className="font-editorial text-sm text-[#61544B] dark:text-[#BDB1A5] mb-6 italic">
                    {dp.contextDescription}
                  </p>
                )}

                {/* Choices with percentage fill animation */}
                <div className="space-y-3">
                  {dp.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => {
                        castVote(activeChapter.id, choice.id, dp.id);
                        setHasVotedNotice(true);
                      }}
                      className={`w-full relative overflow-hidden text-left p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                        dp.userVotedChoiceId === choice.id
                          ? 'border-[#7D2948] bg-[#7D2948]/10 shadow-md'
                          : 'border-[#ECE6DE] dark:border-[#38312B] bg-white/90 dark:bg-[#25201C] hover:border-[#7D2948]/60'
                      }`}
                    >
                      {/* Animated Fill Bar */}
                      <div
                        className="absolute inset-y-0 left-0 bg-[#7D2948]/20 dark:bg-[#7D2948]/35 transition-all duration-700"
                        style={{ width: `${choice.percentage}%` }}
                      />

                      <div className="relative flex items-center justify-between text-sm font-semibold">
                        <span className="flex items-center gap-2">
                          {dp.winningChoiceId === choice.id && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          )}
                          {choice.text}
                        </span>
                        <span className="font-bold text-[#7D2948] dark:text-[#F3ACB6] text-base">
                          {choice.percentage}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Write Spin-off Card inside Decision Point */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#7D2948]/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F3ECE4] block">
                        Envision a different path for this dilemma?
                      </span>
                      <span className="text-[11px] text-[#61544B] dark:text-[#BDB1A5]">
                        Write a competitive spin-off. Reach 1,000 community votes to be canonized!
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setForkPrompt(dp.prompt);
                      setIsSpinOffModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7D2948] to-[#C47D5A] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shrink-0 shadow"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-amber-200" />
                    Branch Spin-Off
                  </button>
                </div>

                {/* Influenced the story acknowledgment */}
                {hasVotedNotice && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      You've influenced the story. Your choice is recorded in the community pulse!
                    </span>
                  </div>
                )}

                {/* Community voting simulation & Chapter creation helpers */}
                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => simulateCommunityVotingPulse(activeChapter.id)}
                    className="text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Simulate 120 community reader votes
                  </button>

                  <button
                    onClick={() => {
                      const topChoice = dp.choices[0];
                      const newChap = createChapterFromWinningChoice(activeChapter.id, topChoice.text);
                      setActiveChapterId(newChap.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#7D2948] text-white font-semibold hover:bg-[#68203a] transition-colors cursor-pointer"
                  >
                    Create Next Chapter from Winning Choice
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Bottom Chapter Navigation Bar */}
        <footer className="mt-20 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          {prevChapter ? (
            <button
              onClick={() => {
                setActiveChapterId(prevChapter.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('tool_prev_chapter')}</span>
            </button>
          ) : (
            <span className="text-xs text-[#8E7F73]">Start</span>
          )}

          <span className="text-xs font-mono text-[#8E7F73]">
            {activeChapter.title.split(':')[0]} of {storyChapters.length}
          </span>

          {nextChapter ? (
            <button
              onClick={() => {
                setActiveChapterId(nextChapter.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline cursor-pointer"
            >
              <span>{t('tool_next_chapter')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-[#8E7F73]">Latest Chapter</span>
          )}
        </footer>
      </main>

      {/* Spin-off modal */}
      <SpinOffModal
        isOpen={isSpinOffModalOpen}
        onClose={() => setIsSpinOffModalOpen(false)}
        defaultForkedChapterId={activeChapter.id}
        defaultForkedDecisionText={forkPrompt || activeChapter.decisionPoint?.prompt}
      />
    </div>
  );
};
