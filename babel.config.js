'use strict';

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['react-hot-loader/babel',     [
    "babel-plugin-styled-components",
    {
      "displayName": true
    }
  ]],
};
