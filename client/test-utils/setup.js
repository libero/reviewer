// This script is ran before the tests begin.

//required to set global fetch for testing ApolloClient
require('whatwg-fetch');

// give us extra assertion options on jests expect
require('@testing-library/jest-dom/extend-expect');
const jestDom = require('@testing-library/jest-dom');
expect.extend({...jestDom});

// initialise i18n
require('../src/core/utils/i18n');

const consoleError = console.error;
/*
*  Temp suppression of act wrapper error to be fixed in react-dom 16.9
*  update: 16.9 did not fix this. Needs further investigating.
*/
jest.spyOn(console, 'error').mockImplementation((...args) => {
  if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
    consoleError(...args);
  }
});

