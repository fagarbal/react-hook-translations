# react-hook-translations

## Installing

```
npm install react-hook-translations
```

## Setup

```ts
// translations.config.ts

import { initTranslations } from 'react-hook-translations';

const translations = initTranslations({
	locales: ['en', 'es'],

	fallback: 'es',
	// optional
	// default locale. If not defined, locales[0] is the fallback value

	storage: 'localStorage',
	// optional
	// default: localStorage
	// options: localStorage | sessionStorage

	storageKey: 'locale',
	// optional
	// default: locale
	// key used for storing data into localStorage or sessionStorage
});

export const {
	useLocale,
	makeTranslations,
	TranslationsProvider,
	useRouteTranslations,
	locales,
} = translations;

```

```tsx
// App.tsx
import { TranslationsProvider } from './translations.config.ts';
import CustomComponent from './CustomComponent.tsx';

const App: React.FC = () => {
	return (
		<TranslationsProvider>
			<CustomComponent />
		</TranslationsProvider>
	);
}

export default App;

```

## useTranslations hook

```tsx
// CustomComponent.tsx
import { makeTranslations } from './translations.config.ts';

const useTranslations = makeTranslations({
	en: {
		title: 'Title',
		description: 'Description',
	},
	es: {
		title: 'Titulo',
		description: 'Descripción',
	},
});

const CustomComponent: React.FC = () => {
	const translations = useTranslations();

	return (
		<div>
			<div>{translations.title}</div>
			<div>{translations.description}</div>
		</div>
	);
}

export default CustomComponent;

```

## useLocale hook

```tsx
// CustomComponent.tsx
import { useLocale } from './translations.config.ts';

const useTranslations = makeTranslations({
	en: {
		language: 'Language',
		changeLanguage: 'Change language',
		languages: {
			en: 'English',
			es: 'Spanish',
		}
	},
	es: {
		language: 'Idioma',
		changeLanguage: 'Cambiar idioma',
		languages: {
			en: 'Inglés',
			es: 'Español',
		},
	},
})

const CustomComponent: React.FC = () => {
	const [locale, setLocale, locales] = useLocale();

	return (
		<div>
			<div>{translations.language}: {translations.languages[locale]}</div>

			{locales.map((lang) =>
				<button onClick={() => setLocale(lang)}>
					{translations.changeLanguage}: {translations.languages[lang]}
				</button>
			)}
		</div>
	);
}

export default CustomComponent;

```
