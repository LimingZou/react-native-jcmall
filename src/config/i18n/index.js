import I18n, { getLanguages } from "react-native-i18n";
import en from "./en";
import zh from "./zh";
I18n.fallbacks = true;
I18n.translations = {
  en,
  zh
};

// global.getLanguages=getLanguages;
export default I18n;
