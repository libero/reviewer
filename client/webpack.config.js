/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebPackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const commonConfig = merge([
    {
        entry: './index.tsx',
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './index.html',
                filename: './index.html',
            }),
            new webpack.DefinePlugin({
                API_HOST: JSON.stringify(`${process.env.CLIENT_API_URL}:${process.env.CLIENT_PORT}`),
            })
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
    },
]);

const developmentConfig = merge([
    parts.devServer(),
    parts.loaders(),
]);

const productionConfig = merge([
    parts.clean(),
    parts.loaders(),
    parts.minifyCSS(),
    parts.minifyJS(),
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode })
    } else {
        return merge(commonConfig, developmentConfig, { mode })
    }
}


