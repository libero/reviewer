/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
    entry: './index.tsx',
    devServer: {
        stats: 'errors-only',
        host: process.env.HOST,
        historyApiFallback: true,
        port: process.env.PORT,
        open: true,
        overlay: true,
        hot: true,
        proxy: {
            [process.env.API_PROXY_ENDPOINT]: {
                target: process.env.API_PROXY_HOST,
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { loader: 'file-loader' },
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                    }
                }
                ]
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            API_HOST: JSON.stringify(process.env.API_HOST),
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
    ],
};
