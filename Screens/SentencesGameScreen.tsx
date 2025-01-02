import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

// Import your language data files
import trSentencesData from '../Data/Sentences/tr_sentences.json';
import enSentencesData from '../Data/Sentences/en_sentences.json';
import ruSentencesData from '../Data/Sentences/ru_sentences.json';
import esSentencesData from '../Data/Sentences/es_sentences.json';
import arSentencesData from '../Data/Sentences/ar_sentences.json';
import frSentencesData from '../Data/Sentences/fr_sentences.json';
import deSentencesData from '../Data/Sentences/de_sentences.json';
import jaSentencesData from '../Data/Sentences/ja_sentences.json';
import ptSentencesData from '../Data/Sentences/pt_sentences.json';
import faSentencesData from '../Data/Sentences/fa_sentences.json';

const languageMap = {
  en: enSentencesData,
  tr: trSentencesData,
  ru: ruSentencesData,
  es: esSentencesData,
  ar: arSentencesData,
  fr: frSentencesData,
  de: deSentencesData,
  ja: jaSentencesData,
  pt: ptSentencesData,
  fa: faSentencesData,
};

const STORAGE_KEYS = {
  nativeLanguage: '@native_language',
  targetLanguage: '@target_language',
};

interface RouteParams {
  category: string;
}

export const SentencesGame = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const category = route.params?.category;

  const navigation = useNavigation();

  const [nativeSentences, setNativeSentences] = useState<string[]>([]);
  const [targetSentences, setTargetSentences] = useState<string[]>([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSentencesForCategory = (data: any, categoryId: string): string[] => {
    switch (categoryId) {
      case 'basic':
        return data.basic;
      case 'pronouns1':
        return [...data.pronouns.personal.subject, ...data.pronouns.personal.object];
      case 'pronouns2':
        return [...data.pronouns.possessive, ...data.pronouns.interrogative, ...data.pronouns.demonstrative];
      case 'verbs1':
        return data.verbs.action.slice(0, Math.ceil(data.verbs.action.length / 2));
      case 'verbs2':
        return [...data.verbs.action.slice(Math.ceil(data.verbs.action.length / 2)), ...data.verbs.helping];
      case 'nouns1':
        return [...data.nouns.abstract, ...data.nouns.people, ...data.nouns.places];
      case 'nouns2':
        return [...data.nouns.things, ...data.nouns.time_related, ...data.nouns.numbers, ...data.nouns.uncategorized];
      case 'determiners':
        return data.determiners;
      case 'adjectives1':
        return data.adjectives.slice(0, Math.ceil(data.adjectives.length / 2));
      case 'adjectives2':
        return data.adjectives.slice(Math.ceil(data.adjectives.length / 2));
      case 'adverbs':
        return data.adverbs;
      case 'prepositions':
        return data.prepositions;
      default:
        return [];
    }
  };

  const loadSentences = async () => {
    try {
      const storedNative = await AsyncStorage.getItem(STORAGE_KEYS.nativeLanguage) || 'en';
      const storedTarget = await AsyncStorage.getItem(STORAGE_KEYS.targetLanguage) || 'tr';

      const nativeData = languageMap[storedNative as keyof typeof languageMap];
      const targetData = languageMap[storedTarget as keyof typeof languageMap];

      const nativeSentencesList = getSentencesForCategory(nativeData, category);
      const targetSentencesList = getSentencesForCategory(targetData, category);

      setNativeSentences(nativeSentencesList);
      setTargetSentences(targetSentencesList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading sentences:', error);
      setIsLoading(false);
    }
  };

  const generateNewQuestion = () => {
    if (nativeSentences.length === 0 || targetSentences.length === 0) return;

    const questionIndex = Math.floor(Math.random() * targetSentences.length);
    const correct = nativeSentences[questionIndex];
    const questionSentence = targetSentences[questionIndex];

    const wrongAnswersSet = new Set<string>();
    const maxAttempts = 50;
    let attempts = 0;

    while (wrongAnswersSet.size < 3 && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * nativeSentences.length);
      const wrongAnswer = nativeSentences[randomIndex];
      if (wrongAnswer !== correct) {
        wrongAnswersSet.add(wrongAnswer);
      }
      attempts++;
    }

    setQuestion(questionSentence);
    setOptions([correct, ...Array.from(wrongAnswersSet)].sort(() => Math.random() - 0.5));
    setCorrectAnswer(correct);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../Assets/Sounds/correct.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handlePress = async (selectedOption: string) => {
    if (!isAnswered) {
      setSelectedAnswer(selectedOption);
      setIsAnswered(true);
      if (selectedOption === correctAnswer) {
        await playSound();
      }
    } else {
      generateNewQuestion();
    }
  };

  const getButtonStyle = (option: string) => {
    if (!isAnswered) return styles.optionB;
    if (option === correctAnswer) {
      return [styles.optionB, styles.correctB];
    }
    if (option === selectedAnswer && selectedAnswer !== correctAnswer) {
      return [styles.optionB, styles.wrongB];
    }
    return styles.optionB;
  };

  useEffect(() => {
    loadSentences();
  }, [category]);

  useEffect(() => {
    if (!isLoading && nativeSentences.length > 0 && targetSentences.length > 0) {
      generateNewQuestion();
    }
  }, [isLoading, nativeSentences, targetSentences]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingT}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.questionCard}>
        <Text style={styles.questionT}>{question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getButtonStyle(option)}
            onPress={() => handlePress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'gray',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionT: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    gap: 10,
  },
  optionB: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  optionText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  correctB: {
    backgroundColor: '#90EE90',
  },
  wrongB: {
    backgroundColor: '#FFB6C1',
  },
  loadingT: {
    fontSize: 18,
    textAlign: 'center',
  },
});