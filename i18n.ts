import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      words: 'Words',
      sentences: 'Sentences',
      selectNative: 'Select your language',
      selectTarget: 'Select target language',
      homeTitle: "Home Page",
      wordsTitle: "Words Page",
      wordsCategoryTitle: "Words Categories",
      wordsGameTitle: "Words Game",
      sentencesCategoryTitle: "Sentences Categories",
      sentencesGameTitle: "Sentences Game",
      basic: "Basic",
      pronouns1: "Pronouns 1 - Personal",
      pronouns2: "Pronouns 1 - Object",
      verbs1: "Verbs 1",
      verbs2: "Verbs 2",
      nouns1: "Nouns 1",
      nouns2: "Nouns 2",
      determiners: "Determiners",
      adjectives1: "Adjectives 1",
      adjectives2: "Adjectives 2",
      adverbs: "Adverbs",
      prepositions: "Prepositions",
    }
  },
  tr: {
    translation: {
      words: 'Kelimeler',
      sentences: 'Cümleler',
      selectNative: 'Dilinizi seçin',
      selectTarget: 'Hedef dili seçin',
      homeTitle: "Ana Sayfa",
      wordsTitle: "Kelime Sayfası",
      wordsCategoryTitle: "Kelime Kategorileri",
      wordsGameTitle: "Kelime Oyunu",
      sentencesCategoryTitle: "Cümle Kategorileri",
      sentencesGameTitle: "Cümle Oyunu",
      basic: "Temel",
      pronouns1: "Zamirler 1 - Kişisel",
      pronouns2: "Zamirler 1 - Nesne",
      verbs1: "Fiiller 1",
      verbs2: "Fiiller 2",
      nouns1: "İsimler 1",
      nouns2: "İsimler 2",
      determiners: "Belirleyiciler",
      adjectives1: "Sıfatlar 1",
      adjectives2: "Sıfatlar 2",
      adverbs: "Zarflar",
      prepositions: "Edatlar",
    }
  },
  ru: {
    translation: {
      words: 'Слова',
      sentences: 'Предложения',
      selectNative: 'Выберите свой язык',
      selectTarget: 'Выберите целевой язык',
      homeTitle: "Домашняя страница",
      wordsTitle: "Страница слов",
      wordsCategoryTitle: "Категории слов",
      wordsGameTitle: "Игра со словами",
      sentencesCategoryTitle: "Категории предложений",
      sentencesGameTitle: "Игра с предложениями",
      basic: "Основное",
      pronouns1: "Местоимения 1 - Личные",
      pronouns2: "Местоимения 1 - Объектные",
      verbs1: "Глаголы 1",
      verbs2: "Глаголы 2",
      nouns1: "Существительные 1",
      nouns2: "Существительные 2",
      determiners: "Артикли",
      adjectives1: "Прилагательные 1",
      adjectives2: "Прилагательные 2",
      adverbs: "Наречия",
      prepositions: "Предлоги",
    }
  },
  es: {
    translation: {
      words: 'Palabras',
      sentences: 'Oraciones',
      selectNative: 'Seleccione su idioma',
      selectTarget: 'Seleccionar idioma objetivo',
      homeTitle: "Página de inicio",
      wordsTitle: "Página de palabras",
      wordsCategoryTitle: "Categorías de palabras",
      wordsGameTitle: "Juego de palabras",
      sentencesCategoryTitle: "Categorías de oraciones",
      sentencesGameTitle: "Juego de oraciones",
      basic: "Básico",
      pronouns1: "Pronombres 1 - Personales",
      pronouns2: "Pronombres 1 - Objetos",
      verbs1: "Verbos 1",
      verbs2: "Verbos 2",
      nouns1: "Sustantivos 1",
      nouns2: "Sustantivos 2",
      determiners: "Determinantes",
      adjectives1: "Adjetivos 1",
      adjectives2: "Adjetivos 2",
      adverbs: "Adverbios",
      prepositions: "Preposiciones",
    }
  },
  ar: {
    translation: {
      words: 'كلمات',
      sentences: 'جمل',
      selectNative: 'اختر لغتك',
      selectTarget: 'حدد اللغة الهدف',
      homeTitle: "الصفحة الرئيسية",
      wordsTitle: "صفحة الكلمات",
      wordsCategoryTitle: "فئات الكلمات",
      wordsGameTitle: "لعبة الكلمات",
      sentencesCategoryTitle: "فئات الجمل",
      sentencesGameTitle: "لعبة الجمل",
      basic: "أساسي",
      pronouns1: "الضمائر 1 - الشخصية",
      pronouns2: "الضمائر 1 - المفعول به",
      verbs1: "الأفعال 1",
      verbs2: "الأفعال 2",
      nouns1: "الأسماء 1",
      nouns2: "الأسماء 2",
      determiners: "المحددات",
      adjectives1: "الصفات 1",
      adjectives2: "الصفات 2",
      adverbs: "الظروف",
      prepositions: "حروف الجر",
    }
  },
  fr: {
    translation: {
      words: 'Mots',
      sentences: 'Phrases',
      selectNative: 'Sélectionnez votre langue',
      selectTarget: 'Sélectionner la langue cible',
      homeTitle: "Page d'accueil",
      wordsTitle: "Page des mots",
      wordsCategoryTitle: "Catégories de mots",
      wordsGameTitle: "Jeu de mots",
      sentencesCategoryTitle: "Catégories de phrases",
      sentencesGameTitle: "Jeu de phrases",
      basic: "De base",
      pronouns1: "Pronoms 1 - Personnels",
      pronouns2: "Pronoms 1 - Objet",
      verbs1: "Verbes 1",
      verbs2: "Verbes 2",
      nouns1: "Noms 1",
      nouns2: "Noms 2",
      determiners: "Déterminants",
      adjectives1: "Adjectifs 1",
      adjectives2: "Adjectifs 2",
      adverbs: "Adverbes",
      prepositions: "Prépositions",
    }
  },
  de: {
    translation: {
      words: 'Wörter',
      sentences: 'Sätze',
      selectNative: 'Wählen Sie Ihre Sprache',
      selectTarget: 'Wählen Sie die Zielsprache',
      homeTitle: "Startseite",
      wordsTitle: "Wortseite",
      wordsCategoryTitle: "Wortkategorien",
      wordsGameTitle: "Wortspiel",
      sentencesCategoryTitle: "Satzkategorien",
      sentencesGameTitle: "Satzspiel",
      basic: "Grundlegend",
      pronouns1: "Pronomen 1 - Personal",
      pronouns2: "Pronomen 1 - Objekt",
      verbs1: "Verben 1",
      verbs2: "Verben 2",
      nouns1: "Nomen 1",
      nouns2: "Nomen 2",
      determiners: "Bestimmwörter",
      adjectives1: "Adjektive 1",
      adjectives2: "Adjektive 2",
      adverbs: "Adverbien",
      prepositions: "Präpositionen",
    }
  },
  ja: {
    translation: {
      words: '単語',
      sentences: '文',
      selectNative: '言語を選択',
      selectTarget: 'ターゲット言語を選択',
      homeTitle: "ホームページ",
      wordsTitle: "単語ページ",
      wordsCategoryTitle: "単語カテゴリー",
      wordsGameTitle: "単語ゲーム",
      sentencesCategoryTitle: "文カテゴリー",
      sentencesGameTitle: "文ゲーム",
      basic: "基本",
      pronouns1: "代名詞 1 - 人称",
      pronouns2: "代名詞 1 - 目的格",
      verbs1: "動詞 1",
      verbs2: "動詞 2",
      nouns1: "名詞 1",
      nouns2: "名詞 2",
      determiners: "冠詞",
      adjectives1: "形容詞 1",
      adjectives2: "形容詞 2",
      adverbs: "副詞",
      prepositions: "前置詞",
    }
  },
  pt: {
    translation: {
      words: 'Palavras',
      sentences: 'Sentenças',
      selectNative: 'Selecione seu idioma',
      selectTarget: 'Selecionar idioma alvo',
      homeTitle: "Página inicial",
      wordsTitle: "Página de palavras",
      wordsCategoryTitle: "Categorias de palavras",
      wordsGameTitle: "Jogo de palavras",
      sentencesCategoryTitle: "Categorias de sentenças",
      sentencesGameTitle: "Jogo de sentenças",
      basic: "Básico",
      pronouns1: "Pronomes 1 - Pessoais",
      pronouns2: "Pronomes 1 - Objeto",
      verbs1: "Verbos 1",
      verbs2: "Verbos 2",
      nouns1: "Substantivos 1",
      nouns2: "Substantivos 2",
      determiners: "Determinantes",
      adjectives1: "Adjetivos 1",
      adjectives2: "Adjetivos 2",
      adverbs: "Advérbios",
      prepositions: "Preposições",
    }
  },
  fa: {
    translation: {
      words: 'کلمات',
      sentences: 'جملات',
      selectNative: 'زبان خود را انتخاب کنید',
      selectTarget: 'زبان مقصد را انتخاب کنید',
      homeTitle: "صفحه اصلی",
      wordsTitle: "صفحه کلمات",
      wordsCategoryTitle: "دسته‌بندی کلمات",
      wordsGameTitle: "بازی کلمات",
      sentencesCategoryTitle: "دسته‌بندی جملات",
      sentencesGameTitle: "بازی جملات",
      basic: "اصلی",
      pronouns1: "ضمائر 1 - شخصی",
      pronouns2: "ضمائر 1 - مفعولی",
      verbs1: "افعال 1",
      verbs2: "افعال 2",
      nouns1: "اسامی 1",
      nouns2: "اسامی 2",
      determiners: "محدودکننده‌ها",
      adjectives1: "صفت‌ها 1",
      adjectives2: "صفت‌ها 2",
      adverbs: "قیدها",
      prepositions: "حروف اضافه",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;