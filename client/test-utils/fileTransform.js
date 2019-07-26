// Used to transform asset imports, required when runing tests: https://jestjs.io/docs/en/webpack#mocking-css-modules
const path = require('path');

module.exports = {
    process(src, filename, config, options) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    },
};
