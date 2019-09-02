// This script is ran before the tests begin.

//required to set global fetch for testing ApolloClient 
require('whatwg-fetch');

// give us extra assertion options on jests expect
require('@testing-library/jest-dom/extend-expect');
const jestDom = require('@testing-library/jest-dom');
expect.extend({...jestDom});