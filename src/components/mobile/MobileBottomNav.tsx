import React from 'react';
import {
  Compass,
  GitBranch,
  Trophy,
  PenTool,
  User,
  BookOpen,
} from 'lucide-react';
import { useStoryVerse, ViewMode } from '../../context/StoryVerseContext';

export const MobileBottomNav: React.FC = () => {
  const { viewMode, setViewMode, currentUser, readingPrefs, t, language } = useStoryVerse();

  // If in distraction-free writing studio or full reading mode, author may want distraction-free view
  if (viewMode === 'writer_editor') {
    return null;
  }

  const isDarkMode = readingPrefs.theme === 'dark';

  const navItems: {
    id: ViewMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    {
      id: 'discover',
      label: language === 'hi' ? 'खोजें' : 'Discover',
      icon: Compass,
    },
    {
      id: 'story_tree',
      label: language === 'hi' ? 'मल्टीवर्स' : 'Universe',
      icon: GitBranch,
    },
    {
      id: 'challenges',
      label: language === 'hi' ? 'प्रतियोगिता' : 'Arena',
      icon: Trophy,
    },
    {
      id: 'writer_dashboard',
      label: language === 'hi' ? 'लेखक' : 'Studio',
      icon: PenTool,
    },
    {
      id: 'profile',
      label: language === 'hi' ? 'मेरी प्रोफ़ाइल' : 'Library',
      icon: User,
    },
  ];

  return (
    <nav
      id="mobile-bottom-app-dock"
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-xl transition-colors duration-300 pb-[env(safe-area-inset-bottom)] ${
        isDarkMode
          ? 'bg-[#181513]/95 border-[#2E2824] text-[#E8E1D9]'
          : 'bg-[#FAF8F5]/95 border-[#ECE6DE] text-[#241F1A]'
      } shadow-[0_-4px_20px_rgba(0,0,0,0.08)]`}
      aria-label="Mobile Navigation Dock"
    >
      <div className="grid grid-cols-5 h-15 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = viewMode === item.id || (item.id === 'discover' && viewMode === 'landing');

          return (
            <button
              key={item.id}
              onClick={() => setViewMode(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative group ${
                isActive
                  ? 'text-[#7D2948] dark:text-[#F3ACB6]'
                  : 'text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#F3ECE4]'
              }`}
            >
              {/* Active Indicator Pip */}
              {isActive && (
                <span className="absolute -top-1 w-5 h-1 rounded-full bg-[#7D2948] dark:bg-[#F3ACB6]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-bold' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
