import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '../src/core/utils/i18n';
import theme from './theme';
import { SuspenseDecorator } from './decorators'

addDecorator(SuspenseDecorator);
addDecorator(withA11y);

addParameters({
  options: {
    theme: theme
  }
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
