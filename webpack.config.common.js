const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const exportDir = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/index.js',
  plugins: [
    //to clean dist folder
    new CleanWebpackPlugin(),
    //to inject built javascript into html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        // Copy Shoelace assets to dist/shoelace
        {
          from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          to: path.resolve(exportDir, 'shoelace/assets')
        },
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(exportDir, 'assets')
        },
      ]
    }),
    //new BundleAnalyzerPlugin()
  ],
  module: {
    //loaders for loading different file types
    rules: [
      {
        //babel-loader to convert js or jsx to compatible js. It should not touch node_modules folder
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  },
}
