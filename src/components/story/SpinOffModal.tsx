import React, { useState } from 'react';
import {
  GitBranch,
  X,
  Sparkles,
  Trophy,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

interface SpinOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultForkedChapterId?: string;
  defaultForkedDecisionText?: string;
}

export const SpinOffModal: React.FC<SpinOffModalProps> = ({
  isOpen,
  onClose,
  defaultForkedChapterId,
  defaultForkedDecisionText,
}) => {
  const { activeStory, chapters, createSpinOff, setViewMode } = useStoryVerse();

  const storyChapters = activeStory
    ? chapters.filter((c) => c.storyId === activeStory.id)
    : [];

  const [forkChapterId, setForkChapterId] = useState<string>(
    defaultForkedChapterId || (storyChapters[0]?.id || '')
  );
  const [forkDecisionText, setForkDecisionText] = useState<string>(
    defaultForkedDecisionText ||
      storyChapters[0]?.decisionPoint?.prompt ||
      'Divergent community path'
  );
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [openingContent, setOpeningContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !activeStory) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !openingContent.trim()) return;

    setIsSubmitting(true);

    try {
      createSpinOff({
        originalStoryId: activeStory.id,
        title: title.trim(),
        subtitle: subtitle.trim() || 'A Community Canon Branch',
        description: description.trim(),
        forkedFromChapterId: forkChapterId,
        forkedFromDecisionText: forkDecisionText,
        content: openingContent.trim(),
      });

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#1E1A17] border-2 border-[#7D2948]/30 dark:border-[#7D2948]/50 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#7D2948] via-[#923255] to-[#C47D5A] p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 block">
                  Community Canon Arena
                </span>
                <h3 className="font-display font-bold text-2xl">
                  Write a Competitive Spin-Off
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-xs text-white/90 leading-relaxed font-editorial">
            Branch off from <strong>"{activeStory.title}"</strong>. If your
            spin-off reaches <strong>1,000 reader votes</strong>, the community
            inducts it into official StoryVerse Canon!
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Fork Point Selection */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
              <GitBranch className="w-4 h-4" />
              <span>Divergence Point</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#8E7F73] uppercase tracking-wider mb-1">
                  Branch From Chapter
                </label>
                <select
                  value={forkChapterId}
                  onChange={(e) => {
                    setForkChapterId(e.target.value);
                    const selected = storyChapters.find(
                      (c) => c.id === e.target.value
                    );
                    if (selected?.decisionPoint) {
                      setForkDecisionText(selected.decisionPoint.prompt);
                    }
                  }}
                  className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-[#28221D] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none font-medium"
                >
                  {storyChapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      Part {c.chapterNumber}: {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8E7F73] uppercase tracking-wider mb-1">
                  Plot Decision or Alternate Premise
                </label>
                <input
                  type="text"
                  value={forkDecisionText}
                  onChange={(e) => setForkDecisionText(e.target.value)}
                  placeholder="e.g., What if Daniel took the key?"
                  className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-[#28221D] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#241F1A] dark:text-[#E8E1D9] mb-1">
                Spin-Off Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Counterweight Vault"
                className="w-full text-sm p-3 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#241F1A] dark:text-[#E8E1D9] mb-1">
                Subtitle or Tagline
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Secrets buried beneath the gears"
                className="w-full text-sm p-3 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none font-medium"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-xs font-bold text-[#241F1A] dark:text-[#E8E1D9] mb-1">
              Story Synopsis & Premise *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the alternate direction, stakes, and why readers should vote this branch into official canon..."
              className="w-full text-sm p-3 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none"
            />
          </div>

          {/* Chapter 1 Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#241F1A] dark:text-[#E8E1D9]">
                Opening Scene (Chapter 1) *
              </label>
              <span className="text-[11px] text-[#8E7F73]">
                {openingContent.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              required
              rows={6}
              value={openingContent}
              onChange={(e) => setOpeningContent(e.target.value)}
              placeholder="Write the opening prose of your divergent story branch..."
              className="w-full font-editorial text-sm p-3.5 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] text-[#241F1A] dark:text-[#E8E1D9] focus:border-[#7D2948] outline-none leading-relaxed"
            />
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#ECE6DE] dark:border-[#38312B] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#8E7F73]">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Starts as a Canon Contender with 1 community vote.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !description.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7D2948] to-[#C47D5A] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                Launch Into Canon Arena
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
