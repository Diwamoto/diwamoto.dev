const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TS_PATH = path.join(__dirname, './src/ts');
const PUG_PATH = path.join(__dirname, './src/pug');
const IMG_PATH = path.join(__dirname, "./src/img");

module.exports = {
    entry: TS_PATH + '/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [{
                test: /.(jpe?g|png|gif|svg|ico)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        limit: 1,
                    },
                }, ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_module/
            },
            {
                test: /\.pug$/,
                use: [{
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PUG_PATH + '/index.pug',
            filename: 'index.html',
            minify: 'false',
            favicon: IMG_PATH + '/favicon.ico',
        }),
        new CleanWebpackPlugin(),
    ]
}