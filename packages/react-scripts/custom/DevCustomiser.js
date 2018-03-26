'use strict';
const utils = require('./utils');
const paths = require('../config/paths');
const path = require('path');

function customiser(/*options*/) {
  return function(webpackConfig) {
    addSASSLoader(webpackConfig);
    return webpackConfig;
  };
}

module.exports = customiser;

function addSASSLoader(config) {
  const loaders = utils.getLoadersForCSS(config);
  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      includePaths: [
        paths.appNodeModules,
        path.resolve(paths.appNodeModules, 'bootstrap-sass/assets/stylesheets'),
        path.resolve(paths.appSrc, 'theme/day'),
      ],
    },
  };
  loaders.push(sassLoader);

  const sccsRule = {
    test: /\.scss$/,
    use: loaders,
  };

  const rules = utils.getOneOfRules(config);
  // Rule must be injected before the file-loader in the config
  // See comment in webpack.comfig.dev.js
  rules.splice(3, 0, sccsRule);
}
