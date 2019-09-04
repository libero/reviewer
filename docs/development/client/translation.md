# Translation

Reviewer uses the react-i18n package for translation (https://react.i18next.com/).

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

The react-i18n package provides react hooks for functional components. First import the `useTranslation`:

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
