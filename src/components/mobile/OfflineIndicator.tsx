import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useStoryVerse } from '../../context/StoryVerseContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useStoryVerse();

  if (isOnline) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1B18]/95 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in slide-in-from-top duration-300">
      <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      <span>
        {language === 'hi'
          ? 'ऑफ़लाइन मोड — कैश्ड कहानियाँ उपलब्ध हैं'
          : 'Offline Mode — Cached stories & audio available'}
      </span>
    </div>
  );
};
