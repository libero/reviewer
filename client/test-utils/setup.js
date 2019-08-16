// This script is ran before the tests begin.
require('@testing-library/jest-dom/extend-expect');
const jestDom = require('@testing-library/jest-dom');

expect.extend({...jestDom});

const consoleError = console.error;
 //Temp suppression of act wrapper error to be fixed in react-dom 16.9
jest.spyOn(console, 'error').mockImplementation((...args) => {
  if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
    consoleError(...args);
  }
});

