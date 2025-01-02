import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  WordsCategory: undefined;
  WordsGame: { category: string }; // Pass category here
};

type WordsCategoryNavigationProp = StackNavigationProp<RootStackParamList, 'WordsCategory'>;

const CATEGORIES = [
  { id: 'basic', titleKey: 'basic' },
  { id: 'pronouns1', titleKey: 'pronouns1' },
  { id: 'pronouns2', titleKey: 'pronouns2' },
  { id: 'verbs1', titleKey: 'verbs1' },
  { id: 'verbs2', titleKey: 'verbs2' },
  { id: 'nouns1', titleKey: 'nouns1' },
  { id: 'nouns2', titleKey: 'nouns2' },
  { id: 'determiners', titleKey: 'determiners' },
  { id: 'adjectives1', titleKey: 'adjectives1' },
  { id: 'adjectives2', titleKey: 'adjectives2' },
  { id: 'adverbs', titleKey: 'adverbs' },
  { id: 'prepositions', titleKey: 'prepositions' },
];

export const WordsCategory = () => {
  const navigation = useNavigation<WordsCategoryNavigationProp>();
  const { t } = useTranslation();

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('WordsGame', { category: categoryId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text style={styles.categoryButtonText}>{t(category.titleKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  categoryContainer: {
    padding: 20,
    gap: 10,
  },
  categoryButton: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  categoryButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});
