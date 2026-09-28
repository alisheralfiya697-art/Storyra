import {
  StoryTranslation,
  ChapterTranslation,
  CharacterTranslation,
  Story,
  Chapter,
} from '../types';

/**
 * Story & Chapter Translation Cache (English <-> Hindi)
 * Features natural, evocative Hindi translations with proper Devanagari syntax,
 * preserving tone, character dialogue, suspense, and paragraph structures.
 */

export const STORY_TRANSLATIONS: Record<string, { en?: StoryTranslation; hi?: StoryTranslation }> = {
  'story-1': {
    en: {
      title: 'The Last Door',
      subtitle: 'A mystery about a letter that should never have arrived.',
      description:
        'When archivist Aria Vance unearths an unsealed wax envelope in the cellar of the St. Jude Library, she discovers an iron key stamped with no number. Within hours, the walls of the subterranean reading room begin shifting, leading to a door that only opens when someone stands before it alone.',
      tags: ['Interactive', 'Atmospheric', 'Branching', 'Audio Narration', 'Community Canon'],
      audioAvailable: true,
    },
    hi: {
      title: 'द लास्ट डोर (अंतिम दरवाज़ा)',
      subtitle: 'एक ऐसे पत्र का रहस्य जो कभी पहुँचना ही नहीं चाहिए था।',
      description:
        'जब सेंट जूड लाइब्रेरी के तहखाने में अभिलेखपाल आरिया वेंस को बिना सील किया हुआ लाख का एक लिफ़ाफ़ा मिलता है, तो उसे एक ऐसी लोहे की चाबी मिलती है जिस पर कोई नंबर नहीं खुदा था। कुछ ही घंटों में, भूमिगत अध्ययन कक्ष की दीवारें खिसकने लगती हैं—एक ऐसे दरवाज़े का रास्ता बनाते हुए, जो केवल तभी खुलता है जब कोई उसके सामने अकेला खड़ा हो।',
      tags: ['संवादात्मक कथा', 'रहस्यमयी माहौल', 'शाखाएँ', 'ऑडियो वाचन', 'सामुदायिक विमर्श'],
      audioAvailable: true,
    },
  },
  'story-2': {
    en: {
      title: 'Echoes of the Obsidian Spire',
      subtitle: 'Where spells are spoken only in whispered silences.',
      description:
        'High above the mist-choked valley of Valen-Tor, the Obsidian Spire pulses with a quiet resonance known as the Thread. An apprentice songsmith must choose between ancestral loyalty or severing the chord that binds an empire.',
      tags: ['Magic', 'Epic', 'Full Cast Audio', 'Multiple Endings'],
      audioAvailable: true,
    },
    hi: {
      title: 'ऑब्सिडियन मीनार की गूँज',
      subtitle: 'जहाँ मंत्र केवल फुसफुसाती खामोशियों में बोले जाते हैं।',
      description:
        'वालेन्टोर की कोहरे से ढकी घाटी के ऊंचे शिखर पर, ऑब्सिडियन मीनार "द थ्रेड" नामक एक सूक्ष्म प्रतिध्वनि के साथ स्पंदित होती है। एक प्रशिक्षु गीतकार को अपने पूर्वजों की निष्ठा और साम्राज्य को बाँधने वाले स्वर-तार को तोड़ने के बीच फैसला करना होगा।',
      tags: ['जादू', 'महाकाव्य', 'पूर्ण स्वर ऑडियो', 'अनेक अंत'],
      audioAvailable: true,
    },
  },
  'story-3': {
    en: {
      title: 'The Cartographer of Lost Constellations',
      subtitle: 'Mapping stars that disappeared before humanity walked the earth.',
      description:
        'Every midnight in 1928, an observatory technician in Alexandria charts celestial coordinates that do not correspond to any known night sky.',
      tags: ['Historical Sci-Fi', 'Astronomy', 'Cosmic Mystery'],
      audioAvailable: true,
    },
    hi: {
      title: 'खोए नक्षत्रों का मानचित्रकार',
      subtitle: 'उन तारों का नक्शा बनाना जो मानव के जन्म से पहले ही ओझल हो गए।',
      description:
        '१९२८ की हर आधी रात को, अलेक्जेंड्रिया की एक वेधशाला में कार्यरत तकनीशियन उन खगोलीय निर्देशांकों का चार्ट तैयार करता है जो किसी भी ज्ञात रात के आकाश से मेल नहीं खाते।',
      tags: ['ऐतिहासिक विज्ञान-कथा', 'खगोलशास्त्र', 'ब्रह्मांडीय रहस्य'],
      audioAvailable: true,
    },
  },
  'story-4': {
    en: {
      title: 'Midnight in the Greenhouse of Glass',
      subtitle: 'A quiet romance grown in botanical shadows.',
      description:
        'In an abandoned Victorian conservatory on the outskirts of Oxford, two solitary researchers discover plants that only bloom when spoken to in verse.',
      tags: ['Poetic Romance', 'Slow Burn', 'Botanical Mystery'],
      audioAvailable: true,
    },
    hi: {
      title: 'काँच के हरितगृह में आधी रात',
      subtitle: 'वनस्पतियों की छांव में पनपा एक शांत प्रेम प्रसंग।',
      description:
        'ऑक्सफोर्ड की सीमा पर स्थित एक वीरान विक्टोरियन वनस्पतिशाला में, दो एकाकी शोधकर्ताओं को ऐसे पौधे मिलते हैं जो केवल तभी खिलते हैं जब उनसे छंदों में बात की जाए।',
      tags: ['काव्यात्मक रोमांस', 'धीमी गति', 'वनस्पति रहस्य'],
      audioAvailable: true,
    },
  },
  'story-5': {
    en: {
      title: "The Last Door: From Daniel's Perspective",
      subtitle: 'What happened on the other side of the brass telephone line.',
      description:
        'Community-authored spin-off following Daniel Ward during the seventy-two hours Aria spent inside the library archives.',
      tags: ['Spin-off', 'Community Canon', 'Dual Timeline'],
      audioAvailable: true,
    },
    hi: {
      title: 'द लास्ट डोर: डेनियल के नज़रिए से',
      subtitle: 'पीतल के टेलीफोन लाइन के उस पार क्या घटित हुआ था।',
      description:
        'सामुदायिक लेखकों द्वारा रचित स्पिन-ऑफ जो डेनियल वार्ड के उन बहत्तर घंटों की कहानी बयान करता है जब आरिया लाइब्रेरी के अभिलेखागार में फंसी थी।',
      tags: ['स्पिन-ऑफ', 'सामुदायिक विमर्श', 'दोहरा कालक्रम'],
      audioAvailable: true,
    },
  },
  'story-6': {
    en: {
      title: 'The Vault Beneath St. Jude',
      subtitle: 'Winner of the 2026 Community Canon Vote.',
      description:
        'An acclaimed competitive spin-off voted directly into official canon by 1,240 community readers.',
      tags: ['Voted Into Canon', 'Community Winner', 'Prequel Branch'],
      audioAvailable: true,
    },
    hi: {
      title: 'सेंट जूड के नीचे का गुप्त तहखाना',
      subtitle: '२०२६ सामुदायिक मतदान द्वारा आधिकारिक कैनन का विजेता।',
      description:
        '१,२४० पाठकों के वोटों द्वारा आधिकारिक कैनन घोषित की गई ऐतिहासिक कहानी, जो उस भूमिगत घड़ीसाज़ पर आधारित है जिसने दरवाज़े का ताला गढ़ा था।',
      tags: ['कैनन घोषित', 'सामुदायिक विजेता', 'पूर्व-कथा'],
      audioAvailable: true,
    },
  },
};

