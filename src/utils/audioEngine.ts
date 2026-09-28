/**
 * Audio Engine for StoryVerse
 * Features specialized "Thin & Attractive" voice synthesis:
 * - Elevated fundamental pitch & bright formant tuning (1.14x - 1.25x)
 * - Strict filtering of thick/heavy/boomy bass voices in favor of crystal-clear, melodic, attractive voices
 * - Web Audio ambient crystalline acoustic luster for enchanting listener immersion
 * - Synchronization with reader text positions
 */

export interface VoiceStyleConfig {
  id: string;
  name: string;
  pitch: number;
  rate: number;
  tag: string;
  description: string;
}

export const VOICE_STYLE_CONFIGS: Record<string, VoiceStyleConfig> = {
  'Alluring Silk': {
    id: 'Alluring Silk',
    name: 'Alluring Silk',
    pitch: 1.18,
    rate: 1.03,
    tag: 'Thin & Alluring',
    description: 'Slender, bright, captivating voice with velvety sweetness and zero bass boominess.',
  },
  'Airy Siren': {
    id: 'Airy Siren',
    name: 'Airy Siren',
    pitch: 1.24,
    rate: 1.05,
    tag: 'Ultra-Thin & Enchanting',
    description: 'Whisper-light, crystalline timbre that effortlessly draws the listener into the story.',
  },
  'Crystal Velvet': {
    id: 'Crystal Velvet',
    name: 'Crystal Velvet',
    pitch: 1.14,
    rate: 1.02,
    tag: 'Crisp & Refined',
    description: 'Articulate high-register presence with elegant inflection and pure clarity.',
  },
  'Gentle Melodic': {
    id: 'Gentle Melodic',
    name: 'Gentle Melodic',
    pitch: 1.16,
    rate: 0.98,
    tag: 'Soft & Intimate',
    description: 'Tender, slender cadence with gentle pacing and enchanting melodic warmth.',
  },
  'Dramatic Shimmer': {
    id: 'Dramatic Shimmer',
    name: 'Dramatic Shimmer',
    pitch: 1.15,
    rate: 1.07,
    tag: 'Radiant Suspense',
    description: 'Dynamic high-register inflections with thrilling suspense and zero heavy chest drag.',
  },
  // Legacy aliases mapped directly to thin, attractive configurations:
  Storyteller: {
    id: 'Storyteller',
    name: 'Alluring Silk (Storyteller)',
    pitch: 1.18,
    rate: 1.03,
    tag: 'Thin & Alluring',
    description: 'Editorial voice tuned for maximum charm, clarity, and alluring timbre.',
  },
  Calm: {
    id: 'Calm',
    name: 'Gentle Melodic (Calm)',
    pitch: 1.15,
    rate: 0.98,
    tag: 'Soft & Slender',
    description: 'Airy, delicate, tranquil pacing with crystal clear lightness.',
  },
  Dramatic: {
    id: 'Dramatic',
    name: 'Dramatic Shimmer',
    pitch: 1.16,
    rate: 1.07,
    tag: 'Radiant & Dynamic',
    description: 'Lively, sparkling cadence with dramatic peaks and slender articulation.',
  },
  Emotional: {
    id: 'Emotional',
    name: 'Airy Siren (Emotional)',
    pitch: 1.20,
    rate: 1.0,
    tag: 'Enchanting & Tender',
    description: 'Intimate high-clarity voice that resonates with delicate emotional depth.',
  },
  Suspenseful: {
    id: 'Suspenseful',
    name: 'Crystal Velvet (Suspense)',
    pitch: 1.14,
    rate: 1.02,
    tag: 'Crisp Whispers',
    description: 'Hushed, delicate cadence that builds breathtaking suspense without heavy rumble.',
  },
};

// Keywords to discover thin, bright, feminine, melodic, attractive voices in Web Speech
const ATTRACTIVE_VOICE_PREFERRED_NAMES = [
  'natural',
  'enhanced',
  'aria',
  'jenny',
  'ava',
  'serena',
  'samantha',
  'victoria',
  'allison',
  'zoe',
  'sonia',
  'libby',
  'karen',
  'moira',
  'fiona',
  'tessa',
  'kate',
  'google uk english female',
  'google us english',
  'female',
  'en-us-standard-c',
  'en-us-standard-e',
  'en-us-standard-f',
  'en-us-wavenet-c',
  'en-us-wavenet-f',
];

