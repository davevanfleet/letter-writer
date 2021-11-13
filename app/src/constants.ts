const LANGUAGE_MAPPING: { [index: string]: string } = {
  abk: 'Abkhaz',
  aar: 'Afar',
  afr: 'Afrikaans',
  aka: 'Akan',
  alb: 'Albanian',
  amh: 'Amharic',
  ara: 'Arabic',
  arg: 'Aragonese',
  arm: 'Armenian',
  asm: 'Assamese',
  ava: 'Avaric',
  ave: 'Avestan',
  aym: 'Aymara',
  aze: 'Azerbaijani',
  bam: 'Bambara',
  bnt: 'Bantu',
  bak: 'Bashkir',
  baq: 'Basque',
  bel: 'Belarusian',
  ben: 'Bengali',
  bih: 'Bihari',
  bis: 'Bislama',
  bos: 'Bosnian',
  bre: 'Breton',
  bul: 'Bulgarian',
  bur: 'Burmese',
  cat: 'Catalan',
  cha: 'Chamorro',
  che: 'Chechen',
  nya: 'Chichewa',
  chi: 'Chinese',
  chv: 'Chuvash',
  cor: 'Cornish',
  cos: 'Corsican',
  cre: 'Cree',
  hrv: 'Croatian',
  cze: 'Czech',
  dan: 'Danish',
  div: 'Divehi',
  dut: 'Dutch',
  dzo: 'Dzongkha',
  eng: 'English',
  epo: 'Esperanto',
  est: 'Estonian',
  ewe: 'Ewe',
  fao: 'Faroese',
  fij: 'Fijian',
  fin: 'Finnish',
  fre: 'French',
  ful: 'Fula',
  gaa: 'Ga',
  glg: 'Galician',
  lug: 'Ganda',
  geo: 'Georgian',
  ger: 'German',
  gre: 'Greek',
  grn: 'Guaraní',
  guj: 'Gujarati',
  hat: 'Haitian',
  hau: 'Hausa',
  heb: 'Hebrew',
  her: 'Herero',
  hin: 'Hindi',
  hmo: 'Hiri Motu',
  hun: 'Hungarian',
  ice: 'Icelandic',
  ido: 'Ido',
  ibo: 'Igbo',
  ind: 'Indonesian',
  ina: 'Interlingua',
  ile: 'Interlingue',
  iku: 'Inuktitut',
  ipk: 'Inupiaq',
  gle: 'Irish',
  ita: 'Italian',
  jpn: 'Japanese',
  jav: 'Javanese',
  kal: 'Kalaallisut',
  kan: 'Kannada',
  kau: 'Kanuri',
  kas: 'Kashmiri',
  kaz: 'Kazakh',
  khm: 'Khmer',
  kik: 'Kikuyu',
  kin: 'Kinyarwanda',
  run: 'Kirundi',
  kom: 'Komi',
  kon: 'Kongo',
  kor: 'Korean',
  kur: 'Kurdish',
  kua: 'Kwanyama',
  kir: 'Kyrgyz',
  lao: 'Lao',
  lat: 'Latin',
  lav: 'Latvian',
  lim: 'Limburgish',
  lin: 'Lingala',
  lit: 'Lithuanian',
  lub: 'Luba-Katanga',
  ltz: 'Luxembourgish',
  mac: 'Macedonian',
  mlg: 'Malagasy',
  may: 'Malay',
  mal: 'Malayalam',
  mlt: 'Maltese',
  glv: 'Manx',
  mao: 'Māori',
  mar: 'Marathi',
  mah: 'Marshallese',
  mol: 'Moldovan',
  mon: 'Mongolian',
  nau: 'Nauru',
  nav: 'Navajo',
  ndo: 'Ndonga',
  nep: 'Nepali',
  nde: 'Northern Ndebele',
  sme: 'Northern Sami',
  nor: 'Norwegian',
  nob: 'Norwegian Bokmål',
  nno: 'Norwegian Nynorsk',
  iii: 'Nuosu',
  oci: 'Occitan',
  oji: 'Ojibwe',
  chu: 'Old Church Slavonic',
  ori: 'Oriya',
  orm: 'Oromo',
  oss: 'Ossetian',
  pli: 'Pāli',
  pan: 'Panjabi',
  pus: 'Pashto',
  per: 'Persian',
  pol: 'Polish',
  por: 'Portuguese',
  que: 'Quechua',
  rum: 'Romanian',
  roh: 'Romansh',
  rus: 'Russian',
  smo: 'Samoan',
  sag: 'Sango',
  san: 'Sanskrit',
  srd: 'Sardinian',
  gla: 'Scottish Gaelic',
  srp: 'Serbian',
  sna: 'Shona',
  snd: 'Sindhi',
  sin: 'Sinhala',
  slo: 'Slovak',
  slv: 'Slovene',
  som: 'Somali',
  nbl: 'Southern Ndebele',
  sot: 'Southern Sotho',
  spa: 'Spanish',
  sun: 'Sundanese',
  swa: 'Swahili',
  ssw: 'Swati',
  swe: 'Swedish',
  tgl: 'Tagalog',
  tah: 'Tahitian',
  tgk: 'Tajik',
  tam: 'Tamil',
  tat: 'Tatar',
  tel: 'Telugu',
  tha: 'Thai',
  tib: 'Tibetan Standard',
  tir: 'Tigrinya',
  ton: 'Tonga',
  tso: 'Tsonga',
  tsn: 'Tswana',
  tur: 'Turkish',
  tuk: 'Turkmen',
  twi: 'Twi',
  ukr: 'Ukrainian',
  urd: 'Urdu',
  uig: 'Uyghur',
  uzb: 'Uzbek',
  ven: 'Venda',
  vie: 'Vietnamese',
  vol: 'Volapük',
  wln: 'Walloon',
  wel: 'Welsh',
  fry: 'Western Frisian',
  wol: 'Wolof',
  xho: 'Xhosa',
  yid: 'Yiddish',
  yor: 'Yoruba',
  zha: 'Zhuang',
  zul: 'Zulu',
};

export type IRole = "Admin" | 'Publisher';

const prod = {
  url: {
    API_URL: 'https://letter-writer-api.herokuapp.com/api',
  },
  priceIds: {
    english: 'price_1JQeEtGG42J6bTfiXdw4AxOL',
    spanish: 'price_1JQeFVGG42J6bTfiR7humddn',
    foreignLang: 'price_1JQeG3GG42J6bTfi8eJh5zme',
  },
  languageMapping: LANGUAGE_MAPPING,
};

const dev = {
  url: {
    API_URL: 'http://localhost:8080/api',
  },
  priceIds: {
    english: 'price_1JQeEtGG42J6bTfiXdw4AxOL',
    spanish: 'price_1JQeFVGG42J6bTfiR7humddn',
    foreignLang: 'price_1JQeG3GG42J6bTfi8eJh5zme',
  },
  languageMapping: LANGUAGE_MAPPING,
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
