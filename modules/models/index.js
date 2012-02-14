//My models
var Models = {};

var Backbone = require('./main');
require('./casos')(Backbone, Models);
require('./residencial-causal')(Backbone, Models);

module.exports = Models;