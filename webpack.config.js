const {merge} = require('webpack-merge');
const baseConf = require('./build/webpack.base');
const proConf= require('./build/webpack.pro');
const preConf = require('./build/webpack.pre');
const devConf = require('./build/webpack.dev');
const serveConf = require('./build/webpack.serve');

module.exports = env => {
  return env.production 
    ? merge(baseConf, env.pre ? preConf : proConf) 
    : merge(baseConf, env.serve ? serveConf : devConf);
}
