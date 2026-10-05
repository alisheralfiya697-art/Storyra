# StoryVerse Android Mobile Application (React Native + Expo)

A production-ready Android mobile application rebuilt from the StoryVerse web platform using **React Native**, **Expo**, and **React Navigation**.

---

## 📱 Features

1. **Native Android Navigation**:
   - Bottom Tab Navigation (`Home`, `Discover`, `Universe / Tree`, `Studio`, `Profile`).
   - Native Stack transitions with hardware Android Back button handling.
   - Modal presentation for Full-Screen Audio Listening Theater.

2. **Flagship Interactive Reading & Listening**:
   - Distraction-free mobile reading experience with customizable fonts and themes (Light, Sepia, Dark).
   - In-line Community Decision Polls with animated percentage bars.
   - Dual-format Read ↔ Listen synchronization: switch between reading prose and listening to AI narration seamlessly.

3. **Multilingual Architecture (English ↔ हिन्दी)**:
   - Full bilingual support with persistent language preference.
   - Natural Devanagari Hindi font support with proper line-height.

4. **Offline Persistence & Secure Storage**:
   - `AsyncStorage` caching for story progress, votes, bookmarks, and user session.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) installed on your Android device (or an Android Emulator / Android Studio).

### Installation & Run

```bash
# 1. Navigate to the mobile app folder
cd mobile-app

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

Press **`a`** in your terminal to launch directly on an Android Emulator or connected physical device via USB, or scan the QR code with the Expo Go app.

---

## 📦 Building Standalone Android APK & AAB (EAS Build)

To build a standalone APK for testing on any Android device:

```bash
# Install EAS CLI globally if you haven't already
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build standalone Android APK (direct installable file)
eas build -p android --profile preview

# Build production Google Play Store bundle (AAB)
eas build -p android --profile production
```

---

## 🏗️ Project Structure

```
mobile-app/
├── app.json                  # Expo & Android native package configuration
├── eas.json                  # EAS Build configuration for APK & AAB
├── package.json
├── tsconfig.json
├── App.tsx                   # Main React Native entry point
└── src/
    ├── api/
    │   └── storyverseApi.ts  # REST API service connecting to backend
    ├── components/
    │   ├── AudioMiniPlayer.tsx
    │   └── StoryCard.tsx
    ├── constants/
    │   └── theme.ts          # Luxury burgundy theme & spacing
    ├── navigation/
    │   ├── BottomTabNavigator.tsx
    │   └── RootNavigator.tsx
    ├── screens/
    │   ├── AudioPlayerScreen.tsx
    │   ├── DiscoverScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── ProfileScreen.tsx
    │   ├── ReaderScreen.tsx
    │   ├── StoryDetailsScreen.tsx
    │   ├── StoryTreeScreen.tsx
    │   └── WriterStudioScreen.tsx
    ├── services/
    │   ├── i18nService.ts    # English ↔ Hindi translations
    │   └── storageService.ts # Local storage persistence
    └── types/
        └── index.ts
```
