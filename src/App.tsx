/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoryVerseProvider, useStoryVerse } from './context/StoryVerseContext';
import { Navbar } from './components/navigation/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { DiscoverView } from './components/discovery/DiscoverView';
import { StoryDetailsView } from './components/story/StoryDetailsView';
import { ImmersiveReaderView } from './components/reader/ImmersiveReaderView';
import { WriterDashboard } from './components/writer/WriterDashboard';
import { DistractionFreeEditor } from './components/writer/DistractionFreeEditor';
import { StoryTreeEditor } from './components/writer/StoryTreeEditor';
import { StoryPulseAnalytics } from './components/writer/StoryPulseAnalytics';
import { ChallengesView } from './components/challenges/ChallengesView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AudioPlayer } from './components/audio/AudioPlayer';
import { AuthModal } from './components/auth/AuthModal';
import { InvestorDemoBanner } from './components/demo/InvestorDemoBanner';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { OfflineIndicator } from './components/mobile/OfflineIndicator';
import { AndroidSimulatorFrame } from './components/mobile/AndroidSimulatorFrame';

const MainContent: React.FC = () => {
  const { viewMode, readingPrefs, audioState, isRTL, isAndroidPreview, toggleAndroidPreview } = useStoryVerse();

  const isDarkMode = readingPrefs.theme === 'dark';
  const isSepia = readingPrefs.theme === 'sepia';

  // In full distraction-free reading or writing mode, we can hide the top global navbar
  const hideGlobalNavbar = viewMode === 'writer_editor';
  const hasAudio = !!(audioState.activeChapterId || audioState.chapterId);
  const bottomPaddingClass =
    viewMode === 'writer_editor'
      ? ''
      : hasAudio
      ? 'pb-40 md:pb-24'
      : 'pb-18 md:pb-0';

  return (
    <AndroidSimulatorFrame isActive={isAndroidPreview} onToggle={toggleAndroidPreview}>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`min-h-screen transition-colors duration-300 font-sans-ui flex flex-col ${
          isDarkMode
            ? 'bg-[#151210] text-[#E8E1D9]'
            : isSepia && viewMode === 'read'
            ? 'bg-[#F4ECD8] text-[#3D3226]'
            : 'bg-[#FAF8F5] text-[#241F1A]'
        } ${bottomPaddingClass}`}
      >
        {/* Offline Status Toast */}
        <OfflineIndicator />

        {/* Demo Banner */}
        {!isAndroidPreview && <InvestorDemoBanner />}

        {/* Main Global Navbar */}
        {!hideGlobalNavbar && <Navbar />}

        {/* Router View */}
        <main className="flex-1">
          {viewMode === 'landing' && <LandingPage />}
          {viewMode === 'discover' && <DiscoverView />}
          {viewMode === 'story_details' && <StoryDetailsView />}
          {viewMode === 'read' && <ImmersiveReaderView />}
          {viewMode === 'writer_dashboard' && <WriterDashboard />}
          {viewMode === 'writer_editor' && <DistractionFreeEditor />}
          {viewMode === 'story_tree' && <StoryTreeEditor />}
          {viewMode === 'story_pulse' && <StoryPulseAnalytics />}
          {viewMode === 'challenges' && <ChallengesView />}
          {viewMode === 'profile' && <ProfileView />}
          {viewMode === 'admin' && <AdminDashboard />}
        </main>

        {/* Persistent Mini Audio Player */}
        <AudioPlayer />

        {/* Native-style Mobile Bottom App Dock */}
        <MobileBottomNav />

        {/* Authentication / Persona Switcher Modal */}
        <AuthModal />
      </div>
    </AndroidSimulatorFrame>
  );
};

export default function App() {
  return (
    <StoryVerseProvider>
      <MainContent />
    </StoryVerseProvider>
  );
}
