import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  GitBranch,
  Trophy,
  PenTool,
  Search,
  Bell,
  Sparkles,
  UserCheck,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Shield,
  Layers,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { useStoryVerse, ViewMode } from '../../context/StoryVerseContext';
import { SUPPORTED_LANGUAGES, AppLanguage } from '../../i18n/translations';
import { PWAInstallButton } from '../mobile/PWAInstallButton';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    switchUser,
    currentRole,
    setCurrentRole,
    viewMode,
    setViewMode,
    notifications,
    markNotificationRead,
    readingPrefs,
    setReadingPrefs,
    isDemoMode,
    setIsDemoMode,
    setDemoStep,
    setIsAuthModalOpen,
    setAuthMode,
    setActiveStoryId,
    language,
    setLanguage,
    t,
    isRTL,
    isAndroidPreview,
    toggleAndroidPreview,
  } = useStoryVerse();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNavClick = (view: ViewMode) => {
    setViewMode(view);
  };

  const isDarkMode = readingPrefs.theme === 'dark';

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b ${
        isDarkMode
          ? 'bg-[#181513]/90 border-[#2E2824] text-[#E8E1D9]'
          : 'bg-[#FBF9F5]/90 border-[#ECE6DE] text-[#241F1A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#7D2948] text-white flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:bg-[#68203a] transition-colors">
              <span className="leading-none">S</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight block leading-none">
                StoryVerse
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#8E7F73] font-medium block mt-0.5">
                Interactive Fiction
              </span>
            </div>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-discover-btn"
              onClick={() => handleNavClick('discover')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'discover'
                  ? 'bg-[#7D2948]/10 text-[#7D2948] font-semibold'
                  : 'text-[#61544B] hover:text-[#241F1A] hover:bg-black/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t('nav_discover')}
            </button>

            <button
              id="nav-story-tree-btn"
              onClick={() => {
                setActiveStoryId('story-1');
                handleNavClick('story_tree');
              }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'story_tree'
                  ? 'bg-[#7D2948]/10 text-[#7D2948] font-semibold'
                  : 'text-[#61544B] hover:text-[#241F1A] hover:bg-black/5'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              {t('nav_tree')}
            </button>

            <button
              id="nav-challenges-btn"
              onClick={() => handleNavClick('challenges')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'challenges'
                  ? 'bg-[#7D2948]/10 text-[#7D2948] font-semibold'
                  : 'text-[#61544B] hover:text-[#241F1A] hover:bg-black/5'
              }`}
            >
              <Trophy className="w-4 h-4" />
              {t('nav_challenges')}
            </button>

            <button
              id="nav-writer-studio-btn"
              onClick={() => handleNavClick('writer_dashboard')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'writer_dashboard' || viewMode === 'writer_editor'
                  ? 'bg-[#7D2948] text-white shadow-sm'
                  : 'text-[#7D2948] font-semibold hover:bg-[#7D2948]/10'
              }`}
            >
              <PenTool className="w-4 h-4" />
              {t('nav_writer')}
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Language Switcher (English ↔ Hindi ↔ Urdu) */}
          <div className="flex items-center bg-[#ECE6DE]/80 dark:bg-[#2F2925] p-0.5 rounded-full text-xs font-semibold border border-[#E2DAD0] dark:border-[#3D352F]">
            <button
              id="nav-lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-[#7D2948] text-white shadow-xs font-bold'
                  : 'text-[#61544B] dark:text-[#A89A8D] hover:text-[#241F1A] dark:hover:text-[#F3ECE4]'
              }`}
              title="Switch to English"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
            <button
              id="nav-lang-hi-btn"
              onClick={() => setLanguage('hi')}
              className={`px-2 sm:px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 font-devanagari ${
                language === 'hi'
                  ? 'bg-[#7D2948] text-white shadow-xs font-bold'
                  : 'text-[#61544B] dark:text-[#A89A8D] hover:text-[#241F1A] dark:hover:text-[#F3ECE4]'
              }`}
              title="हिन्दी में बदलें (Switch to Hindi)"
            >
              <span>🇮🇳</span>
              <span>हिन्दी</span>
            </button>
            <div className="relative">
              <button
                id="nav-lang-more-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`p-1 rounded-full transition-colors cursor-pointer text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#F3ECE4] ${
                  language === 'ur' ? 'bg-[#7D2948] text-white font-bold px-2' : ''
                }`}
                title="More languages / Urdu"
              >
                {language === 'ur' ? 'اردو' : <ChevronDown className="w-3 h-3" />}
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8E7F73] border-b border-[#ECE6DE] dark:border-[#38312B] mb-1">
                    {t('nav_select_lang')}
                  </div>
                  {SUPPORTED_LANGUAGES.map((langOpt) => (
                    <button
                      key={langOpt.code}
                      onClick={() => {
                        setLanguage(langOpt.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                        language === langOpt.code
                          ? 'bg-[#7D2948] text-white font-bold'
                          : 'hover:bg-[#F6F4F0] dark:hover:bg-[#2C2723] text-[#1E1B18] dark:text-[#F3ECE4]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{langOpt.flag}</span>
                        <span>{langOpt.nativeName}</span>
                      </span>
                      {language === langOpt.code && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Install Mobile App PWA Button */}
          <PWAInstallButton variant="pill" />

          {/* Android Mobile Simulator Toggle Button */}
          <button
            id="nav-android-preview-btn"
            onClick={toggleAndroidPreview}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
              isAndroidPreview
                ? 'bg-[#10B981] text-white border-emerald-600 shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
            }`}
            title="Toggle Android Mobile App Frame Simulation"
          >
            <span>📱</span>
            <span className="hidden sm:inline">
              {isAndroidPreview ? 'Exit Android View' : 'Android App View'}
            </span>
          </button>

          {/* Investor Demo Flow Trigger */}
          <button
            id="nav-investor-demo-btn"
            onClick={() => {
              setIsDemoMode(!isDemoMode);
              setDemoStep(1);
            }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
              isDemoMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
            title="Launch 18-step interactive investor & product demonstration"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Investor Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Quick Search */}
          <div className="relative">
            <button
              id="nav-search-toggle-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md hover:bg-black/5 text-[#61544B] hover:text-[#241F1A] cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] rounded-xl shadow-xl p-3 z-50">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('tool_search')}
                  className="w-full text-sm px-3 py-2 rounded-lg bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none"
                  autoFocus
                />
                {searchQuery.trim() && (
                  <div className="mt-2 text-xs space-y-1">
                    <button
                      onClick={() => {
                        setActiveStoryId('story-1');
                        setViewMode('story_details');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-[#FBF9F5] dark:hover:bg-[#342E29] flex items-center justify-between"
                    >
                      <span className="font-medium">The Last Door</span>
                      <span className="text-[#8E7F73]">Mystery</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveStoryId('story-2');
                        setViewMode('story_details');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-[#FBF9F5] dark:hover:bg-[#342E29] flex items-center justify-between"
                    >
                      <span className="font-medium">Echoes of the Obsidian Spire</span>
                      <span className="text-[#8E7F73]">Fantasy</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              id="nav-notifications-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-md hover:bg-black/5 text-[#61544B] hover:text-[#241F1A] relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#7D2948]" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] rounded-xl shadow-xl p-4 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECE6DE] dark:border-[#38312B] mb-2">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <span className="text-xs text-[#8E7F73]">{unreadCount} unread</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.storyId) {
                          setActiveStoryId(notif.storyId);
                          setViewMode('story_details');
                        }
                        setIsNotifOpen(false);
                      }}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        notif.read
                          ? 'opacity-70 hover:bg-[#FBF9F5] dark:hover:bg-[#2E2824]'
                          : 'bg-[#7D2948]/5 hover:bg-[#7D2948]/10 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#7D2948] dark:text-[#E8A598] mb-0.5">
                        <span>{notif.title}</span>
                        <span className="text-[#8E7F73]">{notif.timestamp}</span>
                      </div>
                      <p className="text-[#4A3F37] dark:text-[#C5BCB3]">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Quick Toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={() =>
              setReadingPrefs((prev) => ({
                ...prev,
                theme: prev.theme === 'dark' ? 'light' : 'dark',
              }))
            }
            className="p-2 rounded-md hover:bg-black/5 text-[#61544B] hover:text-[#241F1A] cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Direct Sign In & Register Trigger Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              id="nav-auth-login-btn"
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#7D2948]/30 hover:border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6] hover:bg-[#7D2948]/5 dark:hover:bg-[#7D2948]/15 transition-all cursor-pointer"
            >
              <span>{t('nav_login')}</span>
            </button>

            <button
              id="nav-auth-register-btn"
              onClick={() => {
                setAuthMode('register');
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#7D2948] text-white hover:bg-[#68203a] transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <span>{t('nav_register')}</span>
            </button>
          </div>

          {/* User Account / Role Switcher Menu */}
          <div className="relative">
            <button
              id="nav-user-profile-menu-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-[#ECE6DE] dark:border-[#38312B] hover:border-[#7D2948] transition-colors cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-semibold hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#7D2948]/10 text-[#7D2948] dark:bg-[#7D2948]/20 dark:text-[#F3ACB6]">
                {currentRole}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E7F73]" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#231F1C] border border-[#ECE6DE] dark:border-[#38312B] rounded-xl shadow-xl p-3 z-50 text-xs">
                <div className="pb-3 border-b border-[#ECE6DE] dark:border-[#38312B] mb-2">
                  <p className="font-semibold text-sm text-[#241F1A] dark:text-[#E8E1D9]">{currentUser.name}</p>
                  <p className="text-[#8E7F73]">@{currentUser.username}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-[#F6F4F0] dark:bg-[#2C2723] p-1.5 rounded-md">
                    <span>Role:</span>
                    <span className="font-semibold capitalize text-[#7D2948]">{currentRole}</span>
                  </div>
                </div>

                {/* Role Switcher */}
                <div className="space-y-1 mb-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#8E7F73] font-bold px-1">Switch Persona</p>
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        u.id === currentUser.id
                          ? 'bg-[#7D2948]/10 font-bold text-[#7D2948]'
                          : 'hover:bg-[#FBF9F5] dark:hover:bg-[#2E2824]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                        <div>
                          <span>{u.name}</span>
                          <span className="text-[10px] text-[#8E7F73] block capitalize">({u.role})</span>
                        </div>
                      </div>
                      {u.id === currentUser.id && <span className="text-[10px] text-[#7D2948]">Active</span>}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#ECE6DE] dark:border-[#38312B] pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setViewMode('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-[#FBF9F5] dark:hover:bg-[#2E2824] flex items-center gap-2"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    {t('nav_profile')}
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-[#FBF9F5] dark:hover:bg-[#2E2824] flex items-center gap-2 text-[#8E7F73]"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    {t('nav_admin')}
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-[#FBF9F5] dark:hover:bg-[#2E2824] flex items-center gap-2 text-[#7D2948]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t('nav_login')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
