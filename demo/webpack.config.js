const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

module.exports = {
    watch: NODE_ENV == 'development',
    entry: ['./index.es6'],
    output: {
        filename: './build/app.js'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['last 4 version']
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                        }
                    }
                ]
            }

        ]
    },

    devtool: NODE_ENV == 'development' ? "source-map" : false,

    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]
};