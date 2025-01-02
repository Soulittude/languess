import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

// Define the type for the params expected by the SentencesGame screen
type RootStackParamList = {
  SentencesCategory: undefined; // or other screens in the stack
  SentencesGame: { category: string };
};

// Define the navigation prop type
type SentencesCategoryNavigationProp = StackNavigationProp<RootStackParamList, 'SentencesCategory'>;

// Define categories
const CATEGORIES = [
  { id: 'basic', titleKey: 'Basic' },
  { id: 'pronouns1', titleKey: 'Pronouns 1 (Personal)' },
  { id: 'pronouns2', titleKey: 'Pronouns 2 (Other)' },
  { id: 'verbs1', titleKey: 'Verbs 1' },
  { id: 'verbs2', titleKey: 'Verbs 2' },
  { id: 'nouns1', titleKey: 'Nouns 1' },
  { id: 'nouns2', titleKey: 'Nouns 2' },
  { id: 'determiners', titleKey: 'Determiners' },
  { id: 'adjectives1', titleKey: 'Adjectives 1' },
  { id: 'adjectives-2', titleKey: 'Adjectives 2' },
  { id: 'adverbs', titleKey: 'Adverbs' },
  { id: 'prepositions', titleKey: 'Prepositions' },
];
//d
export const SentencesCategory = () => {
  const navigation = useNavigation<SentencesCategoryNavigationProp>();
  const { t } = useTranslation(); // Access the translation function

  const handleCategoryPress = (category: string) => {
    navigation.navigate('SentencesGame', { category }); // `category` is typed as `string`
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.id)} // `category.id` is passed as string
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
