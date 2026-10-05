import React from 'react';
import { Smartphone, Wifi, Battery, ChevronLeft, Circle, Square, X } from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';

interface AndroidSimulatorFrameProps {
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
}

export const AndroidSimulatorFrame: React.FC<AndroidSimulatorFrameProps> = ({
  children,
  isActive,
  onToggle,
}) => {
  const { viewMode, setViewMode } = useStoryVerse();

  if (!isActive) {
    return <>{children}</>;
  }

  const handleAndroidBack = () => {
    if (viewMode === 'read') {
      setViewMode('story_details');
    } else if (viewMode === 'story_details') {
      setViewMode('discover');
    } else if (viewMode !== 'landing' && viewMode !== 'discover') {
      setViewMode('discover');
    } else {
      setViewMode('landing');
    }
  };

  const handleAndroidHome = () => {
    setViewMode('discover');
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] py-6 px-4 flex flex-col items-center justify-center">
      {/* Simulator Control Bar */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between text-xs text-neutral-400 px-2">
        <div className="flex items-center gap-1.5 text-white font-semibold">
          <Smartphone className="w-4 h-4 text-[#F3ACB6]" />
          <span>Android Pixel Simulator (390×844)</span>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Android View</span>
        </button>
      </div>

      {/* Realistic Android Phone Device Outer Bezel */}
      <div className="relative w-full max-w-[395px] h-[835px] bg-[#1E1B18] rounded-[48px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden">
        {/* Device Inner Screen Container */}
        <div className="relative w-full flex-1 bg-[#FAF8F5] dark:bg-[#151210] rounded-[36px] overflow-hidden flex flex-col shadow-inner">
          {/* Android Status Bar */}
          <div className="h-9 w-full bg-[#181513] text-white px-5 flex items-center justify-between text-[11px] font-semibold shrink-0 z-50 select-none">
            <span>09:41</span>
            {/* Punch-hole camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/20 -mt-0.5" />
            <div className="flex items-center gap-1.5 text-neutral-300">
              <span className="text-[9px] font-bold text-amber-300">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Screen Scrollable Content */}
          <div className="flex-1 overflow-y-auto relative overscroll-none">
            {children}
          </div>

          {/* Android System 3-Button Navigation Bar */}
          <div className="h-10 w-full bg-[#12100E] text-neutral-400 flex items-center justify-around shrink-0 z-50 border-t border-white/5 select-none">
            <button
              onClick={handleAndroidBack}
              className="p-2 hover:text-white transition-colors cursor-pointer"
              title="Android Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleAndroidHome}
              className="p-2 hover:text-white transition-colors cursor-pointer"
              title="Android Home"
            >
              <Circle className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={() => setViewMode('discover')}
              className="p-2 hover:text-white transition-colors cursor-pointer"
              title="Android Overview"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
