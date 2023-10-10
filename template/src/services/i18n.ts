///<reference types="webpack-env" />

import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';
import { container } from 'tsyringe';
import Storage from '~/services/storage';
import resources from '~/translations';
// import {setDefaultOptions} from 'date-fns';
// import {enCA, frCA} from 'date-fns/locale';

export enum SupportedLanguage {
  en = 'en',
  fr = 'fr',
}

export const FALLBACK_LANGUAGE = SupportedLanguage.en;

function getDeviceLanguage() {
  try {
    const languageWithRegion =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager?.settings?.AppleLocale ||
          NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] // for iOS 13
        : NativeModules.I18nManager?.localeIdentifier;

    const language = languageWithRegion?.replace(/([-_][a-z]+)/i, '');

    if (Object.values(SupportedLanguage).includes(language)) {
      return language;
    }

    return FALLBACK_LANGUAGE;
  } catch (error) {
    return FALLBACK_LANGUAGE;
  }
}

const storage = container.resolve(Storage);

export const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init() {},

  async detect() {
    try {
      const language = storage.getItem('language');

      const finalLanguage = language || getDeviceLanguage();

      // setDefaultOptions({locale: finalLanguage === 'fr' ? frCA : enCA});
      return finalLanguage;
    } catch (_error) {
      return getDeviceLanguage();
    }
  },

  async cacheUserLanguage(language: string) {
    try {
      await storage.setItem('language', language);
      // setDefaultOptions({locale: language === 'fr' ? frCA : enCA});
    } catch (error) {}
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
      resources,
      debug: false,
      ns: Object.keys(resources.en),
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });
}

if (module.hot) {
  module.hot.accept(async () => {
    const { default: newResources } = await import('~/translations');

    for (const language in newResources) {
      const namespaces = newResources[language as keyof typeof newResources];

      for (const namespace in namespaces) {
        i18n.addResourceBundle(
          language,
          namespace,
          namespaces[namespace as keyof typeof namespaces],
          true,
          true
        );
      }
    }

    i18n.changeLanguage(i18n.language);
  });
}

export default i18n;
