import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translationGetters = {
  en: () => require('../constants/locales/en.json'),
  te: () => require('../constants/locales/te.json'),
  mr: () => require('../constants/locales/mr.json'),
  hi: () => require('../constants/locales/hi.json'),
  ta: () => require('../constants/locales/ta.json'),
  kn: () => require('../constants/locales/kn.json'),
  or: () => require('../constants/locales/or.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (language) => {
  const fallback = { languageTag: 'en', isRTL: false };
  console.log('i18n', language);
  if (language) {
    const { languageTag, isRTL } = language || fallback;

    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  } else {
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  }
};
