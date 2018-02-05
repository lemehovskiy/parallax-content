module.exports = {
    watch: true,
    entry: './src/parallax_content.es6',
    output: {
        filename: 'build/parallax_content.js'
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
            }
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};