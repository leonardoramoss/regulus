const cssnano = require('cssnano');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

exports.webpackDeveloperPluginsClient = () => ({
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});

exports.webpackDefinePlugin = env => ({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(env) }
        })
    ]
});

exports.webpackDeveloperPluginsServer = () => ({
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});

exports.webpackBundleAnalyzer = () => ({
    plugins: [new BundleAnalyzerPlugin()]
});

exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                        ascii_only: true
                    },
                    compress: {
                        inline: false
                    }
                }
            })
        ]
    }
});

exports.splitChunks = ({ name }) => ({
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: /node_modules/,
                    name: name,
                    enforce: true
                }
            }
        }
    }
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});

exports.extractCSS = ({ path, name, isDevMode = false }) => ({
    plugins: [
        new ExtractCssChunks({
            filename: isDevMode
                ? `${path}/${name}.css`
                : `${path}/${name}.[hash:8].css`,
            chunkFilename: isDevMode
                ? `${path}/[id].css`
                : `${path}/[id].[hash:8].css`,
            hot: true
        })
    ]
});

exports.eslintLoader = () => ({
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    parser: 'babel-eslint',
                    failOnError: true
                }
            }
        ]
    }
});

exports.babelLoader = () => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9'
                                        ]
                                    }
                                }
                            ],
                            'stage-2',
                            'react'
                        ],
                        plugins: [
                            'react-loadable/babel',
                            'react-hot-loader/babel',
                            'syntax-dynamic-import',
                            'transform-runtime',
                            'transform-object-rest-spread',
                            [
                                'import-inspector',
                                {
                                    serverSideRequirePath: true,
                                    webpackRequireWeakId: true
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
});

exports.babelLoaderServer = () => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        node: true
                                    }
                                }
                            ],
                            'stage-2',
                            'react'
                        ],
                        plugins: [
                            'react-loadable/babel',
                            'react-hot-loader/babel',
                            'syntax-dynamic-import',
                            'transform-runtime',
                            'transform-object-rest-spread',
                            [
                                'import-inspector',
                                {
                                    serverSideRequirePath: true,
                                    webpackRequireWeakId: true
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
});

exports.cssHotReload = () => ({
    module: {
        rules: [
            {
                test: /\.(s(c|a)ss)$/,
                use: [
                    {
                        loader: 'css-hot-loader'
                    }
                ]
            }
        ]
    }
});

exports.cssStylusLoaderClient = () => ({
    module: {
        rules: [
            {
                test: /\.(s(c|a)ss)$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9'
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
});

exports.cssStyleLoaderClient = () => ({
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9'
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }
});

exports.cssStylusLoaderServer = () => ({
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
});

exports.cssStyleLoaderServer = () => ({
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    }
                ]
            }
        ]
    }
});

exports.compressionPlugin = () => ({
    plugins: [
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ]
});

exports.cleanPlugin = ({ path }) => ({
    plugins: [
        new cleanWebpackPlugin([`${path}/*`], {
            watch: true,
            allowExternal: true
        })
    ]
});

exports.reactLoadablePlugin = ({ path, filename }) => ({
    plugins: [
        new ReactLoadablePlugin({
            filename: `${path}/${filename}`
        })
    ]
});
