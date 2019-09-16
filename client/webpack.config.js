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
        plugins: [
            new HtmlWebPackPlugin({
                template: 'index.html',
                filename: 'index.html',
            }),
            new webpack.DefinePlugin({
                API_HOST: JSON.stringify(`${process.env.CLIENT_API_URL}:${process.env.CLIENT_PORT}`),
                LOGIN_URL: JSON.stringify(`${process.env.CONTINUUM_LOGIN_URL}:${process.env.CONTINUUM_LOGIN_PORT}/submit`),
            })
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
    },
]);

const developmentConfig = merge([
    parts.output({ filename: 'bundle.js' }),
    parts.devServer(),
    parts.loaders(),
    parts.copyFiles(),
    parts.generateSourceMaps({ type: 'eval' })
]);

const productionConfig = merge([
    parts.output({ filename: '[name].[contenthash].js' }),
    parts.clean(),
    parts.loaders(),
    parts.minifyCSS(),
    parts.minifyJS(),
    parts.splitBundles(),
    parts.copyFiles(),
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.newRelic(),
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode })
    } else {
        return merge(commonConfig, developmentConfig, { mode })
    }
}


