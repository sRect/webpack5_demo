const {merge} = require('webpack-merge');
const baseConf = require('./build/webpack.base');
const proConf= require('./build/webpack.pro');
const preConf = require('./build/webpack.pre');
const devConf = require('./build/webpack.dev');
const serveConf = require('./build/webpack.serve');

const isDev = process.env.NODE_ENV  === 'development' ? true : false;
const isPre = process.env.PRE_ENV === 'prev' ? true : false;
const isServe = process.env.SERVE_ENV === 'serve' ? true : false;

module.exports = env => {
  return isDev 
    ? merge(baseConf, isServe ? serveConf : devConf) 
    : merge(baseConf, isPre ? preConf : proConf);
}
