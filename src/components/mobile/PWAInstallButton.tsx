import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useStoryVerse } from '../../context/StoryVerseContext';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'pill' | 'banner' | 'card';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const { t, language } = useStoryVerse();

  // If already running inside standalone PWA mode, don't show the prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) setHasPrompted(true);
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Desktop Chrome or generic fallback instructions
      setShowIOSModal(true);
    }
  };

  const buttonText = language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install Mobile App';

  return (
    <>
      {variant === 'pill' ? (
        <button
          id="pwa-install-pill-btn"
          onClick={handleInstallClick}
          className={`px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7D2948] to-[#963457] text-white text-xs font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer border border-[#F3ACB6]/30 ${className}`}
          title="Install StoryVerse as a Native Mobile App"
        >
          <Download className="w-3.5 h-3.5 animate-bounce" />
          <span>{buttonText}</span>
        </button>
      ) : variant === 'banner' ? (
        <div className={`p-4 rounded-2xl bg-gradient-to-r from-[#7D2948] via-[#8B2E50] to-[#501A2E] text-white shadow-xl border border-[#F3ACB6]/20 flex items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20">
              <Smartphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm">StoryVerse Mobile App</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-black font-extrabold uppercase">
                  Fast & Offline
                </span>
              </div>
              <p className="text-[11px] text-[#F3ACB6] mt-0.5 line-clamp-1">
                Install for fullscreen reading, background audio narration, and instant offline access.
              </p>
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="px-4 py-2 rounded-xl bg-white text-[#7D2948] text-xs font-bold hover:bg-[#FAF8F5] transition-transform hover:scale-105 shrink-0 shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{buttonText}</span>
          </button>
        </div>
      ) : (
        <button
          id="pwa-install-compact-btn"
          onClick={handleInstallClick}
          className={`p-2 rounded-lg bg-[#7D2948]/10 dark:bg-[#7D2948]/25 text-[#7D2948] dark:text-[#F3ACB6] hover:bg-[#7D2948] hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${className}`}
          title="Install as Mobile App"
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden sm:inline">{buttonText}</span>
        </button>
      )}

      {/* Guided Mobile Installation Modal (for iOS Safari or Chrome guidance) */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-[#1E1B18] text-white p-6 shadow-2xl border border-white/15 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#7D2948] flex items-center justify-center font-bold font-display text-white">
                  S
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {language === 'hi' ? 'StoryVerse ऐप इंस्टॉल करें' : 'Install StoryVerse Mobile App'}
                  </h3>
                  <span className="text-[10px] text-amber-300 font-semibold">
                    {isIOS ? 'iOS Safari Instructions' : 'Home Screen Setup'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#D8CFBF]">
              {isIOS ? (
                <>
                  <p className="leading-relaxed">
                    Install StoryVerse directly to your iPhone or iPad home screen for an app store-grade experience:
                  </p>
                  <div className="space-y-2.5 bg-black/30 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#7D2948] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                        1
                      </div>
                      <p>
                        Tap the <strong className="text-white inline-flex items-center gap-1 mx-1"><Share className="w-3.5 h-3.5 text-blue-400" /> Share</strong> icon in your Safari bottom navigation bar.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#7D2948] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                        2
                      </div>
                      <p>
                        Scroll down and tap <strong className="text-white inline-flex items-center gap-1 mx-1"><PlusSquare className="w-3.5 h-3.5 text-emerald-400" /> Add to Home Screen</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#7D2948] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                        3
                      </div>
                      <p>
                        Tap <strong className="text-amber-300">Add</strong> at the top right. Launch StoryVerse directly from your home screen!
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="leading-relaxed">
                    Install StoryVerse on your phone or desktop to access:
                  </p>
                  <ul className="space-y-2 bg-black/30 p-3.5 rounded-2xl border border-white/10">
                    <li className="flex items-center gap-2 text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Instant home screen launch with zero browser address bar</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Full offline story reading and cached audio narration</span>
                    </li>
                    <li className="flex items-center gap-2 text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Ultra-fast 60fps native feel with background audio playback</span>
                    </li>
                  </ul>
                  {isInstallable && (
                    <button
                      onClick={async () => {
                        await install();
                        setShowIOSModal(false);
                      }}
                      className="w-full py-3 rounded-xl bg-[#7D2948] hover:bg-[#963457] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Confirm Install</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'समझ गए' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
