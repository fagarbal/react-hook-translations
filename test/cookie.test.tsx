import { act } from '@testing-library/react-hooks';
import { initTranslations } from '../src';
import { initWithConfiguration, languageGetter } from './config.mock';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

describe('cookie', () => {
	beforeEach(() => {
		languageGetter.mockReturnValue('en-EN');
		cookies.remove('locale');
	});

	test('Should be saved with the key "locale"', () => {
		initTranslations({
			locales: ['en', 'es'],
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('en');
	});

	test('Should be saved with the navigator language', () => {
		initTranslations({
			locales: ['es', 'de', 'en'],
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('en');
	});

	test('Should be saved with first locales language if the navigator language is not possible', () => {
		languageGetter.mockReturnValue('ch-CH')

		initTranslations({
			locales: ['es', 'de', 'en'],
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('es');
	});

	test('Should be saved with fallback language if the navigator language is not possible', () => {
		languageGetter.mockReturnValue('ch-CH')

		initTranslations({
			locales: ['es', 'de', 'en'],
			fallback: 'de',
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('de');
	});

	test('Should save fallback language', () => {
		initTranslations({
			locales: ['de', 'es'],
			fallback: 'es',
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('es');
	});

	test('Should override with a valid locale', () => {
		cookies.set('locale', 'de');

		initTranslations({
			locales: ['en', 'es'],
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('en');
	});

	test('Should load cookie value', () => {
		cookies.set('locale', 'es');

		initTranslations({
			locales: ['en', 'es'],
			storage: 'cookie',
		});

		expect(cookies.get('locale')).toBe('es');
	});

	test('Should be saved with the custom "storageKey"', () => {
		initTranslations({
			locales: ['en', 'es'],
			storageKey: 'otherKey',
			storage: 'cookie',
		});

		expect(cookies.get('otherKey')).toBe('en');

		cookies.remove('otherKey');
	});

	test('Should change the language', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
			storage: 'cookie',
		});

		act(() => {
			result.current.setLocale('es');
		});

		expect(cookies.get('locale')).toBe('es');
	});

	test('Should keep the language if changed language not found', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
			storage: 'cookie',
		});

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(cookies.get('locale')).toBe('en');
	});

	test('Should keep the language when fallback is present if changed language not found', () => {
		const result = initWithConfiguration({
			locales: ['en', 'es'],
			fallback: 'es',
			storage: 'cookie',
		});

		act(() => {
			result.current.setLocale('de' as any);
		});

		expect(cookies.get('locale')).toBe('en');
	});
});
