const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TS_PATH = path.join(__dirname, './src/ts');
const PUG_PATH = path.join(__dirname, './src/pug');
const SCSS_PATH = path.join(__dirname, './src/scss');
const IMG_PATH = path.join(__dirname, "./src/img");

module.exports = {
    externals: {
        "jquery": '$',
        'smtp': 'Email',
    },
    mode: 'production',
    entry: TS_PATH + '/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: "img/[name][ext]",
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
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
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
                            pretty: false,
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
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                                fiber: require('fibers'),
                            },
                        },
                    },
                ]
            },
        ]
    },
    resolve: {
        modules: ["node_modules"],
        alias: {
            '@': path.join(__dirname, './src'),
        },
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'SLACK_URL': JSON.stringify(process.env.SLACK_URL),
        })
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
          new TerserPlugin(),
          new OptimizeCSSAssetsPlugin()
        ]
      }

}