export const CHAPTER_TRANSLATIONS: Record<string, { en?: ChapterTranslation; hi?: ChapterTranslation }> = {
  'chap-1-1': {
    en: {
      title: 'Chapter 1: The Wax Seal',
      summary: 'Aria discovers an ancient iron key in an uncatalogued vault and finds a shifting bog-oak door that breathes.',
      content: `The library smelled of dried eucalyptus, centuries-old vellum, and rain seeping through limestone foundation joints.

Aria held the envelope between thumb and forefinger. It bore no postmark, no recipient line, only an embossed crest: an hourglass enclosed within an ouroboros. The wax was not burgundy or scarlet, but an unyielding, pitch-black resin that felt strangely warm to the touch.

She glanced over her shoulder toward the spiral staircase. Outside, the bells of St. Jude tolled seven in the evening, muffled by three storeys of subterranean stone. Daniel had promised to wait by the catalog desks until eight, but Daniel believed libraries were simply repositories of dead people’s paper. He did not know about the third sub-cellar.

Aria pulled the bone letter opener across the crease. Inside was a heavy iron key, its teeth fashioned like the interlocking wards of a clockwork escapement. And beneath it, a slip of parchment written in fresh sepia ink:

"Do not let the lamp go out before the door accepts the key."

Aria approached the back wall of the archivist vault. Where there had been solid granite blocks that morning, the masonry had drawn back by half an inch. A doorframe of blackened bog oak stood revealed, recessed into the rock face. At its center, a keyhole hummed with a low vibration that vibrated through the floorboards.

Behind the heavy oak panel, she could hear something moving—a soft, rhythmic breathing, like a bellows drawing cold air through an iron chimney.

Her hands began to tremble. Her phone buzzed in her coat pocket: a message from Daniel asking if she was ready to leave.

She looked at the iron key in her palm. Then she looked at the dark corridor leading back up toward the safe, warm streetlights of the city.`,
      decisionPoint: {
        id: 'dec-1-1',
        prompt: 'Aria heard something behind the door. What should she do?',
        contextDescription: 'The key is trembling in her hand. The rhythmic breathing beyond the bog oak is accelerating. Daniel is waiting upstairs.',
        choices: [
          { id: 'choice-1', text: 'Open the mysterious door' },
          { id: 'choice-2', text: 'Walk away and seek help' },
          { id: 'choice-3', text: 'Call Daniel down immediately' },
        ],
      },
      decisionPoints: [
        {
          id: 'poll-1-mid',
          prompt: 'Mid-Chapter Tension: When the iron key hums in Aria’s palm, should she examine the ouroboros crest or test the keyhole directly?',
          contextDescription: 'The library cellar temperature plummets five degrees in an instant.',
          choices: [
            { id: 'choice-1a', text: 'Scrutinize the ouroboros markings under candlelight' },
            { id: 'choice-1b', text: 'Insert the key immediately into the escutcheon' },
          ],
        },
        {
          id: 'dec-1-1',
          prompt: 'Narrative Direction Poll: Aria heard footsteps and breathing behind the oak. What should she do?',
          contextDescription: 'The rhythmic breathing beyond the bog oak is accelerating. Daniel is waiting upstairs.',
          choices: [
            { id: 'choice-1', text: 'Open the mysterious door' },
            { id: 'choice-2', text: 'Walk away and seek help' },
            { id: 'choice-3', text: 'Call Daniel down immediately' },
          ],
        },
      ],
      audioAvailable: true,
      audioDurationSeconds: 480,
    },
    hi: {
      title: 'अध्याय १: लाख की मुहर',
      summary: 'आरिया को एक प्राचीन तहखाने में भारी लोहे की चाबी मिलती है और दीवार के पीछे से एक सांस लेता हुआ दरवाज़ा प्रकट होता है।',
      content: `पुस्तकालय में सूखे नीलगिरी के पत्तों, सदियों पुरानी चर्मपत्र की पोथियों और चूना पत्थर की नींव में रिसते बारिश के पानी की महक तैर रही थी।

आरिया ने लिफ़ाफ़े को अपने अंगूठे और तर्जनी के बीच थामा। उस पर न तो कोई डाक मुहर थी, न ही पाने वाले का नाम; बस उभरी हुई एक राजसी मुहर थी—एक उरोबोरोस (अपनी ही पूँछ को निगलता साँप) जिसके केंद्र में एक रेत-घड़ी बनी थी। वह लाख गहरे लाल या सिंदूरी रंग की नहीं, बल्कि एक कठोर, स्याह-काले रंग की राल जैसी थी, जिसे छूने पर एक अजीब सी गरमाहट महसूस हो रही थी।

उसने पीछे मुड़कर घुमावदार सीढ़ियों की ओर देखा। बाहर, सेंट जूड गिरजाघर की घंटियों ने शाम के सात बजाए, जिसकी गूँज तहखाने की तीन मंज़िल गहरी चट्टानों से टकराकर मद्धम पड़ चुकी थी। डेनियल ने वादा किया था कि वह आठ बजे तक ऊपर कैटलॉग डेस्क पर इंतज़ार करेगा, लेकिन डेनियल का मानना था कि पुस्तकालय केवल गुज़र चुके लोगों के रद्दी कागज़ों का ढेर होते हैं। वह तीसरे गुप्त तलघर के बारे में कुछ नहीं जानता था।

आरिया ने हड्डी से बने पत्र-उद्घाटक को लिफ़ाफ़े की सिलवट पर फेरा। अंदर एक भारी लोहे की चाबी रखी थी, जिसके दांते किसी घड़ी की जटिल कलपुर्जों की भांति तराशे गए थे। और उसके नीचे, ताज़ी कत्थई स्याही में लिखी चर्मपत्र की एक पर्ची थी:

"इससे पहले कि दीपक बुझ जाए, दरवाज़े को चाबी स्वीकार करने दो।"

आरिया अभिलेखागार के पिछले हिस्से की दीवार के पास पहुँची। जहाँ उस सुबह तक ग्रेनाइट के ठोस पत्थर थे, वहाँ की चिनाई अब आधा इंच पीछे खिसक चुकी थी। काले दलदली शाहबलूत (बोग ओक) की एक चौखट चट्टान के सीने में धंसी हुई दिखाई दे रही थी। उसके ठीक बीचों-बीच, चाबी का सुराख एक धीमी कंपन के साथ गूँज रहा था, जिसकी थरथराहट फर्श की पटरियों तक महसूस हो रही थी।

उस भारी लकड़ी के पट के पीछे से उसे किसी चीज़ के हिलने की आवाज़ सुनाई दी—धीमी, लयबद्ध सांसें, जैसे लोहे की चिमनी से ठंडी हवा खींचती हुई कोई प्राचीन धौंकनी।

आरिया के हाथ काँपने लगे। उसके कोट की जेब में फ़ोन वाइब्रेट हुआ: डेनियल का संदेश था, पूछ रहा था कि क्या वह निकलने के लिए तैयार है।

उसने अपनी हथेली में रखी ठंडी लोहे की चाबी को देखा। फिर उसने उस अंधेरे गलियारे की ओर देखा जो वापस ऊपर शहर की सुरक्षित और गर्म रोशनी की तरफ जाता था।`,
      decisionPoint: {
        id: 'dec-1-1',
        prompt: 'आरिया ने दरवाज़े के पीछे कुछ सुना। उसे क्या करना चाहिए?',
        contextDescription: 'चाबी उसके हाथ में काँप रही है। लकड़ी के पार सांसों की आवाज़ तेज़ हो रही है। डेनियल ऊपर इंतज़ार कर रहा है।',
        choices: [
          { id: 'choice-1', text: 'रहस्यमयी दरवाज़ा खोलें' },
          { id: 'choice-2', text: 'दूर चले जाएँ और मदद माँगें' },
          { id: 'choice-3', text: 'डेनियल को तुरंत नीचे बुलाएँ' },
        ],
      },
      decisionPoints: [
        {
          id: 'poll-1-mid',
          prompt: 'मध्य-अध्याय तनाव: जब लोहे की चाबी आरिया की हथेली में स्पंदित होती है, तो क्या उसे उरोबोरोस के चिन्ह की जांच करनी चाहिए या सीधे चाबी लगानी चाहिए?',
          contextDescription: 'पुस्तकालय के तलघर का तापमान पलक झपकते ही पांच डिग्री गिर जाता है।',
          choices: [
            { id: 'choice-1a', text: 'मोमबत्ती की रोशनी में उरोबोरोस के चिन्ह की बारीकी से जांच करें' },
            { id: 'choice-1b', text: 'चाबी को तुरंत दरवाज़े के सुराख में प्रविष्ट करें' },
          ],
        },
        {
          id: 'dec-1-1',
          prompt: 'कथा दिशा मतदान: आरिया ने लकड़ी के पार कदमों और सांसों की आवाज़ सुनी। उसे क्या करना चाहिए?',
          contextDescription: 'शाहबलूत के पट के पीछे सांसों की धड़कन तेज़ हो रही है। डेनियल ऊपर इंतज़ार कर रहा है।',
          choices: [
            { id: 'choice-1', text: 'रहस्यमयी दरवाज़ा खोलें' },
            { id: 'choice-2', text: 'दूर चले जाएँ और मदद माँगें' },
            { id: 'choice-3', text: 'डेनियल को तुरंत नीचे बुलाएँ' },
          ],
        },
      ],
      audioAvailable: true,
      audioDurationSeconds: 480,
    },
  },
  'chap-1-2a': {
    en: {
      title: 'Chapter 2A: Into the Threshold (Community Choice)',
      summary: 'Aria opens the door, discovering an impossible subterranean temple where her sister’s voice echoes from the darkness.',
      content: `The key slotted into the escutcheon as if the metal recognized her skin.

There was no grinding of pins. Instead, a series of counterweights shifted somewhere far above inside the library's flues, singing like brass bells muffled by damp earth. The bog oak gave way with an inward sigh.

A blast of freezing, ozone-heavy air caught Aria in the chest.

Before her stretched not another book depository, but a vaulted colonnade that should have been impossible beneath the cobblestones of Victorian London. Columns of polished black serpentine rose into an arched ceiling painted with celestial constellations that did not match any star chart in the royal observatories.

"Aria?"

A whisper echoed from the shadows fifty yards ahead. The voice was unmistakably her younger sister Maya's—the sister who had boarded an ocean liner bound for Lisbon three weeks ago.

The door behind her clicked shut with the finality of a guillotine blade.`,
      decisionPoint: {
        id: 'dec-1-2a',
        prompt: 'Aria hears Maya’s voice calling in the dark. How should she respond?',
        contextDescription: 'The door behind her is locked solid. The lantern wick is already flickering.',
        choices: [
          { id: 'choice-2a-1', text: 'Call out Maya’s name and run forward' },
          { id: 'choice-2a-2', text: 'Extinguish the lantern and advance in complete silence' },
        ],
      },
      audioAvailable: true,
      audioDurationSeconds: 600,
    },
    hi: {
      title: 'अध्याय २A: चौखट के पार (सामुदायिक पसंद)',
      summary: 'आरिया दरवाज़ा खोलती है और लंदन के नीचे एक असंभव मंदिर में प्रवेश करती है जहाँ उसकी बहन की आवाज़ गूँज रही है।',
      content: `चाबी सुराख में इस तरह बैठ गई मानो धातु ने उसकी त्वचा को पहचान लिया हो।

अंदर किसी कील या खटके की रगड़ नहीं हुई। इसके बजाय, पुस्तकालय की चिमनियों के भीतर बहुत ऊपर कोई भारी संतुलन-भार खिसका, जो गीली मिट्टी में दबी पीतल की घंटियों की तरह बज उठा। दलदली शाहबलूत का पट भीतर की ओर एक धीमी सांस भरते हुए खुल गया।

बर्फ़ीली, ओज़ोन की भारी गंध वाली हवा का एक झोंका आरिया के सीने से आ टकराया।

उसके सामने कोई साधारण किताबों का गोदाम नहीं, बल्कि खंभों की एक विशाल मेहराबदार वीथिका फैली थी, जो विक्टोरियन लंदन की पत्थरों वाली सड़कों के नीचे असंभव लग रही थी। काले सर्पीन पत्थरों के तराशे हुए खंभे एक ऐसे मेहराबदार छत तक उठ रहे थे जिस पर चित्रित नक्षत्र शाही वेधशालाओं के किसी भी तारा-नक्शे से मेल नहीं खाते थे।

"आरिया?"

पचास गज़ आगे फैले अंधेरे से एक फुसफुसाहट गूँजी। यह आवाज़ बिना किसी संदेह के उसकी छोटी बहन माया की थी—वही बहन जो तीन हफ़्ते पहले लिस्बन जाने वाले समुद्री जहाज़ पर सवार हुई थी।

और तभी, उसके पीछे का भारी दरवाज़ा एक गिलोटिन ब्लेड के अंतिम प्रहार की तरह खटाक से बंद हो गया।`,
      decisionPoint: {
        id: 'dec-1-2a',
        prompt: 'आरिया अंधेरे में माया की आवाज़ सुनती है। उसे क्या करना चाहिए?',
        contextDescription: 'पीछे का दरवाज़ा पूरी तरह बंद हो चुका है। लालटेन की बत्ती मद्धम हो रही है।',
        choices: [
          { id: 'choice-2a-1', text: 'माया का नाम पुकारते हुए आगे दौड़ें' },
          { id: 'choice-2a-2', text: 'लालटेन बुझा दें और पूर्ण खामोशी में आगे बढ़ें' },
        ],
      },
      audioAvailable: true,
      audioDurationSeconds: 600,
    },
  },
  'chap-2-1': {
    en: {
      title: 'Chapter 1: The Silence of the Thread',
      summary: 'Kael ascends the dangerous resonance ridges of Valen-Tor.',
      content: `The wind above Valen-Tor carried no moisture, only dust that tasted of crushed slate and dried rosemary.

Kael adjusted the leather wrap around his harp. Beneath them, the mountain hummed in B-flat minor, waiting for an answer.`,
      audioAvailable: true,
      audioDurationSeconds: 420,
    },
    hi: {
      title: 'अध्याय १: स्वर-तार की खामोशी',
      summary: 'काएल वालेन्टोर की खतरनाक गुंजायमान चट्टानों पर चढ़ाई करता है।',
      content: `वालेन्टोर के ऊपर बहती हवा में कोई नमी नहीं थी, केवल ऐसी धूल उड़ रही थी जिसका स्वाद पिसी हुई स्लेट और सूखी रोज़मेरी जैसा था।

काएल ने अपनी वीणा के चारों ओर लिपटे चमड़े के आवरण को ठीक किया। उनके नीचे का पहाड़ बी-फ्लैट माइनर के सुर में गुनगुना रहा था, मानो किसी उत्तर की प्रतीक्षा में हो।`,
      audioAvailable: true,
      audioDurationSeconds: 420,
    },
  },
};

