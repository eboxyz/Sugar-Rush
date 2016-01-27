var _ = require('lodash');

var localEnvVars = {
  TITLE:      'sample',
  SAFE_TITLE: 'sample'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
