export const Languages: Languages = {
  af: 'Afrikaans',
  ar: 'Arabic',
  bn: 'Bengali',
  bs: 'Bosnian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  'en-au': 'English (Australia)',
  'en-ca': 'English (Canada)',
  'en-gb': 'English (UK)',
  'en-gh': 'English (Ghana)',
  'en-ie': 'English (Ireland)',
  'en-in': 'English (India)',
  'en-ng': 'English (Nigeria)',
  'en-nz': 'English (New Zealand)',
  'en-ph': 'English (Philippines)',
  'en-tz': 'English (Tanzania)',
  'en-uk': 'English (UK)',
  'en-us': 'English (US)',
  'en-za': 'English (South Africa)',
  eo: 'Esperanto',
  es: 'Spanish',
  'es-es': 'Spanish (Spain)',
  'es-us': 'Spanish (United States)',
  et: 'Estonian',
  fi: 'Finnish',
  fr: 'French',
  'fr-ca': 'French (Canada)',
  'fr-fr': 'French (France)',
  gu: 'Gujarati',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  km: 'Khmer',
  kn: 'Kannada',
  ko: 'Korean',
  la: 'Latin',
  lv: 'Latvian',
  mk: 'Macedonian',
  ml: 'Malayalam',
  mr: 'Marathi',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  nl: 'Dutch',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  'pt-br': 'Portuguese (Brazil)',
  'pt-pt': 'Portuguese (Portugal)',
  ro: 'Romanian',
  ru: 'Russian',
  si: 'Sinhala',
  sk: 'Slovak',
  sq: 'Albanian',
  sr: 'Serbian',
  su: 'Sundanese',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  vi: 'Vietnamese',
  'zh-cn': 'Chinese (Mandarin/China)',
  'zh-tw': 'Chinese (Mandarin/Taiwan)',
};

export interface Languages {
  'af': 'Afrikaans';
  'ar': 'Arabic';
  'bn': 'Bengali';
  'bs': 'Bosnian';
  'ca': 'Catalan';
  'cs': 'Czech';
  'cy': 'Welsh';
  'da': 'Danish';
  'de': 'German';
  'el': 'Greek';
  'en-au': 'English (Australia)';
  'en-ca': 'English (Canada)';
  'en-gb': 'English (UK)';
  'en-gh': 'English (Ghana)';
  'en-ie': 'English (Ireland)';
  'en-in': 'English (India)';
  'en-ng': 'English (Nigeria)';
  'en-nz': 'English (New Zealand)';
  'en-ph': 'English (Philippines)';
  'en-tz': 'English (Tanzania)';
  'en-uk': 'English (UK)';
  'en-us': 'English (US)';
  'en-za': 'English (South Africa)';
  'en': 'English';
  'eo': 'Esperanto';
  'es-es': 'Spanish (Spain)';
  'es-us': 'Spanish (United States)';
  'es': 'Spanish';
  'et': 'Estonian';
  'fi': 'Finnish';
  'fr-ca': 'French (Canada)';
  'fr-fr': 'French (France)';
  'fr': 'French';
  'gu': 'Gujarati';
  'hi': 'Hindi';
  'hr': 'Croatian';
  'hu': 'Hungarian';
  'hy': 'Armenian';
  'id': 'Indonesian';
  'is': 'Icelandic';
  'it': 'Italian';
  'ja': 'Japanese';
  'jw': 'Javanese';
  'km': 'Khmer';
  'kn': 'Kannada';
  'ko': 'Korean';
  'la': 'Latin';
  'lv': 'Latvian';
  'mk': 'Macedonian';
  'ml': 'Malayalam';
  'mr': 'Marathi';
  'my': 'Myanmar (Burmese)';
  'ne': 'Nepali';
  'nl': 'Dutch';
  'no': 'Norwegian';
  'pl': 'Polish';
  'pt-br': 'Portuguese (Brazil)';
  'pt-pt': 'Portuguese (Portugal)';
  'pt': 'Portuguese';
  'ro': 'Romanian';
  'ru': 'Russian';
  'si': 'Sinhala';
  'sk': 'Slovak';
  'sq': 'Albanian';
  'sr': 'Serbian';
  'su': 'Sundanese';
  'sv': 'Swedish';
  'sw': 'Swahili';
  'ta': 'Tamil';
  'te': 'Telugu';
  'th': 'Thai';
  'tl': 'Filipino';
  'tr': 'Turkish';
  'uk': 'Ukrainian';
  'ur': 'Urdu';
  'vi': 'Vietnamese';
  'zh-cn': 'Chinese (Mandarin/China)';
  'zh-tw': 'Chinese (Mandarin/Taiwan)';
  [key: string]: string;
}

export type Language = Languages[keyof Languages];
export type LanguageCode = keyof Languages;
