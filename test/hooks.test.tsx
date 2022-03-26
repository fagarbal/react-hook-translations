

import { act } from '@testing-library/react-hooks';
import { initWithTranslationsConfiguration, languageGetter, translationsConfig } from './config.mock';

describe('Hooks', () => {
	beforeEach(() => {
		languageGetter.mockReturnValue('en-EN');
		localStorage.clear();
	});

	test('Should have locales defined', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.locales).toStrictEqual(['en', 'es']);
	});

	test('Should have global locales defined', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.globalLocales).toStrictEqual(['en', 'es']);
	});

	test('Should load navigator default language by default', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.locale).toBe('en');
		expect(result.current.translations.text).toBe('Hello');
	});

	test('Should load first locale if navigator default language not found', () => {
		languageGetter.mockReturnValue('ch-CH');

		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.locale).toBe('en');
		expect(result.current.translations.text).toBe('Hello');
	});

	test('Should load fallback locale if navigator default language not found', () => {
		languageGetter.mockReturnValue('ch-CH');

		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
			fallback: 'es',
		}, translationsConfig);

		expect(result.current.locale).toBe('es');
		expect(result.current.translations.text).toBe('Hola');
	});

	test('Should change the language', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		act(() => {
			result.current.setLocale('es');
		});

		expect(result.current.locale).toBe('es');
		expect(result.current.translations.text).toBe('Hola');
	});

	test('Should keep locale if changed language not found', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(result.current.locale).toBe('en');
		expect(result.current.translations.text).toBe('Hello');
	});

	test('Should keep locale when fallback is present if changed language not found', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
			fallback: 'es',
		}, translationsConfig);

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(result.current.locale).toBe('en');
		expect(result.current.translations.text).toBe('Hello');
	});

	test('Should show text with params', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.translations.textWithParams(1)).toBe('Hello 1');

		act(() => {
			result.current.setLocale('es');
		});

		expect(result.current.translations.textWithParams(1)).toBe('Hola 1');
	});

	test('Should show jsx', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.translations.jsx).toStrictEqual(<>Hello</>);

		act(() => {
			result.current.setLocale('es');
		});

		expect(result.current.translations.jsx).toStrictEqual(<>Hola</>);
	});

	test('Should show jsx with params', () => {
		const result = initWithTranslationsConfiguration({
			locales: ['en', 'es'],
		}, translationsConfig);

		expect(result.current.translations.jsxWithParams(1)).toStrictEqual(<>Hello 1</>);

		act(() => {
			result.current.setLocale('es');
		});

		expect(result.current.translations.jsxWithParams(1)).toStrictEqual(<>Hola 1</>);
	});
});
