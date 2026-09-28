import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    switchUser,
    setCurrentRole,
    language,
    setLanguage,
    t,
    isRTL,
  } = useStoryVerse();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('writer');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      if (selectedRole === 'writer') {
        switchUser('user-1'); // Aisha Khan
      } else {
        switchUser('user-2'); // Elena Vance
      }
      setIsSuccess(false);
      setIsAuthModalOpen(false);
    }, 1000);
  };

  const handleQuickLogin = (userId: string) => {
    switchUser(userId);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        {/* Modal Header & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE6DE] dark:border-[#38312B]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7D2948] text-white flex items-center justify-center font-display font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight text-[#1E1B18] dark:text-[#F3ECE4]">
                {authMode === 'login' ? t('auth_welcome_back') : t('auth_join_storyverse')}
              </h3>
              <p className="text-[11px] text-[#8E7F73]">
                {t('app_name')} · {t('app_tagline')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="cursor-pointer p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#8E7F73] transition-colors"
            aria-label={t('tool_close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 p-1 bg-[#F6F4F0] dark:bg-[#2A2420] rounded-2xl border border-[#ECE6DE] dark:border-[#38312B]">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white dark:bg-[#201C19] text-[#7D2948] dark:text-[#F3ACB6] shadow-sm'
                : 'text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9]'
            }`}
          >
            {t('nav_login')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white dark:bg-[#201C19] text-[#7D2948] dark:text-[#F3ACB6] shadow-sm'
                : 'text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9]'
            }`}
          >
            {t('nav_register')}
          </button>
        </div>

        {/* Language Selection: English, Hindi, Urdu */}
        <div className="p-4 rounded-2xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-[#ECE6DE] dark:border-[#38312B] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E7F73] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#7D2948]" />
              {t('lang_prompt')}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7D2948]/10 text-[#7D2948] dark:text-[#F3ACB6]">
              {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी (Hindi)' : 'اردو (Urdu)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                language === 'en'
                  ? 'border-[#7D2948] bg-[#7D2948] text-white shadow-sm font-bold scale-[1.02]'
                  : 'border-[#ECE6DE] dark:border-[#38312B] bg-white dark:bg-[#201C19] hover:border-[#7D2948]/50 text-[#1E1B18] dark:text-[#F3ECE4]'
              }`}
            >
              <span className="text-base leading-none">🇬🇧</span>
              <span className="font-bold">English</span>
              <span className={`text-[9px] ${language === 'en' ? 'text-white/80' : 'text-[#8E7F73]'}`}>Default</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                language === 'hi'
                  ? 'border-[#7D2948] bg-[#7D2948] text-white shadow-sm font-bold scale-[1.02]'
                  : 'border-[#ECE6DE] dark:border-[#38312B] bg-white dark:bg-[#201C19] hover:border-[#7D2948]/50 text-[#1E1B18] dark:text-[#F3ECE4]'
              }`}
            >
              <span className="text-base leading-none">🇮🇳</span>
              <span className="font-bold">हिन्दी</span>
              <span className={`text-[9px] ${language === 'hi' ? 'text-white/80' : 'text-[#8E7F73]'}`}>हिंदी टूल्स</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('ur')}
              className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                language === 'ur'
                  ? 'border-[#7D2948] bg-[#7D2948] text-white shadow-sm font-bold scale-[1.02]'
                  : 'border-[#ECE6DE] dark:border-[#38312B] bg-white dark:bg-[#201C19] hover:border-[#7D2948]/50 text-[#1E1B18] dark:text-[#F3ECE4]'
              }`}
            >
              <span className="text-base leading-none">🇵🇰</span>
              <span className="font-bold">اردو</span>
              <span className={`text-[9px] ${language === 'ur' ? 'text-white/80' : 'text-[#8E7F73]'}`}>اردو ٹولز</span>
            </button>
          </div>

          <p className="text-[11px] text-[#8E7F73] text-center leading-snug">
            {t('lang_subtext')}
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-display font-bold text-lg">{t('auth_authenticated')}</h4>
            <p className="text-xs text-[#8E7F73]">{t('auth_setting_up')}</p>
          </div>
        ) : (
          <>
            {/* Persona Quick Switch for rapid testing */}
            <div className="p-3 rounded-2xl bg-[#F6F4F0] dark:bg-[#2C2723] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7F73] block">
                {t('auth_instant_demo')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('user-1')}
                  className="p-2 rounded-xl bg-white dark:bg-[#201C19] text-left border border-black/5 hover:border-[#7D2948] transition-colors cursor-pointer"
                >
                  <p className="font-bold text-xs">Aisha Khan</p>
                  <span className="text-[10px] text-[#7D2948] font-medium">{t('auth_writer_mode')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('user-2')}
                  className="p-2 rounded-xl bg-white dark:bg-[#201C19] text-left border border-black/5 hover:border-[#7D2948] transition-colors cursor-pointer"
                >
                  <p className="font-bold text-xs">Elena Vance</p>
                  <span className="text-[10px] text-purple-600 font-medium">{t('auth_reader_mode')}</span>
                </button>
              </div>
            </div>

            {/* Google OAuth Simulation Button */}
            <button
              type="button"
              onClick={() => handleQuickLogin('user-1')}
              className="w-full py-2.5 px-4 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{t('auth_google_login')}</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#8E7F73]">
              <div className="flex-1 h-[1px] bg-[#ECE6DE] dark:bg-[#38312B]" />
              <span>{t('auth_or_email')}</span>
              <div className="flex-1 h-[1px] bg-[#ECE6DE] dark:bg-[#38312B]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {authMode === 'signup' && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                    {t('auth_role_prompt')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('writer')}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors cursor-pointer ${
                        selectedRole === 'writer'
                          ? 'border-[#7D2948] bg-[#7D2948]/10 text-[#7D2948]'
                          : 'border-[#ECE6DE] dark:border-[#38312B]'
                      }`}
                    >
                      {t('auth_role_write')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('reader')}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors cursor-pointer ${
                        selectedRole === 'reader'
                          ? 'border-[#7D2948] bg-[#7D2948]/10 text-[#7D2948]'
                          : 'border-[#ECE6DE] dark:border-[#38312B]'
                      }`}
                    >
                      {t('auth_role_read')}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                  {t('auth_email_label')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8E7F73] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="author@storyverse.io"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                  {t('auth_password_label')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8E7F73] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] border border-transparent focus:border-[#7D2948] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors cursor-pointer shadow-sm"
              >
                {authMode === 'login' ? t('auth_sign_in_btn') : t('auth_create_account_btn')}
              </button>
            </form>

            <div className="text-center text-xs text-[#8E7F73]">
              {authMode === 'login' ? (
                <span>
                  {t('auth_no_account')}{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-[#7D2948] dark:text-[#F3ACB6] font-semibold hover:underline cursor-pointer"
                  >
                    {t('auth_signup_link')}
                  </button>
                </span>
              ) : (
                <span>
                  {t('auth_have_account')}{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-[#7D2948] dark:text-[#F3ACB6] font-semibold hover:underline cursor-pointer"
                  >
                    {t('auth_signin_link')}
                  </button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