// Names that produce thick, heavy, robotic, or boomy/muddy bass voices to exclude
const THICK_VOICE_EXCLUSIONS = [
  'david',
  'mark',
  'george',
  'fred',
  'espeak',
  'zira',
  'ralph',
  'albert',
  'bad news',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'deranged',
  'good news',
  'hysterical',
  'pipe organ',
  'trinoids',
  'whisper',
  'zarvox',
  'alex',
];

class StoryVerseAudioEngine {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private onTimeUpdateCallback: ((time: number, progressPct: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private simulationInterval: number | null = null;
  private currentTime = 0;
  private totalDuration = 480;
  private playbackRate = 1;
  private currentStyle = 'Alluring Silk';
  private customPitchModifier = 1.0;
  private ambientShimmerEnabled = true;

  // Web Audio Context for ethereal crystalline ambient tone
  private audioCtx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];

  public getSpeechVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices();
  }

  /**
   * Discovers and returns the highest quality "thin and attractive" voice
   * available on the current operating system and browser for the requested language.
   */
  public getBestAttractiveThinVoice(lang: 'en' | 'hi' = 'en'): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    if (lang === 'hi') {
      // Find Hindi voices
      const hindiVoices = voices.filter(
        (v) =>
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.toLowerCase().includes('हिन्दी')
      );

      if (hindiVoices.length > 0) {
        // Prefer female/natural Hindi voices if present
        const femaleHindi = hindiVoices.find(
          (v) =>
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('natural') ||
            v.name.toLowerCase().includes('lekha') ||
            v.name.toLowerCase().includes('kalpana')
        );
        return femaleHindi || hindiVoices[0];
      }
      // If no native Hindi voice is installed on OS, return null so browser can use lang tag
      return null;
    }

    // English voices
    const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
    const candidateVoices = englishVoices.length > 0 ? englishVoices : voices;

    // Reject thick, boomy or muddy voices
    const nonThickVoices = candidateVoices.filter((v) => {
      const name = v.name.toLowerCase();
      return !THICK_VOICE_EXCLUSIONS.some((bad) => name.includes(bad));
    });

    const pool = nonThickVoices.length > 0 ? nonThickVoices : candidateVoices;

    // Score based on preference for thin, clear, attractive female/natural voice names
    let bestScore = -1;
    let bestVoice: SpeechSynthesisVoice = pool[0];

    for (const voice of pool) {
      const name = voice.name.toLowerCase();
      let score = 0;

      for (let i = 0; i < ATTRACTIVE_VOICE_PREFERRED_NAMES.length; i++) {
        const pref = ATTRACTIVE_VOICE_PREFERRED_NAMES[i];
        if (name.includes(pref)) {
          // Earlier preferred names yield higher priority
          score += (ATTRACTIVE_VOICE_PREFERRED_NAMES.length - i) * 10;
        }
      }

      if (name.includes('female')) score += 25;
      if (name.includes('natural')) score += 30;
      if (name.includes('enhanced')) score += 20;

      if (score > bestScore) {
        bestScore = score;
        bestVoice = voice;
      }
    }

