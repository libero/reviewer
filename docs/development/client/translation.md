# Translation

Reviewer uses the react-i18next package for translation (https://react.i18next.com/).

## Initialisation

Different environments will need different settings for translations (e.g. tests), so all configuration
settings for the i18next package can be customised by passing an object to the function exported by the
i18n file. For example

```ts
import I18n from './src/core/utils/i18n';

I18n({
    debug: false,
    fallbackLng: false,
    react: {
        useSuspense: false
    }
})
```

See [the documentation](https://www.i18next.com/overview/configuration-options) for more information about
configuring the i18next package.

## Translation files
Translations are stored in json files located in `client/src/core/locales`. The files are divided
by locale (e.g. en, fr, etc...) and then by namespace, each file representing a namespace.

A translation file contains a JSON object with the translations strings:

```json
{
    "navbar": {
        "dashboard": "Dashboard",
        "author-guide": "Author Guide",
        "reviewer-guide": "Reviewer Guide",
        "contact-us": "Contact Us"
    }
}
```

Translations are loaded on demand via a json XHR request.

## Translating strings

The react-i18next package provides react hooks for functional components. First import the `useTranslation`:

```ts
import { useTranslation } from "react-i18next";
```

Inside the component, call the hook to get the `t` method

```ts
const Example = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>{ t('common:navbar.dashboard') }</div>
    )
}

```

The parameter passed to the `t` function is the translation key. The namespace is prefixed with a semi colon as
a separator. The dot is used for nesting within the json object.
