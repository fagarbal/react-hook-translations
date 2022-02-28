import { renderHook } from '@testing-library/react-hooks';
import { initTranslations, TranslationsConfig } from '../src';

export const languageGetter = jest.spyOn(navigator, 'language', 'get');

export const translationsConfig = {
	en: {
		text: 'Hello',
		textWithParams: (param: number) => `Hello ${param}`,
		jsx: <>Hello</>,
		jsxWithParams: (param: number) => <>{`Hello ${param}`}</>,
	},
	es: {
		text: 'Hola',
		textWithParams: (param: number) => `Hola ${param}`,
		jsx: <>Hola</>,
		jsxWithParams: (param: number) => <>{`Hola ${param}`}</>,
	},
};

export function initWithConfiguration<T extends string>(config: TranslationsConfig<T>) {
	const { TranslationsProvider, useLocale } = initTranslations(config);

	const wrapper: React.FC = ({ children }) => <TranslationsProvider>{children}</TranslationsProvider>;

	const { result } = renderHook(() => {
		const [locale, setLocale] = useLocale();

		return {
			locale,
			setLocale,
		};
	}, { wrapper });

	return result;
}

export function initWithUseRouteTranslations<T extends string>(config: TranslationsConfig<T>, initLocale: string) {
	const { TranslationsProvider, useLocale, useRouteTranslations } = initTranslations(config);

	const wrapper: React.FC = ({ children }) => <TranslationsProvider>{children}</TranslationsProvider>;

	const { result } = renderHook(() => {
		useRouteTranslations(initLocale);
		const [locale, setLocale] = useLocale();

		return {
			locale,
			setLocale,
		};
	}, { wrapper });

	return result;
}

export function initWithTranslationsConfiguration<T extends string, P>(config: TranslationsConfig<T>, translationsConfig: {
	[key in T]: {
		[key in keyof P]: P[key];
	}
}) {
	const { TranslationsProvider, makeTranslations, useLocale, useRouteTranslations, locales } = initTranslations(config);

	const wrapper: React.FC = ({ children }) => <TranslationsProvider>{children}</TranslationsProvider>;

	const { result } = renderHook(() => {
		const [locale, setLocale, hookLocales] = useLocale();
		const translations = makeTranslations(translationsConfig)();

		return {
			locale,
			locales: hookLocales,
			globalLocales: locales,
			setLocale,
			translations,
			useRouteTranslations,
		};
	}, { wrapper });

	return result;
}
