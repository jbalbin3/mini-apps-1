const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.m?css?$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}