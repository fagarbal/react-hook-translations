/// <reference types="react" />
export declare type TranslationsConfig<T> = {
    locales: T[];
    fallback?: TranslationsConfig<T>['locales'][number];
    storage?: 'localStorage' | 'sessionStorage';
    storageKey?: string;
};
export declare function initTranslations<T extends string>(config: TranslationsConfig<T>): {
    locales: T[];
    makeTranslations: <P>(translations: { [key in T]: { [key_1 in keyof P]: P[key_1]; }; }) => () => { [key in T]: { [key_1 in keyof P]: P[key_1]; }; }[T];
    TranslationsProvider: import("react").FC<{}>;
    useLocale: () => [T, (locale: T) => void, T[]];
};
//# sourceMappingURL=index.d.ts.map