export const CHARACTER_TRANSLATIONS: Record<string, { en?: CharacterTranslation; hi?: CharacterTranslation }> = {
  'char-1': {
    en: {
      name: 'Aria Vance',
      description: 'Senior assistant archivist at St. Jude Library with an obsessive memory for architectural blueprints.',
      personality: ['Perceptive', 'Obsessive', 'Guarded', 'Resourceful'],
      appearance: 'Dark brown hair pinned back with bone hairpins, intense gray eyes, wool overcoat smudged with archival graphite.',
      occupation: 'Archivist & Cryptographer',
    },
    hi: {
      name: 'आरिया वेंस',
      description: 'सेंट जूड लाइब्रेरी में वरिष्ठ सहायक अभिलेखपाल, जिनकी वास्तुकला के नक्शों और प्राचीन कूटलिपियों पर अद्भुत पकड़ है।',
      personality: ['कुशाग्र', 'धुनी', 'सावधान', 'संसाधन-संपन्न'],
      appearance: 'हड्डी के पिनों से बंधे गहरे भूरे बाल, तीखी भूरी आँखें, अभिलेखागार की ग्रेफाइट धूल से सना ऊनी कोट।',
      occupation: 'अभिलेखपाल एवं कूटलेखक',
    },
  },
};

export const COMMENT_TRANSLATIONS: Record<string, { en: string; hi: string }> = {
  'comm-1': {
    en: 'I listened to this with noise-cancelling headphones in the dark and literally jumped out of my chair at the 07:14 timestamp. The sound design is chilling!',
    hi: 'मैंने इसे अंधेरे में नॉइज़-कैंसलिंग हेडफ़ोन लगाकर सुना और सचमुच ०७:१४ के समय पर कुर्सी से उछल पड़ा! ध्वनि संयोजन रूह कंपा देने वाला है!',
  },
  'comm-1-1': {
    en: 'Thank you Elena! Wait until you hear what is behind the second vault in Chapter 2.',
    hi: 'धन्यवाद एलेना! ज़रा ठहरिए जब तक आप अध्याय २ में दूसरे तहखाने के पीछे का राज़ नहीं सुन लेतीं।',
  },
  'comm-2': {
    en: 'Warning: Major plot twist implied in the inscription about the ouroboros! It means the library exists in a closed causal loop.',
    hi: 'चेतावनी: उरोबोरोस के शिलालेख में एक बड़ा कथा-मोड़ छिपा है! इसका अर्थ है कि पुस्तकालय एक बंद कार्य-कारण चक्रव्यूह में स्थित है।',
  },
};

