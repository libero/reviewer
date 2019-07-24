// This script is ran before the tests begin.
require('@testing-library/jest-dom/extend-expect');
const { toBeInTheDocument } = require('@testing-library/jest-dom');

expect.extend({toBeInTheDocument})