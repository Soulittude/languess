import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './i18n';
import { WordsCategory } from './Screens/WordsCategoryScreen';
import { WordsGame } from './Screens/WordsGameScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { SentencesGame } from './Screens/SentencesGameScreen';
import { SentencesCategory } from './Screens/SentencesCategoryScreen';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';

// Define the type for the route params for the WordsGame screen
type RootStackParamList = {
  Home: undefined;
  WordsCategory: undefined;
  WordsGame: { category: string }; // Add the category prop here
  SentencesCategory: undefined;
  SentencesGame: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: t('homeTitle'),
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="WordsCategory"
          component={WordsCategory} 
          options={{
            title: t('wordsCategoryTitle'),
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="WordsGame"
          component={WordsGame} 
          options={({ route }: { route: RouteProp<RootStackParamList, 'WordsGame'> }) => ({
            title: route.params?.category
              ? t(route.params.category)
              : t('wordsGameTitle'),
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen 
          name="SentencesCategory"
          component={SentencesCategory} 
          options={{
            title: t('sentencesCategoryTitle'),
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen 
          name="SentencesGame"
          component={SentencesGame} 
          options={{
            title: t('sentencesGameTitle'),
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
