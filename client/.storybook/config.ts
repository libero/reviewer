import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import I18n from '../src/core/utils/i18n';
import theme from './theme';
import { SuspenseDecorator } from './decorators';
import i18n from './i18n';

i18n();
addDecorator(SuspenseDecorator);
addDecorator(withA11y);

addParameters({
    options: {
        theme: theme,
    },
});

I18n({
    debug: false,
    fallbackLng: false,
    react: {
        useSuspense: false,
    },
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
