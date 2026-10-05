import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  BookOpen,
  Volume2,
  Sparkles,
  MessageSquare,
  Flame,
  Heart,
  Plus,
  Sliders,
  Volume1,
  Check,
  Music,
  Globe,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { Chapter, Story } from '../../types';
import { VOICE_STYLE_CONFIGS } from '../../utils/audioEngine';

interface FullScreenAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
  chapter: Chapter;
}

export const FullScreenAudioModal: React.FC<FullScreenAudioModalProps> = ({
  isOpen,
  onClose,
  story,
  chapter,
}) => {
  const {
    audioState,
    togglePlayPause,
    seekAudio,
    setAudioSpeed,
    setVoiceStyle,
    setVoiceThinness,
    toggleAmbientShimmer,
    previewVoiceSample,
    syncAudioToReading,
    comments,
    addComment,
    currentUser,
    audioLanguage,
    switchAudioLanguage,
    setReadingLanguage,
    setLanguage,
    t,
  } = useStoryVerse();

  const [commentInput, setCommentInput] = useState('');
  const [showAddReaction, setShowAddReaction] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(true);

  if (!isOpen) return null;

  const currentTime = audioState.currentTimeSeconds || audioState.currentTime || 0;
  const durationTime = audioState.durationSeconds || audioState.duration || 480;
  const currentSpeed = audioState.speed || audioState.playbackSpeed || 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekAudio(Number(e.target.value));
  };

  const handlePostTimestampReaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment({
      storyId: story.id,
      chapterId: chapter.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentInput,
      isSpoiler: false,
      timestampAudio: formatTime(currentTime),
    });
    setCommentInput('');
    setShowAddReaction(false);
  };

  // Comments with audio timestamps
  const timestampComments = comments.filter(
    (c) => c.chapterId === chapter.id && c.timestampAudio
  );

  const attractiveVoiceKeys = [
    'Alluring Silk',
    'Airy Siren',
    'Crystal Velvet',
    'Gentle Melodic',
    'Dramatic Shimmer',
  ];

  const currentConfig =
    VOICE_STYLE_CONFIGS[audioState.voiceStyle] || VOICE_STYLE_CONFIGS['Alluring Silk'];

  return (
    <div className="fixed inset-0 z-50 bg-[#100D0C] text-white flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs uppercase font-bold tracking-wider">Close Listening Mode</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Language Selector in Fullscreen Audio Modal */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs">
            <Globe className="w-3.5 h-3.5 text-[#F3ACB6]" />
            <span className="hidden sm:inline text-neutral-300">{t('nav_language')}:</span>
            <select
              value={audioLanguage}
              onChange={(e) => {
                const newLang = e.target.value as 'en' | 'hi';
                switchAudioLanguage(newLang);
                setReadingLanguage(newLang);
                setLanguage(newLang);
              }}
              className="bg-transparent font-bold text-white outline-none cursor-pointer"
            >
              <option value="en" className="text-black">🇬🇧 English</option>
              <option value="hi" className="text-black">🇮🇳 हिन्दी</option>
            </select>
          </div>

          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showVoiceSettings
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/10 hover:bg-white/20 text-neutral-300'
            }`}
            title="Adjust voice thinness and attractive tone"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voice Acoustics</span>
          </button>

          <button
            onClick={() => {
              onClose();
              syncAudioToReading();
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#F3ACB6]" />
            <span className="hidden sm:inline">Switch to Reader at this line →</span>
            <span className="sm:hidden">Read</span>
          </button>
        </div>
      </div>

      {/* Main Center Listening Theater */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center text-center">
        {/* Large Story Cover Artwork with Ambient Soft Glow */}
        <div className="relative w-52 h-52 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl mb-6 border border-white/10">
          <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {audioState.isPlaying && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1">
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  className="w-1 bg-[#F3ACB6] rounded-full animate-pulse"
                  style={{
                    height: `${10 + (i % 5) * 6}px`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Narrative Title & Chapter */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7D2948]/40 border border-[#F3ACB6]/30 text-xs font-bold text-[#F3ACB6] mb-2">
          <span>{t('lang_playing_in')} {audioLanguage === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
          <span>·</span>
          <span className="text-emerald-300">
            {audioLanguage === 'hi' ? t('lang_audio_status_hi_available') : t('lang_audio_status_en_available')}
          </span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#F3ACB6] mb-1">
          {story.title}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          🎧 {chapter.title}
        </h2>
        
        {/* Voice Style Active Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-200/90 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>
            Voice: <strong className="font-semibold text-white">{audioState.voiceStyle || 'Alluring Silk'}</strong> ({currentConfig?.tag || 'Thin & Alluring'})
          </span>
          {audioState.ambientShimmer && (
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-full">
              ✨ Ethereal Shimmer On
            </span>
          )}
        </div>

        {/* Dynamic Waveform / Scrubber */}
        <div className="w-full max-w-2xl mb-4">
          <div className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer">
            <input
              type="range"
              min="0"
              max={durationTime || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Seek audio"
            />
            <div
              className="h-full bg-gradient-to-r from-[#7D2948] via-[#A83257] to-[#F3ACB6] rounded-full"
              style={{
                width: `${(currentTime / (durationTime || 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>
              -{formatTime(Math.max(0, durationTime - currentTime))} / {formatTime(durationTime)}
            </span>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={() => seekAudio(Math.max(0, currentTime - 10))}
            className="p-3 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Skip back 10s"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-[#7D2948] text-white flex items-center justify-center hover:bg-[#963457] hover:scale-105 transition-all shadow-xl cursor-pointer"
            title={audioState.isPlaying ? 'Pause' : 'Play'}
          >
            {audioState.isPlaying ? (
              <Pause className="w-8 h-8 fill-white" />
            ) : (
              <Play className="w-8 h-8 fill-white ml-1" />
            )}
          </button>

          <button
            onClick={() => seekAudio(Math.min(durationTime, currentTime + 30))}
            className="p-3 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Skip forward 30s"
          >
            <RotateCw className="w-6 h-6" />
          </button>
        </div>

        {/* Playback Speeds */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-neutral-400 mr-2">{t('audio_speed')}:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setAudioSpeed(s)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                currentSpeed === s
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Thin & Attractive Voice Control Console */}
        {showVoiceSettings && (
          <div className="w-full max-w-2xl bg-[#1A1614] border border-[#3E352E] rounded-2xl p-4 sm:p-5 text-left mb-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {t('audio_thin_voice_title')}
                  </h4>
                  <p className="text-[11px] text-[#A89D91]">
                    Elevated pitch & bright formant tuning removes muddy bass thickness for magnetic vocal presence.
                  </p>
                </div>
              </div>

              {/* Hear Sample Button */}
              <button
                onClick={() => previewVoiceSample(audioState.voiceStyle)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="Hear audio sample"
              >
                <Volume1 className="w-3.5 h-3.5" />
                <span>{t('audio_preview')}</span>
              </button>
            </div>

            {/* Voice Style Selector Pills */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Attractive Voice Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {attractiveVoiceKeys.map((key) => {
                  const cfg = VOICE_STYLE_CONFIGS[key];
                  const isSelected = audioState.voiceStyle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setVoiceStyle(key)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#7D2948]/30 border-[#C94B6E] text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{key}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#F3ACB6]" />}
                      </div>
                      <span className="text-[10px] text-[#F3ACB6] block mt-0.5">
                        {cfg?.tag}
                      </span>
                      <p className="text-[9px] text-neutral-400 line-clamp-2 mt-1 leading-snug">
                        {cfg?.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vocal Thinness Slider & Shimmer Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
              {/* Thinness / Pitch Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-300 font-medium">Vocal Thinness Register:</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {Math.round((audioState.thinnessModifier || 1.0) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.95"
                  max="1.30"
                  step="0.05"
                  value={audioState.thinnessModifier || 1.0}
                  onChange={(e) => setVoiceThinness(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                  aria-label="Vocal thinness pitch modifier"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>Natural</span>
                  <span className="text-amber-300/80">Thin & Alluring</span>
                  <span>Ultra-Thin Siren</span>
                </div>
              </div>

              {/* Ambient Crystalline Shimmer Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-3 self-center bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="text-left">
                  <span className="text-xs font-semibold block flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-amber-300" />
                    Crystalline Ambiance
                  </span>
                  <span className="text-[10px] text-neutral-400 block">
                    Soft celestial harmonic bed
                  </span>
                </div>
                <button
                  onClick={toggleAmbientShimmer}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    audioState.ambientShimmer ? 'bg-[#7D2948]' : 'bg-neutral-700'
                  }`}
                  aria-label="Toggle ambient shimmer"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      audioState.ambientShimmer ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Audio Timestamp Reactions Timeline */}
        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#F3ACB6]" />
              <span className="text-xs font-semibold">Timestamp Listener Reactions</span>
            </div>
            <button
              onClick={() => setShowAddReaction(!showAddReaction)}
              className="text-xs text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>React at {formatTime(currentTime)}</span>
            </button>
          </div>

          {showAddReaction && (
            <form onSubmit={handlePostTimestampReaction} className="mb-4 space-y-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder={`Reaction at ${formatTime(currentTime)} (e.g. "Her voice gave me chills here!")`}
                className="w-full text-xs p-2.5 rounded-lg bg-black/50 border border-white/20 outline-none focus:border-[#F3ACB6]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReaction(false)}
                  className="px-3 py-1 text-xs text-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#7D2948] text-white text-xs font-semibold rounded-md"
                >
                  Save Reaction
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {timestampComments.length === 0 ? (
              <p className="text-xs text-neutral-500 py-2 text-center italic">
                No reactions logged yet. Click "React" above to mark your favorite moment in the narration.
              </p>
            ) : (
              timestampComments.map((tc) => (
                <div
                  key={tc.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#F3ACB6]">
                      {tc.timestampAudio}
                    </span>
                    <span className="text-neutral-300">"{tc.text}"</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">by {tc.userName}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 text-center text-xs text-neutral-500">
        Engineered with thin, high-clarity voice synthesis and read-listen synchronization.
      </div>
    </div>
  );
};
