const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const manifest = require('./manifest');

// Configs
const dev = require('./webpack/webpack.development');
const prod = require('./webpack/webpack.production');

const { NODE_ENV } = process.env;

const config = {
  mode: NODE_ENV,
  entry: {
    bundle: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/[name].[hash].js',
    chunkFilename: 'assets/js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss', '.css', '.json']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.BannerPlugin(`Copyright | ${manifest.name}`),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')]),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(NODE_ENV === 'development'),
      IS_PROD: JSON.stringify(NODE_ENV === 'production')
    }),
    new ManifestPlugin({
      seed: manifest
    })
  ],
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

if (NODE_ENV === 'production') {
  module.exports = merge(config, prod);
} else if (NODE_ENV === 'development') {
  module.exports = merge(config, dev);
}
