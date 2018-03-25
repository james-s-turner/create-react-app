'use strict';
// Assume third item in the loader with a oneOf parameter
// This is brittle - be careful during upgrades
// Returns an array
function getRuleForCSS(config) {
  return getOneOfRules(config)[2];
}

// Return array of rules
function getOneOfRules(config) {
  const oneOfRule = config.module.rules.find(rule => {
    if (rule.oneOf) {
      return rule.oneOf;
    }
  });
  return oneOfRule.oneOf;
}

// Returns PostCSS options map
function getPostCssLoaderOptions(config) {
  const cssRule = getRuleForCSS(config);
  const options = cssRule.use[2].options;
  return options;
}

function getLoadersForCSS(config) {
  const cssRule = getRuleForCSS(config);
  return cssRule.use;
}

module.exports.getRuleForCSS = getRuleForCSS;
module.exports.getPostCssLoaderOptions = getPostCssLoaderOptions;
module.exports.getLoadersForCSS = getLoadersForCSS;
module.exports.getOneOfRules = getOneOfRules;
