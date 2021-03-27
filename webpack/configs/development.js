const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPartialsPlagin = require('html-webpack-partials-plugin');
// const path = require('path');
const paths = require('../utils/paths');

module.exports = env => ({
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPartialsPlagin({
    //   path: path.join(__dirname, '../../src/partials/header.html'),
    //   location: 'header',
    //   template_filename: ['index.html'],
    // }),
    // new HtmlWebpackPartialsPlagin({
    //   path: path.join(__dirname, '../../src/partials/footer.html'),
    //   location: 'footer',
    //   template_filename: ['index.html'],
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    contentBase: paths.BUILD_DIR,
    publicPath: '',
    historyApiFallback: true,
    compress: true,
    port: 4040,
    noInfo: true,
    quiet: true,
    clientLogLevel: 'warning',
    stats: 'errors-only',
    open: true,
  },
});