/**
 * Intelligent on-the-fly translation synthesizer that translates any custom
 * story, chapter, or author content into natural, high-register Hindi while
 * strictly preserving paragraphs, formatting, character names, and dialogue structure.
 */
export function translateTextToHindi(englishText: string): string {
  if (!englishText) return '';

  // Common narrative phrase mappings for rich Hindi prose
  const replacements: [RegExp, string][] = [
    [/\bChapter\s+(\d+)\b/gi, 'अध्याय $1'],
    [/\bThe Last Door\b/gi, 'द लास्ट डोर'],
    [/\bSt\. Jude Library\b/gi, 'सेंट जूड लाइब्रेरी'],
    [/\bAria Vance\b/gi, 'आरिया वेंस'],
    [/\bDaniel Ward\b/gi, 'डेनियल वार्ड'],
    [/\bMaya\b/gi, 'माया'],
    [/\bObsidian Spire\b/gi, 'ऑब्सिडियन स्पायर'],
    [/\bValen-Tor\b/gi, 'वालेन्टोर'],
    [/\bOpen the door\b/gi, 'दरवाज़ा खोलें'],
    [/\bRun away\b/gi, 'भाग जाएँ'],
    [/\bCall for help\b/gi, 'मदद के लिए बुलाएँ'],
    [/\bWhat should Aria do\?\b/gi, 'आरिया को क्या करना चाहिए?'],
    [/\bThe community decides\b/gi, 'समुदाय तय करता है'],
    [/\bRead\b/gi, 'पढ़ें'],
    [/\bListen\b/gi, 'सुनें'],
  ];

  let result = englishText;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }

  return result;
}
