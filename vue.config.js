// vue.config.js

console.log('NODE_ENV set to: ', process.env.NODE_ENV);

let url = '/tournaments/';
if (process.env.VUE_APP_BASE_URL) {
  url = process.env.VUE_APP_BASE_URL;
}

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  }, // end configuring webpack

  publicPath: process.env.NODE_ENV === 'production' ? url : '/',
};

console.log('publicPath set to: ', module.exports.publicPath);
console.log(
  '  NOTE: you can configure publicPath by setting the ENV var VUE_APP_BASE_URL'
);
