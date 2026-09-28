import React, { useState } from 'react';
import {
  GitBranch,
  ArrowLeft,
  Plus,
  BookOpen,
  Vote,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { Chapter } from '../../types';

export const StoryTreeEditor: React.FC = () => {
  const {
    activeStory,
    chapters,
    setActiveChapterId,
    setViewMode,
    createChapterFromWinningChoice,
    t,
  } = useStoryVerse();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1-1');

  if (!activeStory) return null;

  const storyChapters = chapters.filter((c) => c.storyId === activeStory.id);
  const selectedChapter = storyChapters.find((c) => c.id === selectedChapterId) || storyChapters[0];

  const handleBranchClick = (chapId: string) => {
    setSelectedChapterId(chapId);
  };

  const handleReadChapter = (chapId: string) => {
    setActiveChapterId(chapId);
    setViewMode('read');
  };

  const handleEditChapter = (chapId: string) => {
    setActiveChapterId(chapId);
    setViewMode('writer_editor');
  };

  // Group chapters by level/sequence for hierarchical rendering
  const rootChapters = storyChapters.filter((c) => !c.parentChapterId);
  const childChapters = storyChapters.filter((c) => c.parentChapterId);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#151210] text-[#241F1A] dark:text-[#E8E1D9] flex flex-col">
      {/* Top Header Bar */}
      <header className="p-4 sm:px-8 border-b border-[#ECE6DE] dark:border-[#2E2824] bg-white/70 dark:bg-[#1B1715]/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('story_details')}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#7D2948]" />
              <h1 className="font-display font-bold text-xl">{activeStory.title}</h1>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6]">
                Branching Tree
              </span>
            </div>
            <p className="text-xs text-[#8E7F73]">
              Visual narrative architecture: Community-decided branches and alternative paths.
            </p>
          </div>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#F6F4F0] dark:bg-[#2C2723] p-1 rounded-xl">
            <button
              onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-xs cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-xs cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => handleEditChapter(selectedChapter.id)}
            className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] cursor-pointer"
          >
            {t('writer_edit')}
          </button>
        </div>
      </header>

      {/* Main Interactive Tree Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Visual Node Graph Area */}
        <div className="flex-1 p-8 sm:p-12 overflow-auto relative flex flex-col items-center justify-start bg-[radial-gradient(#ECE6DE_1px,transparent_1px)] dark:bg-[radial-gradient(#2E2824_1px,transparent_1px)] [background-size:24px_24px]">
          <div
            className="transition-transform duration-200 origin-top flex flex-col items-center space-y-12"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Level 1: Root Chapter Node */}
            <div className="flex flex-col items-center">
              {rootChapters.map((ch) => (
                <div key={ch.id} className="relative flex flex-col items-center">
                  <div
                    onClick={() => handleBranchClick(ch.id)}
                    className={`w-72 p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-md text-left ${
                      selectedChapterId === ch.id
                        ? 'border-[#7D2948] bg-white dark:bg-[#241F1B] ring-4 ring-[#7D2948]/20'
                        : 'border-[#ECE6DE] dark:border-[#38312B] bg-white/90 dark:bg-[#201C19] hover:border-[#7D2948]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-[#8E7F73]">Part {ch.chapterNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6] font-bold">
                        Root Canon
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] leading-snug">
                      {ch.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between text-xs text-[#8E7F73]">
                      <span>100% of readers</span>
                      {ch.decisionPoint && (
                        <span className="text-amber-600 font-bold flex items-center gap-1">
                          <Vote className="w-3 h-3" />
                          Decision Point
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Connecting Line from Root to Children */}
                  <div className="w-0.5 h-12 bg-[#7D2948]/40 mt-1" />
                </div>
              ))}
            </div>

            {/* Level 2: Community Voted Branches & Alternative Paths */}
            <div className="flex flex-wrap items-start justify-center gap-8 relative">
              {/* Horizontal Connecting Rail */}
              <div className="absolute -top-12 left-24 right-24 h-0.5 bg-[#7D2948]/30 hidden sm:block" />

              {childChapters.map((ch) => (
                <div key={ch.id} className="flex flex-col items-center relative">
                  {/* Vertical drop connecting line */}
                  <div className="w-0.5 h-12 bg-[#7D2948]/40 -mt-12 hidden sm:block" />

                  <div
                    onClick={() => handleBranchClick(ch.id)}
                    className={`w-72 p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-md text-left ${
                      selectedChapterId === ch.id
                        ? 'border-[#7D2948] bg-white dark:bg-[#241F1B] ring-4 ring-[#7D2948]/20'
                        : 'border-[#ECE6DE] dark:border-[#38312B] bg-white/90 dark:bg-[#201C19] hover:border-[#7D2948]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-[#8E7F73]">Part {ch.chapterNumber}</span>
                      {ch.branchType === 'community_choice' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Community Vote
                        </span>
                      )}
                      {ch.branchType === 'alternative' && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold">
                          Alt Ending
                        </span>
                      )}
                    </div>

                    <h4 className="font-display font-bold text-base text-[#1E1B18] dark:text-[#F3ECE4] leading-snug">
                      {ch.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between text-xs text-[#8E7F73]">
                      <span>{ch.branchType === 'community_choice' ? '61% chosen' : '24% explored'}</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Branch Option Card */}
              <div
                onClick={() => {
                  const newChap = createChapterFromWinningChoice('chap-1-1', 'Daniel arrives on the train');
                  setSelectedChapterId(newChap.id);
                }}
                className="w-72 p-5 rounded-2xl border-2 border-dashed border-[#ECE6DE] dark:border-[#38312B] hover:border-[#7D2948] bg-white/50 dark:bg-[#201C19]/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[140px]"
              >
                <div className="w-9 h-9 rounded-full bg-[#7D2948]/10 text-[#7D2948] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="font-display font-semibold text-xs text-[#1E1B18] dark:text-[#F3ECE4]">
                  Spawn Alternative Branch
                </span>
                <span className="text-[10px] text-[#8E7F73] mt-1">
                  Connect from decision choice "Walk away"
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Selected Chapter Node Details & Actions */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-[#ECE6DE] dark:border-[#2E2824] bg-white dark:bg-[#1B1715] p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7D2948] dark:text-[#F3ACB6]">
                Node Inspector
              </span>
              <h3 className="font-display font-bold text-2xl mt-1 text-[#1E1B18] dark:text-[#F3ECE4]">
                {selectedChapter.title}
              </h3>
              <p className="text-xs text-[#8E7F73] mt-1">
                Chapter {selectedChapter.chapterNumber} · {selectedChapter.wordCount} words
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F4F0] dark:bg-[#241F1B] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8E7F73]">Branch Role:</span>
                <span className="font-semibold capitalize">{selectedChapter.branchType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7F73]">Status:</span>
                <span className="font-semibold capitalize text-emerald-600">{selectedChapter.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7F73]">Audio Duration:</span>
                <span className="font-semibold">{Math.round(selectedChapter.audioDurationSeconds / 60)} min</span>
              </div>
            </div>

            {selectedChapter.decisionPoint ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                  <Vote className="w-3.5 h-3.5" />
                  Decision Point attached
                </span>
                <p className="italic text-neutral-700 dark:text-neutral-300">
                  "{selectedChapter.decisionPoint.prompt}"
                </p>
                <div className="space-y-1 pt-1">
                  {selectedChapter.decisionPoint.choices.map((c) => (
                    <div key={c.id} className="flex justify-between text-[11px]">
                      <span>{c.text}</span>
                      <span className="font-bold text-[#7D2948] dark:text-[#F3ACB6]">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8E7F73] italic">
                No branching decision point is attached to this node.
              </p>
            )}

            <div>
              <h5 className="font-bold text-xs uppercase text-[#8E7F73] mb-2">Excerpts:</h5>
              <p className="font-editorial text-xs leading-relaxed line-clamp-6 text-[#4A3F37] dark:text-[#C5BCB3] bg-[#FAF8F5] dark:bg-[#201C19] p-3 rounded-xl border border-[#ECE6DE] dark:border-[#38312B]">
                {selectedChapter.content}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#ECE6DE] dark:border-[#2E2824] flex gap-3">
            <button
              onClick={() => handleReadChapter(selectedChapter.id)}
              className="flex-1 py-2.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {t('tool_read')}
            </button>
            <button
              onClick={() => handleEditChapter(selectedChapter.id)}
              className="flex-1 py-2.5 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {t('writer_edit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
