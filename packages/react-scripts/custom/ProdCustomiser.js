'use strict';
const Visualizer = require('webpack-visualizer-plugin');
//const postCssClean = require('postcss-clean');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const utils = require('./utils');
const paths = require('../config/paths');
const path = require('path');

function customiser(options) {
  if (!options.shouldUseSourceMap) {
    throw new Error('Expect shouldUseSourceMap');
  }
  return function(webpackConfig) {
    addWebpackVisualiser(webpackConfig);
    //addPostCssPlugins(webpackConfig, options);
    return webpackConfig;
  };
}

// creates file stats.html in output drectory visualising js files size constituents
function addWebpackVisualiser(config) {
  config.plugins.push(new Visualizer());
}

// creates file stats.html in output drectory visualising js files size constituents
// function addPostCssPlugins(config, options){
//     const getCssRulesConfig = utils.getCssRulesConfig(config);
//     const customLoaderConfig = getCustomCSSLoaders(options);
//
//     // mutate the provided config object
//     getCssRulesConfig.loader = ExtractTextPlugin.extract(
//         Object.assign(customLoaderConfig)
//     );
// }

// css-loader uses cssnano  to minify
// We can turn minimize off and use postCssClean instead to test for best results.
// function getCustomCSSLoaders(options) {
//     const {shouldUseSourceMap} = options;
//     return{
//         fallback: {
//             loader: require.resolve('style-loader'),
//             options: {
//                 hmr: false,
//             },
//         },
//         use: [
//             {
//                 loader: require.resolve('css-loader'),
//                 options: {
//                     importLoaders: 1,
//                     minimize: false,                                                        // CHANGED
//                     sourceMap: shouldUseSourceMap,
//                     modules: true,                                                          // ADDED
//                     localIdentName: '[path][name]__[local]--[hash:base64:5]'                // ADDED
//                 },
//             },
//             {
//                 loader: require.resolve('postcss-loader'),
//                 options: {
//                     // Necessary for external CSS imports to work
//                     // https://github.com/facebookincubator/create-react-app/issues/2677
//                     ident: 'postcss',
//                     plugins: () => [
//                         require('postcss-flexbugs-fixes'),
//                         autoprefixer({
//                             browsers: [
//                                 '>1%',
//                                 'last 4 versions',
//                                 'Firefox ESR',
//                                 'not ie < 9', // React doesn't support IE8 anyway
//                             ],
//                             flexbox: 'no-2009',
//                         })
//                         //,postCssClean()                                                     // ADDED
//                     ],
//                 },
//             },
//             {
//                 loader: "sass-loader",
//                 options: {includePaths: [
//                         paths.appNodeModules,
//                         path.resolve(paths.appNodeModules, "bootstrap-sass/assets/stylesheets")
//                         //path.resolve(__home, "src/style")
//                     ]}
//             }
//         ],
//     };
// }

module.exports = customiser;
