import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  BookOpen,
  Sparkles,
  Volume1,
  Check,
  ChevronUp,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { FullScreenAudioModal } from './FullScreenAudioModal';
import { VOICE_STYLE_CONFIGS } from '../../utils/audioEngine';

export const AudioPlayer: React.FC = () => {
  const {
    audioState,
    togglePlayPause,
    seekAudio,
    setAudioSpeed,
    setAudioVolume,
    setVoiceStyle,
    toggleAmbientShimmer,
    previewVoiceSample,
    syncAudioToReading,
    stories,
    chapters,
    t,
  } = useStoryVerse();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  // If no audio is currently loaded or active, don't show the player
  const activeChapId = audioState.chapterId || audioState.activeChapterId;
  const activeStoryId = audioState.storyId || audioState.activeStoryId;

  if (!activeChapId) return null;

  const currentChapter = chapters.find((c) => c.id === activeChapId);
  const currentStory = stories.find((s) => s.id === activeStoryId);

  if (!currentChapter || !currentStory) return null;

  const currentTime = audioState.currentTimeSeconds || audioState.currentTime || 0;
  const durationTime = audioState.durationSeconds || audioState.duration || 480;
  const currentSpeed = audioState.speed || audioState.playbackSpeed || 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    seekAudio(newTime);
  };

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  const attractiveVoiceStyles = [
    'Alluring Silk',
    'Airy Siren',
    'Crystal Velvet',
    'Gentle Melodic',
    'Dramatic Shimmer',
  ];

  return (
    <>
      {/* Persistent Mini Audio Bar docked at screen bottom */}
      <div
        id="persistent-audio-player"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#171412]/95 backdrop-blur-xl border-t border-[#342D28] text-white shadow-2xl transition-all"
      >
        {/* Progress Bar scrubber at the very top edge */}
        <div className="relative w-full h-1.5 bg-[#2E2722] cursor-pointer group">
          <input
            type="range"
            min="0"
            max={durationTime || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Seek audio timeline"
          />
          <div
            className="h-full bg-gradient-to-r from-[#7D2948] via-[#A83257] to-[#F3ACB6] relative"
            style={{
              width: `${(currentTime / (durationTime || 1)) * 100}%`,
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Cover, Story Title & Chapter */}
          <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-sm">
            <div
              onClick={() => setIsFullScreen(true)}
              className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 cursor-pointer group shadow-sm"
              title="Open full-screen listening theater"
            >
              <img
                src={currentStory.coverImage}
                alt={currentStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F3ACB6] truncate">
                  {currentStory.title}
                </span>
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 text-emerald-300 bg-emerald-950/60 border border-emerald-700/40 rounded-full font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t('audio_thin_voice')}
                </span>
              </div>
              <h5
                onClick={() => setIsFullScreen(true)}
                className="text-xs sm:text-sm font-semibold truncate hover:underline cursor-pointer"
              >
                {currentChapter.title}
              </h5>
              <div className="flex items-center gap-2 text-[11px] text-[#A89D91]">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(durationTime)}</span>
                {/* Audio animated wave bars when playing */}
                {audioState.isPlaying && (
                  <div className="flex items-center gap-0.5 ml-1 h-3">
                    <span className="w-0.5 h-2 bg-[#F3ACB6] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#F3ACB6] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#F3ACB6] animate-pulse delay-150" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center: Playback Controls & Thin Voice Style Quick Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* -10s skip */}
              <button
                onClick={() => seekAudio(Math.max(0, currentTime - 10))}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Skip back 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Play/Pause Main Button */}
              <button
                id="mini-audio-play-pause-btn"
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-[#7D2948] text-white flex items-center justify-center hover:bg-[#963457] hover:scale-105 transition-all shadow-md cursor-pointer"
                title={audioState.isPlaying ? 'Pause' : 'Play'}
              >
                {audioState.isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              {/* +30s skip */}
              <button
                onClick={() => seekAudio(Math.min(durationTime, currentTime + 30))}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Skip forward 30 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Thin Voice Style Selector Dropup */}
            <div className="relative">
              <button
                onClick={() => setShowVoicePicker(!showVoicePicker)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-medium text-[#F3ACB6] hover:text-white transition-colors cursor-pointer"
                title="Choose attractive thin voice style"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>{audioState.voiceStyle || 'Alluring Silk'}</span>
                <ChevronUp className={`w-3 h-3 transition-transform ${showVoicePicker ? 'rotate-180' : ''}`} />
              </button>

              {showVoicePicker && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[#1F1B18] border border-white/15 rounded-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F3ACB6]">
                      {t('audio_thin_voice_title')}
                    </span>
                    <button
                      onClick={() => previewVoiceSample(audioState.voiceStyle)}
                      className="text-[10px] text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                      title="Hear sample line"
                    >
                      <Volume1 className="w-3 h-3" />
                      {t('audio_preview')}
                    </button>
                  </div>
                  <div className="space-y-1">
                    {attractiveVoiceStyles.map((styleKey) => {
                      const cfg = VOICE_STYLE_CONFIGS[styleKey];
                      const isSelected = audioState.voiceStyle === styleKey;
                      return (
                        <button
                          key={styleKey}
                          onClick={() => {
                            setVoiceStyle(styleKey);
                            setShowVoicePicker(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#7D2948] text-white font-semibold'
                              : 'hover:bg-white/5 text-neutral-300'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-[11px] leading-tight flex items-center gap-1">
                              {styleKey}
                              {cfg && (
                                <span className="text-[9px] opacity-75 font-normal">
                                  ({cfg.tag})
                                </span>
                              )}
                            </div>
                            {cfg && (
                              <p className="text-[9px] opacity-70 leading-snug line-clamp-1">
                                {cfg.description}
                              </p>
                            )}
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Read Sync Transition & Options */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Read / Listen Instant Hand-off Button */}
            <button
              id="audio-switch-to-reader-btn"
              onClick={syncAudioToReading}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Continue reading from this exact timestamp"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#F3ACB6]" />
              <span className="hidden md:inline">{t('tool_read')} →</span>
              <span className="md:hidden">{t('tool_read')}</span>
            </button>

            {/* Ambient Shimmer toggle */}
            <button
              onClick={toggleAmbientShimmer}
              className={`p-1.5 rounded-lg transition-colors hidden sm:block cursor-pointer ${
                audioState.ambientShimmer
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:bg-white/10 text-neutral-400'
              }`}
              title={audioState.ambientShimmer ? 'Ethereal Shimmer Active' : 'Shimmer Muted'}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <select
              value={currentSpeed}
              onChange={(e) => setAudioSpeed(Number(e.target.value))}
              className="bg-[#2A2420] text-xs font-mono rounded-lg px-2 py-1 border border-[#3E3630] outline-none cursor-pointer"
              aria-label="Audio playback speed"
            >
              {speeds.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>

            {/* Volume toggle */}
            <button
              onClick={() => {
                if (isMuted) {
                  setAudioVolume(1);
                  setIsMuted(false);
                } else {
                  setAudioVolume(0);
                  setIsMuted(true);
                }
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white hidden sm:block cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || audioState.volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Fullscreen Expand */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
              title="Open full immersive listening theater"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullScreen && (
        <FullScreenAudioModal
          isOpen={isFullScreen}
          onClose={() => setIsFullScreen(false)}
          story={currentStory}
          chapter={currentChapter}
        />
      )}
    </>
  );
};
