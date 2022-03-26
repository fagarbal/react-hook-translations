import { act } from '@testing-library/react-hooks';
import { initTranslations } from '../src';
import { initWithConfiguration, languageGetter } from './config.mock';

describe('localStorage', () => {
	beforeEach(() => {
		languageGetter.mockReturnValue('en-EN');
		window.localStorage.clear();
	});

	test('Should be saved with the key "locale"', () => {
		initTranslations({
			locales: ['en', 'es'],
		});

		expect(window.localStorage.getItem('locale')).toBe('en');
	});

	test('Should be saved with the navigator language', () => {
		initTranslations({
			locales: ['es', 'de', 'en'],
		});

		expect(window.localStorage.getItem('locale')).toBe('en');
	});

	test('Should be saved with first locales language if the navigator language is not possible', () => {
		languageGetter.mockReturnValue('ch-CH');

		initTranslations({
			locales: ['es', 'de', 'en'],
		});

		expect(window.localStorage.getItem('locale')).toBe('es');
	});

	test('Should be saved with fallback language if the navigator language is not possible', () => {
		languageGetter.mockReturnValue('ch-CH');

		initTranslations({
			locales: ['es', 'de', 'en'],
			fallback: 'de',
		});

		expect(window.localStorage.getItem('locale')).toBe('de');
	});

	test('Should save fallback language', () => {
		initTranslations({
			locales: ['de', 'es'],
			fallback: 'es',
		});

		expect(window.localStorage.getItem('locale')).toBe('es');
	});

	test('Should override with a valid locale', () => {
		window.localStorage.setItem('locale', 'de');

		initTranslations({
			locales: ['en', 'es'],
		});

		expect(window.localStorage.getItem('locale')).toBe('en');
	});

	test('Should load localStorage value', () => {
		window.localStorage.setItem('locale', 'es');

		initTranslations({
			locales: ['en', 'es'],
		});

		expect(window.localStorage.getItem('locale')).toBe('es');
	});

	test('Should be saved with the custom "storageKey"', () => {
		initTranslations({
			locales: ['en', 'es'],
			storageKey: 'otherKey'
		});

		expect(window.localStorage.getItem('otherKey')).toBe('en');
	});

	test('Should change the language', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
		});

		act(() => {
			result.current.setLocale('es');
		});

		expect(window.localStorage.getItem('locale')).toBe('es');
	});

	test('Should keep the language if changed language not found', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
		});

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(window.localStorage.getItem('locale')).toBe('en');
	});

	test('Should keep the language when fallback is present if changed language not found', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
			fallback: 'es',
		});

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(window.localStorage.getItem('locale')).toBe('en');
	});
});
