import React, { useState } from 'react';
import {
  User,
  BookOpen,
  Headphones,
  Vote,
  Bookmark,
  Award,
  Flame,
  Calendar,
  Sparkles,
  ChevronRight,
  PenTool,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    stories,
    setActiveStoryId,
    setViewMode,
    switchUser,
    allUsers,
  } = useStoryVerse();

  const [activeTab, setActiveTab] = useState<'stories' | 'library' | 'activity'>('stories');

  const userStories = stories.filter((s) => s.authorId === currentUser.id);
  const bookmarkedStories = stories.filter((s) => currentUser.bookmarks.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Profile Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-md border-2 border-[#7D2948]"
        />

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-[#F3ECE4]">
              {currentUser.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6] text-xs font-bold uppercase tracking-wider">
              {currentUser.role}
            </span>
          </div>

          <p className="text-xs font-mono text-[#8E7F73]">@{currentUser.username}</p>

          <p className="font-editorial text-sm sm:text-base text-[#61544B] dark:text-[#BDB1A5] max-w-2xl leading-relaxed">
            {currentUser.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-3 text-xs text-[#8E7F73]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Joined {currentUser.joinedDate}
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <Flame className="w-3.5 h-3.5" />
              {currentUser.streakDays}-day active reading & writing streak
            </span>
          </div>
        </div>
      </div>

      {/* Stats KPI Overview (Writer + Reader combined badges) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Stories Authored
          </span>
          <p className="font-display font-bold text-2xl text-[#1E1B18] dark:text-[#F3ECE4]">
            {currentUser.storiesCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Followers
          </span>
          <p className="font-display font-bold text-2xl text-[#1E1B18] dark:text-[#F3ECE4]">
            {(currentUser.followersCount ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Decisions Influenced
          </span>
          <p className="font-display font-bold text-2xl text-amber-600">
            {currentUser.decisionsVotedCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24]">
          <span className="text-xs text-[#8E7F73] uppercase tracking-wider block mb-1">
            Listening Hours
          </span>
          <p className="font-display font-bold text-2xl text-purple-600">
            {currentUser.listeningHours}h
          </p>
        </div>
      </div>

      {/* Tabs: Authored Stories, Saved Library, Achievements */}
      <div className="border-b border-[#ECE6DE] dark:border-[#322A24] flex items-center gap-6">
        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer ${
            activeTab === 'stories'
              ? 'border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6]'
              : 'border-transparent text-[#8E7F73]'
          }`}
        >
          Authored Stories ({userStories.length})
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer ${
            activeTab === 'library'
              ? 'border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6]'
              : 'border-transparent text-[#8E7F73]'
          }`}
        >
          Saved Library ({bookmarkedStories.length})
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer ${
            activeTab === 'activity'
              ? 'border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6]'
              : 'border-transparent text-[#8E7F73]'
          }`}
        >
          Badges & Achievements ({currentUser.achievements.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userStories.length === 0 ? (
            <div className="col-span-2 p-12 text-center text-[#8E7F73]">
              <p>No stories authored under this persona yet.</p>
              <button
                onClick={() => setViewMode('writer_dashboard')}
                className="mt-4 px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold"
              >
                Create a Story in Writer Studio
              </button>
            </div>
          ) : (
            userStories.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveStoryId(s.id);
                  setViewMode('story_details');
                }}
                className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex gap-4 cursor-pointer hover:border-[#7D2948] transition-all"
              >
                <img src={s.coverImage} alt="" className="w-20 h-28 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7D2948]">{s.genre}</span>
                    <h4 className="font-display font-bold text-lg leading-tight">{s.title}</h4>
                    <p className="text-xs text-[#8E7F73] line-clamp-2 mt-1">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8E7F73]">
                    <span>{(s.readersCount ?? 0).toLocaleString()} readers</span>
                    <span>{(s.listenersCount ?? 0).toLocaleString()} listeners</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'library' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarkedStories.length === 0 ? (
            <p className="col-span-2 text-center text-[#8E7F73] py-12">
              No saved stories in your library. Explore stories to bookmark!
            </p>
          ) : (
            bookmarkedStories.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveStoryId(s.id);
                  setViewMode('story_details');
                }}
                className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex gap-4 cursor-pointer hover:border-[#7D2948] transition-all"
              >
                <img src={s.coverImage} alt="" className="w-20 h-28 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg leading-tight">{s.title}</h4>
                    <p className="text-xs text-[#8E7F73]">by {s.authorName}</p>
                    <p className="text-xs text-[#61544B] dark:text-[#BDB1A5] line-clamp-2 mt-2">
                      {s.description}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#7D2948] flex items-center gap-1">
                    Read Story <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentUser.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#322A24] flex items-center gap-4"
            >
              <div className="text-3xl">{ach.icon}</div>
              <div>
                <h4 className="font-display font-bold text-base">{ach.title}</h4>
                <p className="text-xs text-[#8E7F73]">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
