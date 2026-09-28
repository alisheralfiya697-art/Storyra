import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Users,
  BookOpen,
  Headphones,
  Vote,
  CheckCircle2,
  AlertTriangle,
  Star,
  Trash2,
  Check,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

export const AdminDashboard: React.FC = () => {
  const { stories, comments, setViewMode } = useStoryVerse();

  const [moderatedComments, setModeratedComments] = useState(comments);
  const [featuredStoryIds, setFeaturedStoryIds] = useState<string[]>(['story-1', 'story-2']);

  const toggleFeatureStory = (id: string) => {
    if (featuredStoryIds.includes(id)) {
      setFeaturedStoryIds(featuredStoryIds.filter((s) => s !== id));
    } else {
      setFeaturedStoryIds([...featuredStoryIds, id]);
    }
  };

  const handleApproveComment = (id: string) => {
    setModeratedComments(moderatedComments.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#ECE6DE] dark:border-[#322A24]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('discover')}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#7D2948]" />
              <h1 className="font-display font-bold text-2xl sm:text-3xl">Platform Admin</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6]">
                Superadmin Mode
              </span>
            </div>
            <p className="text-xs text-[#8E7F73]">
              StoryVerse platform integrity, story moderation, featured spotlights, and voting audits.
            </p>
          </div>
        </div>
      </div>

      {/* Platform System Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Registered Writers & Readers
          </span>
          <p className="font-display font-bold text-2xl">42,890</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+1,240 this week</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Active Stories Published
          </span>
          <p className="font-display font-bold text-2xl">3,412</p>
          <span className="text-[10px] text-purple-600 font-semibold">1,820 interactive</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Decisions Resolved
          </span>
          <p className="font-display font-bold text-2xl text-amber-600">8,120</p>
          <span className="text-[10px] text-amber-600 font-semibold">99.9% fraud-free votes</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Audio Narration Hours
          </span>
          <p className="font-display font-bold text-2xl text-[#7D2948] dark:text-[#F3ACB6]">
            128,400 hrs
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Voice engine healthy</span>
        </div>
      </div>

      {/* Featured Stories Management */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">Featured Spotlight Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img src={s.coverImage} alt="" className="w-12 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-display font-bold text-sm">{s.title}</h4>
                  <p className="text-xs text-[#8E7F73]">by {s.authorName} · {(s.readersCount ?? 0).toLocaleString()} readers</p>
                </div>
              </div>

              <button
                onClick={() => toggleFeatureStory(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  featuredStoryIds.includes(s.id)
                    ? 'bg-amber-500 text-black'
                    : 'border border-[#ECE6DE] dark:border-[#38312B] hover:bg-black/5'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>{featuredStoryIds.includes(s.id) ? 'Featured' : 'Promote'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">Content & Spoiler Moderation</h3>
        <div className="space-y-3">
          {moderatedComments.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8E7F73] mb-1">
                  <span className="font-semibold text-[#1E1B18] dark:text-[#F3ECE4]">{comm.userName}</span>
                  <span>·</span>
                  <span>{comm.isSpoiler ? 'Marked as Spoiler' : 'Public Discussion'}</span>
                </div>
                <p className="font-editorial text-xs text-[#4A3F37] dark:text-[#C5BCB3]">"{comm.text}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleApproveComment(comm.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => handleApproveComment(comm.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold hover:bg-rose-500/20 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
