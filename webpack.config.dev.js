const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const path = require('path');

const FRONT_PORT = process.env.FRONT_PORT || 8085;
const API_URL = process.env.API_URL || 'https://localhost:8401';

const exportDir = path.resolve(__dirname, './dist');

console.log('exportDir', exportDir);

module.exports = merge.merge(commonConfig, {
  //mode is development
  mode: 'development',
  //to have source map inside javascript files
  devtool: 'inline-source-map',
  output: {
    //as the files can be cached by browser, so use content hash to generate new file name on its content changes
    filename: '[name].[contenthash].js',
    path: exportDir,
    clean: false,
    publicPath: '/'
  },
  devServer: {
    //so that dist folder is served on development server
    //contentBase: './dist',
    client: {
      logging: 'verbose',
    },
    allowedHosts: 'all',
    server:'https',
    liveReload: true,
    devMiddleware: {
      writeToDisk: true,
    },
    // SPA setup
    historyApiFallback:{
      index : 'index.html',
      rewrites: [
        { from: /^\//, to: '/index.html' }
      ]
    },
    // compress true (gzip) will break SSE with webpack
    compress:false, 
    port:FRONT_PORT,
    static: [
      {
        publicPath: '/demo',
        directory: exportDir,
        serveIndex: true
      }
    ],
    //historyApiFallback: true,
    proxy: [
      {
        context:['/api'],
        target:API_URL,
        xfwd: true,
        secure:false, // ignore self signed certificat error for development
        onProxyReq: (proxyReq, req, res) => {
          res.on('close', () => proxyReq.destroy() )
        },
      }
    ],
  },
  module: {
    rules: [
      {
        //sass loader to convert to css then css loader to load css file and style loader to append that css to style tag
        test: /\.(scss|css)$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
    ]
  }
})