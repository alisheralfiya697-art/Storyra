import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Clock,
  Users,
  Vote,
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { Challenge } from '../../types';

export const ChallengesView: React.FC = () => {
  const { challenges, setViewMode, t } = useStoryVerse();
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(challenges[0]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionExcerpt, setSubmissionExcerpt] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!activeChallenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
      setHasSubmitted(false);
      setSubmissionTitle('');
      setSubmissionExcerpt('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7D2948] dark:text-[#F3ACB6] flex items-center justify-center gap-1.5 mb-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Community Writing Competitions
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
          Writing Challenges
        </h1>
        <p className="font-editorial text-lg text-[#8E7F73] mt-2">
          Compete in interactive story prompts. Readers vote on the most gripping cliffhanger, and the winning branch gets platform-wide promotion.
        </p>
      </div>

      {/* Featured Active Challenge Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#231E1B] to-[#120F0D] text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider">
              Active Challenge
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Deadline: in {activeChallenge.daysRemaining} days
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            {activeChallenge.title}
          </h2>

          <p className="font-editorial text-lg text-neutral-300 leading-relaxed max-w-2xl">
            "{activeChallenge.prompt}"
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Prize: {activeChallenge.prize}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              {(activeChallenge.entriesCount ?? 0).toLocaleString()} submissions
            </span>
            <span className="flex items-center gap-1.5">
              <Vote className="w-4 h-4 text-rose-400" />
              Max {activeChallenge.wordLimit} words
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end relative z-10">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#7D2948] text-white font-semibold text-sm hover:bg-[#963457] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('challenges_submit_entry')}</span>
          </button>
        </div>
      </div>

      {/* Challenge Entries / Leaderboard */}
      <div className="space-y-6">
        <h3 className="font-display text-2xl font-bold text-[#1E1B18] dark:text-[#F3ECE4]">
          {t('challenges_leaderboard')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeChallenge.leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="p-6 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8E7F73] mb-3">
                  <span className="font-bold font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                    Rank #{entry.rank}
                  </span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Vote className="w-3.5 h-3.5" />
                    {(entry.votes ?? 0).toLocaleString()} votes
                  </span>
                </div>

                <h4 className="font-display font-bold text-xl mb-1">{entry.title}</h4>
                <div className="flex items-center gap-2 text-xs text-[#8E7F73] mb-4">
                  <img src={entry.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span>by {entry.author}</span>
                </div>

                <p className="font-editorial text-xs text-[#61544B] dark:text-[#BDB1A5] line-clamp-3 leading-relaxed mb-4">
                  "The conductor tipped his cap as the carriage groaned to a stop inside the pitch-black tunnel. That was when I realized the passenger opposite me was holding a ticket dated fifty years in the future..."
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECE6DE] dark:border-[#322A24] flex items-center justify-between">
                <button
                  onClick={() => setViewMode('discover')}
                  className="text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {t('tool_read')}
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/20 cursor-pointer">
                  Vote for Entry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-display font-bold text-xl">Submit to "{activeChallenge.title}"</h3>

            {hasSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-display font-bold text-lg">Entry Submitted!</h4>
                <p className="text-xs text-[#8E7F73]">
                  Your story is now entered into the community voting pool.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                    Story Title
                  </label>
                  <input
                    type="text"
                    required
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                    placeholder="e.g. The Sleeper in Carriage Four"
                    className="w-full text-sm p-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                    Opening Hook & Decision Cliffhanger
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={submissionExcerpt}
                    onChange={(e) => setSubmissionExcerpt(e.target.value)}
                    placeholder="Paste the opening 500-1000 words including the pivotal decision choice for readers..."
                    className="w-full text-sm p-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#8E7F73]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] cursor-pointer"
                  >
                    Submit Entry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
