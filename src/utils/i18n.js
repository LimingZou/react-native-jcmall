import I18n from "../config/i18n/index";

const replace = (template = "", obj = {}) => {
  return Object.keys(obj).reduce(
    (s, key) => s.replace(new RegExp("\\$\\{" + key + "\\}", "g"), obj[key]),
    template
  );
};

export const I18nLocal = {
  wrapper: (key, options) => {
    const template = I18n.t(key);
    if (!options) {
      return template;
    }
    return replace(template, options);
  },
  locale: locale => {
    I18n.locale = locale;
  }
};
