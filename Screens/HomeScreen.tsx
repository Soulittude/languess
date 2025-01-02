import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';

// Device width for responsive design
const { width } = Dimensions.get('window');

const languages = [
  { code: 'tr', name: 'Türkçe', icon: require('../Assets/Flags/tr.png') },
  { code: 'en', name: 'English', icon: require('../Assets/Flags/en.png') },
  { code: 'ru', name: 'Русский', icon: require('../Assets/Flags/ru.png') },
  { code: 'es', name: 'Español', icon: require('../Assets/Flags/es.png') },
  { code: 'ar', name: 'العربية', icon: require('../Assets/Flags/ar.png') },
  { code: 'fr', name: 'Français', icon: require('../Assets/Flags/fr.png') },
  { code: 'de', name: 'Deutsch', icon: require('../Assets/Flags/de.png') },
  { code: 'ja', name: '日本語', icon: require('../Assets/Flags/ja.png') },
  { code: 'pt', name: 'Português', icon: require('../Assets/Flags/pt.png') },
  { code: 'fa', name: 'فارسی', icon: require('../Assets/Flags/fa.png') },
];

const STORAGE_KEYS = {
  nativeLanguage: '@native_language',
  targetLanguage: '@target_language'
};

export const HomeScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [nativeLanguage, setNativeLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('tr');

  useEffect(() => {
    loadStoredLanguages();
  }, []);

  const loadStoredLanguages = async () => {
    try {
      const storedNative = await AsyncStorage.getItem(STORAGE_KEYS.nativeLanguage);
      const storedTarget = await AsyncStorage.getItem(STORAGE_KEYS.targetLanguage);

      if (storedNative) {
        setNativeLanguage(storedNative);
        changeLanguage(storedNative);
      } else {
        await AsyncStorage.setItem(STORAGE_KEYS.nativeLanguage, 'en');
      }

      if (storedTarget) {
        setTargetLanguage(storedTarget);
      } else {
        await AsyncStorage.setItem(STORAGE_KEYS.targetLanguage, 'tr');
      }
    } catch (error) {
      console.error('Error loading language preferences:', error);
    }
  };

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleNativeLanguageChange = async (lng: string) => {
    try {
      setNativeLanguage(lng);
      changeLanguage(lng);
      await AsyncStorage.setItem(STORAGE_KEYS.nativeLanguage, lng);
    } catch (error) {
      console.error('Error saving native language:', error);
    }
  };

  const handleTargetLanguageChange = async (lng: string) => {
    try {
      setTargetLanguage(lng);
      await AsyncStorage.setItem(STORAGE_KEYS.targetLanguage, lng);
    } catch (error) {
      console.error('Error saving target language:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.selectorsContainer}>
          <View style={styles.selector}>
            <Text style={styles.selectorT}>{t('selectNative')}</Text>
            <View style={styles.languageButtonsContainer}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageB,
                    nativeLanguage === lang.code && styles.selectedLanguageB
                  ]}
                  onPress={() => handleNativeLanguageChange(lang.code)}
                >
                  <Image source={lang.icon} style={styles.flagIcon} />
                  <Text style={styles.languageBT}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.selector}>
            <Text style={styles.selectorT}>{t('selectTarget')}</Text>
            <View style={styles.languageButtonsContainer}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageB,
                    targetLanguage === lang.code && styles.selectedLanguageB
                  ]}
                  onPress={() => handleTargetLanguageChange(lang.code)}
                >
                  <Image source={lang.icon} style={styles.flagIcon} />
                  <Text style={styles.languageBT}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.menuButtonsContainer}>
          <TouchableOpacity
            style={styles.menuB}
            onPress={() => navigation.navigate('WordsCategory')}
          >
            <Text style={styles.menuBT}>{t('words')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuB}
            onPress={() => navigation.navigate('SentencesCategory')}
          >
            <Text style={styles.menuBT}>{t('sentences')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  selectorsContainer: {
    width: '100%',
    flexDirection: 'column', // Alt alta sıralama
    alignItems: 'center', // Ortada hizalama
    marginBottom: 20, // Aralık ekle
  },
  selector: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Native ve Goal selector arası boşluk
  },
  selectorT: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  languageButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Yatayda ortalama
  },
  languageB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5, // Daha küçük padding
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#ADD8E6',
    margin: 5,
    width: 'auto', // Otomatik genişlik
    height: 35, // Buton boyutu
  },
  languageBT: {
    fontSize: 12, // Küçük font boyutu
    textAlign: 'center',
    marginLeft: 5, // Bayrağın yanındaki yazı için boşluk
  },
  selectedLanguageB: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  flagIcon: {
    width: 18, // Küçük bayrak boyutu
    height: 18,
  },
  menuButtonsContainer: {
    width: '100%',
    marginTop: 30,
  },
  menuB: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderColor: 'black',
  },
  menuBT: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
