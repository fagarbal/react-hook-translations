"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTranslations = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
function initTranslations(config) {
    var storage = config.storage || 'localStorage';
    var storageKey = config.storageKey || 'locale';
    config.fallback = config.fallback || config.locales[0];
    var browserLang = config.locales.find(function (locale) { return locale === navigator.language.split('-')[0]; });
    var storageValue = config.locales.find(function (locale) { return locale === window[storage].getItem(storageKey); });
    var selectedLang = storageValue || browserLang || config.fallback;
    if (!storageValue) {
        window[storage].setItem(storageKey, selectedLang);
    }
    var localeContext = (0, react_2.createContext)({});
    var useLocale = function () { return (0, react_2.useContext)(localeContext); };
    function makeTranslations(translations) {
        return function () {
            var state = (0, react_2.useState)(translations)[0];
            var lang = useLocale()[0];
            return (state[lang]);
        };
    }
    var TranslationsProvider = function (_a) {
        var children = _a.children;
        var _b = (0, react_2.useState)(selectedLang), locale = _b[0], _setLocale = _b[1];
        var setLocale = function (lang) {
            if (config.locales.includes(lang) && locale !== lang) {
                window[storage].setItem(storageKey, lang);
                _setLocale(lang);
            }
            else {
                window[storage].setItem(storageKey, config.fallback);
                _setLocale(config.fallback);
            }
        };
        return ((0, jsx_runtime_1.jsx)(localeContext.Provider, __assign({ value: [locale, setLocale, config.locales] }, { children: children }), void 0));
    };
    var useRouteTranslations = function (param) {
        var _a = useLocale(), locale = _a[0], setLocale = _a[1];
        (0, react_1.useEffect)(function () {
            if (config.locales.includes(param) && locale !== param) {
                setLocale(param);
            }
        }, [param]);
    };
    return {
        locales: config.locales,
        makeTranslations: makeTranslations,
        TranslationsProvider: TranslationsProvider,
        useLocale: useLocale,
        useRouteTranslations: useRouteTranslations,
    };
}
exports.initTranslations = initTranslations;
//# sourceMappingURL=index.js.map