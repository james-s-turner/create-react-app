'use strict';
const Visualizer = require('webpack-visualizer-plugin');
//const postCssClean = require('postcss-clean');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const utils = require('./utils');
const paths = require('../config/paths');
const path = require('path');

function customiser(options) {
  // if (!options.shouldUseSourceMap) {
  //   throw new Error('Expect shouldUseSourceMap');
  // }
  return function(webpackConfig) {
    addWebpackVisualiser(webpackConfig);
    addSASSLoader(webpackConfig);
    return webpackConfig;
  };
}

// creates file stats.html in output drectory visualising js files size constituents
function addWebpackVisualiser(config) {
  config.plugins.push(new Visualizer());
}

function addSASSLoader(config) {
  const sccsRule = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      Object.assign({
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: loadersForSCCS,
      })
    ),
  };

  const rules = utils.getOneOfRules(config);
  // Rule must be injected before the file-loader in the config
  // See comment in webpack.comfig.dev.js
  rules.splice(3, 0, sccsRule);
}

function getPublicPathOptions() {
  const publicPath = paths.servedPath;
  const shouldUseRelativeAssetPaths = publicPath === './';
  const cssFilename = 'static/css/[name].[contenthash:8].css';
  const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
      { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {};
  return extractTextPluginOptions;
}

const loadersForSCCS = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      // minimize: false,                                             // CHANGED - handy for debugging
      //sourceMap: shouldUseSourceMap,
      sourceMap: false,
      // modules: true,                                               // ADDED for CSS-MODULES
      // localIdentName: '[path][name]__[local]--[hash:base64:5]'     // ADDED for CSS-MODULES
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      // Necessary for external CSS imports to work
      // https://github.com/facebookincubator/create-react-app/issues/2677
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
        //,postCssClean()                                                     // ADDED
      ],
    },
  },
  {
    loader: require.resolve('sass-loader'),
    options: {
      includePaths: [
        paths.appNodeModules,
        path.resolve(paths.appNodeModules, 'bootstrap-sass/assets/stylesheets'),
        path.resolve(paths.appSrc, 'theme/default'),
      ],
    },
  },
];

module.exports = customiser;
