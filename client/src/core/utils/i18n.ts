import i18n, { InitOptions } from 'i18next';
import { merge } from 'lodash';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

export default function(options = {}): void {
    let i18nOptions: InitOptions = {
        lng: 'en',
        load: 'currentOnly',
        keySeparator: '.',
        ns: ['common', 'dashboard', 'login', 'ui'],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== 'production',
        react: {
            wait: true,
        },
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    };

    merge(i18nOptions, options);

    i18n.use(Backend)
        .use(initReactI18next)
        .init(i18nOptions);
}
