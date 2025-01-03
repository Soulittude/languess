import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

// Import your language data files
import trWordsData from '../Data/Words/tr_words.json';
import enWordsData from '../Data/Words/en_words.json';
import ruWordsData from '../Data/Words/ru_words.json';
import esWordsData from '../Data/Words/es_words.json';
import arWordsData from '../Data/Words/ar_words.json';
import frWordsData from '../Data/Words/fr_words.json';
import deWordsData from '../Data/Words/de_words.json';
import jaWordsData from '../Data/Words/ja_words.json';
import ptWordsData from '../Data/Words/pt_words.json';
import faWordsData from '../Data/Words/fa_words.json';

const languageMap = {
  en: enWordsData,
  tr: trWordsData,
  ru: ruWordsData,
  es: esWordsData,
  ar: arWordsData,
  fr: frWordsData,
  de: deWordsData,
  ja: jaWordsData,
  pt: ptWordsData,
  fa: faWordsData,
};

const STORAGE_KEYS = {
  nativeLanguage: '@native_language',
  targetLanguage: '@target_language',
};

interface RouteParams {
  category: string;
}

export const WordsGame = () => {
  const route = useRoute<RouteProp<{ Params: RouteParams }, 'Params'>>(); // Update type
  const category = route.params?.category || '';  // Default to an empty string if not set
  const navigation = useNavigation();

  const [nativeWords, setNativeWords] = useState<string[]>([]);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getWordsForCategory = (data: any, categoryId: string): string[] => {
    // Helper function to split array into two parts
    const splitArray = (arr: string[]): [string[], string[]] => {
      const midPoint = Math.ceil(arr.length / 2);
      return [arr.slice(0, midPoint), arr.slice(midPoint)];
    };
  
    switch (categoryId) {
      case 'basic':
        return data.basic;
      case 'pronouns1': {
        const [firstHalf] = splitArray(data.pronouns);
        return firstHalf;
      }
      case 'pronouns2': {
        const [, secondHalf] = splitArray(data.pronouns);
        return secondHalf;
      }
      case 'verbs1': {
        const [firstHalf] = splitArray(data.verbs);
        return firstHalf;
      }
      case 'verbs2': {
        const [, secondHalf] = splitArray(data.verbs);
        return secondHalf;
      }
      case 'nouns1': {
        const [firstHalf] = splitArray(data.nouns);
        return firstHalf;
      }
      case 'nouns2': {
        const [, secondHalf] = splitArray(data.nouns);
        return secondHalf;
      }
      case 'determiners':
        return data.determiners;
      case 'adjectives1': {
        const [firstHalf] = splitArray(data.adjectives);
        return firstHalf;
      }
      case 'adjectives2': {
        const [, secondHalf] = splitArray(data.adjectives);
        return secondHalf;
      }
      case 'adverbs':
        return data.adverbs;
      case 'prepositions':
        return data.prepositions;
      default:
        return [];
    }
  };

  const loadWords = async () => {
    try {
      const storedNative = await AsyncStorage.getItem(STORAGE_KEYS.nativeLanguage) || 'en';
      const storedTarget = await AsyncStorage.getItem(STORAGE_KEYS.targetLanguage) || 'tr';

      const nativeData = languageMap[storedNative as keyof typeof languageMap];
      const targetData = languageMap[storedTarget as keyof typeof languageMap];

      const nativeWordsList = getWordsForCategory(nativeData, category);
      const targetWordsList = getWordsForCategory(targetData, category);

      setNativeWords(nativeWordsList);
      setTargetWords(targetWordsList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading words:', error);
      setIsLoading(false);
    }
  };

  const generateNewQuestion = () => {
    if (nativeWords.length === 0 || targetWords.length === 0) return;

    const questionIndex = Math.floor(Math.random() * targetWords.length);
    const correct = nativeWords[questionIndex];
    const questionWord = targetWords[questionIndex];

    const wrongAnswersSet = new Set<string>();
    const maxAttempts = 50;
    let attempts = 0;

    while (wrongAnswersSet.size < 3 && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * nativeWords.length);
      const wrongAnswer = nativeWords[randomIndex];
      if (wrongAnswer !== correct) {
        wrongAnswersSet.add(wrongAnswer);
      }
      attempts++;
    }

    setQuestion(questionWord);
    setOptions([correct, ...Array.from(wrongAnswersSet)].sort(() => Math.random() - 0.5));
    setCorrectAnswer(correct);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const playSound = async () => {
    let sound: Audio.Sound | null = null;
  
    try {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../Assets/Sounds/correct.mp3')
      );
      sound = loadedSound;
      await sound.playAsync();
  
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          sound?.unloadAsync().catch(() => {}); // Hata olursa crash'i önlemek için boş catch
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
    loadWords();
  }, [category]);

  useEffect(() => {
    if (!isLoading && nativeWords.length > 0 && targetWords.length > 0) {
      generateNewQuestion();
    }
  }, [isLoading, nativeWords, targetWords]);

  // Dynamically set header title based on category
  useLayoutEffect(() => {
    if (category) {
      navigation.setOptions({
        title: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize category title
      });
    }
  }, [category, navigation]);

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