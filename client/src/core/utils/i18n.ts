import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-xhr-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "en",
        load: "currentOnly",
        keySeparator: '.',
        ns: ['common', 'dashboard'],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== "production",
        react: {
            useSuspense:false,
            wait: true,
        },
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        }
    });

export default i18n;
