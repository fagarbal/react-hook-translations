import { act } from '@testing-library/react-hooks';
import { initTranslations } from '../src';
import { initWithConfiguration, languageGetter } from './config.mock';

describe('Storage', () => {
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

		test('Should load localStorage value ', () => {
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

		test('Should change the language to first locale if language not found', () => {
			const result = initWithConfiguration({
				locales: ['en', 'es'],
			});

			act(() => {
				result.current.setLocale('de' as any);
			});

			expect(window.localStorage.getItem('locale')).toBe('en');
		});

		test('Should change the language to fallback if language not found', () => {
			const result = initWithConfiguration({
				locales: ['en', 'es'],
				fallback: 'es',
			});

			act(() => {
				result.current.setLocale('de' as any);
			});

			expect(window.localStorage.getItem('locale')).toBe('es');
		});
	});

	describe('sessionStorage', () => {
		beforeEach(() => {
			window.sessionStorage.clear();
			languageGetter.mockReturnValue('en-EN');
		});

		test('Should be saved with the key "locale"', () => {
			initTranslations({
				locales: ['en', 'es'],
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('en');
		});

		test('Should be saved with the navigator language', () => {
			initTranslations({
				locales: ['es', 'de', 'en'],
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('en');
		});

		test('Should be saved with first locales language if the navigator language is not possible', () => {
			languageGetter.mockReturnValue('ch-CH')

			initTranslations({
				locales: ['es', 'de', 'en'],
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('es');
		});

		test('Should be saved with fallback language if the navigator language is not possible', () => {
			languageGetter.mockReturnValue('ch-CH')

			initTranslations({
				locales: ['es', 'de', 'en'],
				fallback: 'de',
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('de');
		});

		test('Should save fallback language', () => {
			initTranslations({
				locales: ['de', 'es'],
				fallback: 'es',
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('es');
		});

		test('Should override with a valid locale', () => {
			window.localStorage.setItem('locale', 'de');

			initTranslations({
				locales: ['en', 'es'],
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('en');
		});

		test('Should load sessionStorage value ', () => {
			window.sessionStorage.setItem('locale', 'es');

			initTranslations({
				locales: ['en', 'es'],
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('locale')).toBe('es');
		});

		test('Should be saved with the custom "storageKey"', () => {
			initTranslations({
				locales: ['en', 'es'],
				storageKey: 'otherKey',
				storage: 'sessionStorage',
			});

			expect(window.sessionStorage.getItem('otherKey')).toBe('en');
		});

		test('Should change the language', () => {
			const result = initWithConfiguration({
				locales: ['en', 'es'],
				storage: 'sessionStorage',
			});

			act(() => {
				result.current.setLocale('es');
			});

			expect(window.sessionStorage.getItem('locale')).toBe('es');
		});

		test('Should change the language to first locale if language not found', () => {
			const result = initWithConfiguration({
				locales: ['en', 'es'],
				storage: 'sessionStorage',
			});

			act(() => {
				result.current.setLocale('de' as any);
			});

			expect(window.sessionStorage.getItem('locale')).toBe('en');
		});

		test('Should change the language to fallback if language not found', () => {
			const result = initWithConfiguration({
				locales: ['en', 'es'],
				fallback: 'es',
				storage: 'sessionStorage',
			});

			act(() => {
				result.current.setLocale('de' as any);
			});

			expect(window.sessionStorage.getItem('locale')).toBe('es');
		});
	});
});
