const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

/**
 * Some of this code is copied from https://github.com/victorrodrigues/html-webpack-new-relic-plugin#readme
 * The reason we are not using it is that the newrelic script it uses is not the newrelic SPA one
 */
module.exports = class HtmlInjectNewRelicPlugin {
    constructor (options) {
        this.options = Object.assign(
            {
              applicationID: undefined,
              license: undefined,
            },
            options,
        );
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlInjectNewRelicPlugin', (compilation) => {
            const newrelic = `<script type="text/javascript">`
            // we use a separate file for the script as if we have it inside a string literal, the escaping of slashes in
            // the code gets stripped out
            + fs.readFileSync(
                path.resolve(__dirname, './newrelic.js'),
                { encoding: 'utf-8' },
                (err, data) => {
                    return data.toString();
                },
            )
            + `;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"${this.options.license}",applicationID:"${this.options.applicationID}",sa:1}`
            + `</script>`

            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
                'HtmlInjectNewRelicPlugin',
                (data) => {
                    const $ = cheerio.load(data.html);
                    $('head').prepend(newrelic);
                    Object.assign(data, {
                        html: $.html()
                    });
                },
            );
        });
    }
}