    return bestVoice;
  }

  public setCallbacks(
    onTimeUpdate: (time: number, progressPct: number) => void,
    onEnd: () => void
  ) {
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndCallback = onEnd;
  }

  public setCustomPitchModifier(modifier: number) {
    this.customPitchModifier = Math.max(0.9, Math.min(1.35, modifier));
  }

  public setAmbientShimmer(enabled: boolean) {
    this.ambientShimmerEnabled = enabled;
    if (!enabled) {
      this.stopAmbientShimmer();
    } else if (this.isSpeaking) {
      this.startAmbientShimmer();
    }
  }

  public isAmbientShimmerEnabled(): boolean {
    return this.ambientShimmerEnabled;
  }

  /**
   * Plays story narration with the thin, attractive voice settings.
   */
  public playNarration({
    text,
    style = 'Alluring Silk',
    language = 'en',
    startPositionFraction = 0,
    durationSeconds = 480,
    speed = 1,
  }: {
    text: string;
    style?: string;
    language?: 'en' | 'hi';
    startPositionFraction?: number;
    durationSeconds?: number;
    speed?: number;
  }) {
    this.currentStyle = style;
    this.totalDuration = durationSeconds;
    this.playbackRate = speed;
    this.currentTime = Math.floor(startPositionFraction * durationSeconds);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Determine text slice starting around fraction
      const totalChars = text.length;
      const startChar = Math.floor(startPositionFraction * totalChars);
      const textToSpeak = text.slice(startChar) || text;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      const styleConfig = VOICE_STYLE_CONFIGS[style] || VOICE_STYLE_CONFIGS['Alluring Silk'];

      // Crucial: Pitch is elevated (1.14 - 1.25) to strip out heavy/thick chest boominess
      // and give the voice an attractive, slender, crystalline quality
      const finalPitch = Math.min(2.0, (styleConfig.pitch || 1.18) * this.customPitchModifier);
      utterance.pitch = finalPitch;
      utterance.rate = (styleConfig.rate || 1.03) * speed;

      const preferredVoice = this.getBestAttractiveThinVoice(language);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.stopSimulation();
        this.stopAmbientShimmer();
        this.isSpeaking = false;
        if (this.onEndCallback) this.onEndCallback();
      };

      utterance.onerror = () => {
        // SpeechSynthesis error fallback
      };

      this.utterance = utterance;
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback to internal timer simulation
      }
    }

    this.isSpeaking = true;
    this.startSimulation();
    if (this.ambientShimmerEnabled) {
      this.startAmbientShimmer();
    }
  }

  /**
   * Speaks a short, charming sample sentence in the specified thin & attractive voice.
   */
  public previewVoice(styleName = 'Alluring Silk', language: 'en' | 'hi' = 'en') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const sampleLinesEn: Record<string, string> = {
      'Alluring Silk':
        'Welcome to StoryVerse. Let my voice guide you into an enchanting world of wonder.',
      'Airy Siren':
        'Listen closely. Every whisper holds a secret waiting to be uncovered in the dark.',
      'Crystal Velvet':
        'Crisp, radiant, and true. Every decision you vote on shapes where this story travels next.',
      'Gentle Melodic':
        'Take a quiet breath and rest your eyes. This tale was written just for your heart.',
      'Dramatic Shimmer':
        'The clock strikes twelve. The footsteps are right outside the door. What do you do?',
    };

    const sampleLinesHi: Record<string, string> = {
      'Alluring Silk':
        'स्टोरीवर्स में आपका स्वागत है। मेरी आवाज़ के साथ इस रोमांचक और रहस्यमयी दुनिया का अनुभव करें।',
      'Airy Siren':
        'ध्यान से सुनिए। हर फुसफुसाहट में एक ऐसा राज़ छिपा है जो अंधेरे में खुलने की प्रतीक्षा कर रहा है।',
      'Crystal Velvet':
        'स्पष्ट, मधुर और प्रभावशाली। आपके द्वारा डाला गया हर वोट इस कहानी का अगला मोड़ तय करता है।',
      'Gentle Melodic':
        'एक शांत सांस लें और अपनी आँखें बंद करें। यह कथा केवल आपके दिल के लिए बुनी गई है।',
      'Dramatic Shimmer':
        'घड़ी में ठीक बारह बजते हैं। दरवाज़े के पार कदमों की आहट सुनाई देती है। आप क्या करेंगे?',
    };

    const text =
      (language === 'hi' ? sampleLinesHi[styleName] : sampleLinesEn[styleName]) ||
      (language === 'hi'
        ? 'स्टोरीवर्स में आपका स्वागत है। हमारी मधुर और आकर्षक वाचक आवाज़ का अनुभव करें।'
        : 'Welcome to StoryVerse. Listen with our ultra-clear, thin, and captivating narration voice.');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    const styleConfig = VOICE_STYLE_CONFIGS[styleName] || VOICE_STYLE_CONFIGS['Alluring Silk'];

    utterance.pitch = Math.min(2.0, (styleConfig.pitch || 1.18) * this.customPitchModifier);
    utterance.rate = styleConfig.rate || 1.03;

    const preferredVoice = this.getBestAttractiveThinVoice(language);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    try {
      window.speechSynthesis.speak(utterance);
      this.startAmbientShimmer(true);
      utterance.onend = () => {
        this.stopAmbientShimmer();
      };
    } catch {
      // Safe fallback
    }
  }

  private startSimulation() {
    this.stopSimulation();
    this.simulationInterval = window.setInterval(() => {
      if (!this.isSpeaking) return;
      this.currentTime += 1 * this.playbackRate;
      if (this.currentTime >= this.totalDuration) {
        this.currentTime = this.totalDuration;
        this.stop();
        if (this.onEndCallback) this.onEndCallback();
        return;
      }
      const pct = (this.currentTime / this.totalDuration) * 100;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime, pct);
      }
    }, 1000);
  }

  private stopSimulation() {
    if (this.simulationInterval !== null) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  public pause() {
    this.isSpeaking = false;
    this.stopSimulation();
    this.stopAmbientShimmer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    this.isSpeaking = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }
    this.startSimulation();
    if (this.ambientShimmerEnabled) {
      this.startAmbientShimmer();
    }
  }

  public stop() {
    this.isSpeaking = false;
    this.stopSimulation();
    this.stopAmbientShimmer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.totalDuration));
    const pct = (this.currentTime / this.totalDuration) * 100;
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime, pct);
    }
  }

  public setSpeed(speed: number) {
    this.playbackRate = speed;
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getCurrentStyle(): string {
    return this.currentStyle;
  }

  /**
   * Procedural Crystalline Ambient Shimmer (Web Audio API)
   * Plays an ultra-delicate, high-passed ethereal harmonic chord
   * that gives the narration a captivating, attractive, crystalline studio sheen.
   */
  private startAmbientShimmer(isShortPreview = false) {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }

      this.stopAmbientShimmer();

      const masterGain = this.audioCtx.createGain();
      // Soft ambient volume so voice remains crystal clear
      masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(
        0.035,
        this.audioCtx.currentTime + 1.2
      );

      // High-pass filter to eliminate thick boominess, keeping only crystalline sparkle
      const highPass = this.audioCtx.createBiquadFilter();
      highPass.type = 'highpass';
      highPass.frequency.setValueAtTime(650, this.audioCtx.currentTime);

      const highShelf = this.audioCtx.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.setValueAtTime(3200, this.audioCtx.currentTime);
      highShelf.gain.setValueAtTime(4, this.audioCtx.currentTime);

      masterGain.connect(highPass);
      highPass.connect(highShelf);
      highShelf.connect(this.audioCtx.destination);

      this.ambientGain = masterGain;

      // Ethereal pentatonic frequencies for alluring crystalline presence
      const chordFrequencies = [523.25, 659.25, 783.99, 1046.5];
      this.ambientOscillators = chordFrequencies.map((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

        // Subtle vibrato LFO for captivating silkiness
        const lfo = this.audioCtx!.createOscillator();
        const lfoGain = this.audioCtx!.createGain();
        lfo.frequency.setValueAtTime(0.4 + idx * 0.15, this.audioCtx!.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.audioCtx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const oscGain = this.audioCtx!.createGain();
        oscGain.gain.setValueAtTime(0.2 / (idx + 1), this.audioCtx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        return osc;
      });

      if (isShortPreview) {
        setTimeout(() => {
          this.stopAmbientShimmer();
        }, 4000);
      }
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  }

  private stopAmbientShimmer() {
    if (this.ambientGain && this.audioCtx) {
      try {
        this.ambientGain.gain.setValueAtTime(
          this.ambientGain.gain.value,
          this.audioCtx.currentTime
        );
        this.ambientGain.gain.exponentialRampToValueAtTime(
          0.0001,
          this.audioCtx.currentTime + 0.8
        );
      } catch {
        // safe fallback
      }
    }

    setTimeout(() => {
      this.ambientOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // safe fallback
        }
      });
      this.ambientOscillators = [];
    }, 900);
  }
}

export const audioEngine = new StoryVerseAudioEngine();
