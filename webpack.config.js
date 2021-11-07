const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },

  devtool: 'inline-source-map',

  devServer: {
    port: 3000,
    static: './dist',
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    })
  ]
}


