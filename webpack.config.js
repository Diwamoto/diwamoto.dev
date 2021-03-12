const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TS_PATH = path.join(__dirname, './src/ts');
const PUG_PATH = path.join(__dirname, './src/pug');
const SCSS_PATH = path.join(__dirname, './src/scss');
const IMG_PATH = path.join(__dirname, "./src/img");

module.exports = {
    mode: 'production',
    entry: TS_PATH + '/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 3000,
        open: true
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    module: {
        rules: [{
                test: /.(jpe?g|png|gif|svg|ico)/,
                include: path.resolve(__dirname, 'src'),
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
                include: TS_PATH,
            },
            {
                test: /\.pug$/,
                include: PUG_PATH,
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
                test: /\.scss$/,
                include: SCSS_PATH,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                                fiber: require('fibers'),
                            },
                            sourceMap: true,
                        },
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        cacheWithContext: false,
        symlinks: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PUG_PATH + '/index.pug',
            filename: 'index.html',
            minify: 'false',
            favicon: IMG_PATH + '/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    performance: { hints: false }

}