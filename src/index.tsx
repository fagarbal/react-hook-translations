import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

export type TranslationsConfig<T> = {
	locales: T[];
	fallback?: TranslationsConfig<T>['locales'][number];
	storage?: 'localStorage' | 'sessionStorage';
	storageKey?: string;
};

export function initTranslations<T extends string>(config: TranslationsConfig<T>) {
	type LocaleUnion = typeof config.locales[number];

	const storage = config.storage || 'localStorage';
	const storageKey = config.storageKey || 'locale';

	config.fallback = config.fallback || config.locales[0];

	const browserLang = config.locales.find(
		(locale) => locale === navigator.language.split('-')[0]
	);
	const storageValue = config.locales.find(
		(locale) => locale === window[storage].getItem(storageKey)
	);

	const selectedLang =
		storageValue || browserLang || config.fallback;

	if (!storageValue) {
		window[storage].setItem(storageKey, selectedLang);
	}

	const localeContext = createContext<
		[LocaleUnion, (locale: LocaleUnion) => void, LocaleUnion[]]
	>({} as [LocaleUnion, (locale: LocaleUnion) => void, LocaleUnion[]]);

	const useLocale = () => useContext(localeContext);

	function makeTranslations<P>(
		translations: {
			[key in LocaleUnion]: {
				[key in keyof P]: P[key];
			};
		},
	) {
		return () => {
			const [state] = useState(translations);
			const [lang] = useLocale();

			return (
				state[lang as LocaleUnion]
			);
		};
	}

	const TranslationsProvider: React.FC = ({ children }) => {
		const [locale, _setLocale] = useState(selectedLang);

		const setLocale = (lang: LocaleUnion) => {
			if (config.locales.includes(lang) && locale !== lang) {
				window[storage].setItem(storageKey, lang);
				_setLocale(lang);
			} else {
				window[storage].setItem(storageKey, config.fallback as LocaleUnion);
				_setLocale(config.fallback as LocaleUnion);
			}
		};

		return (
			<localeContext.Provider value={[locale, setLocale, config.locales]}>
				{children}
			</localeContext.Provider>
		);
	};

	const useRouteTranslations = (param: string) => {
		const [locale, setLocale] = useLocale();

		useEffect(() => {
			if (config.locales.includes(param as LocaleUnion) && locale !== param) {
				setLocale(param as LocaleUnion);
			}
		}, [param]);
	};

	return {
		locales: config.locales,
		makeTranslations,
		TranslationsProvider,
		useLocale,
		useRouteTranslations,
	};
}
