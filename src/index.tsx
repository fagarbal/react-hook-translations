import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export type TranslationsConfig<T> = {
	locales: T[];
	fallback?: TranslationsConfig<T>['locales'][number];
	storage?: 'localStorage' | 'sessionStorage' | 'cookie';
	storageKey?: string;
};

export function initTranslations<T extends string>(config: TranslationsConfig<T>) {
	type LocaleUnion = typeof config.locales[number];

	const locales = config.locales;
	const fallback = config.fallback;
	const storage = config.storage || 'localStorage';
	const storageKey = config.storageKey || 'locale';

	const browserLocale = locales.find(
		(locale) => locale === navigator.language.split('-')[0]
	);

	const storageValue = storage === 'cookie' ? cookies.get(storageKey) : window[storage].getItem(storageKey);

	const storageLocale = locales.find(
		(locale) => locale === storageValue
	);

	const selectedLocale =
		storageLocale || browserLocale || fallback || locales[0];

	if (!storageLocale) {
		if (storage === 'cookie') {
			cookies.set(storageKey, selectedLocale);
		} else {
			window[storage].setItem(storageKey, selectedLocale);
		}
	}

	const localeContext = createContext<
		[LocaleUnion, (locale: LocaleUnion) => void, LocaleUnion[]]
	>({} as [LocaleUnion, (locale: LocaleUnion) => void, LocaleUnion[]]);

	const useLocale = () => useContext(localeContext);

	const makeTranslations = <P extends unknown>(
		translations: {
			[key in LocaleUnion]: {
				[key in keyof P]: P[key];
			};
		},
	) => () => {
		const [lang] = useLocale();

		return translations[lang];
	};

	const TranslationsProvider: React.FC = ({ children }) => {
		const [locale, _setLocale] = useState(selectedLocale);

		const setLocale = (lang: LocaleUnion) => {
			const isValidLocale = locales.includes(lang) && locale !== lang;
			const value = isValidLocale ? lang : selectedLocale;

			if (storage === 'cookie') {
				cookies.set(storageKey, value);
			} else {
				window[storage].setItem(storageKey, value);
			}
			_setLocale(value);
		};

		return (
			<localeContext.Provider value={[locale, setLocale, locales]}>
				{children}
			</localeContext.Provider>
		);
	};

	return {
		locales,
		makeTranslations,
		TranslationsProvider,
		useLocale,
	};
}
