// This script is ran before the tests begin.
require('@testing-library/jest-dom/extend-expect');
const jestDom = require('@testing-library/jest-dom');

expect.extend({ ...jestDom });
