const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const { argv } = require('yargs');
const isDevelopment = argv.development;
const isProduction = argv.production;

let entryFile = {
  bundle: path.resolve(__dirname, './src/index.js')
};

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'eval',
  entry: entryFile,
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader()
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /\node_modules/,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: { sourceMap: true }
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
              sourceMap: true
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: './images',
              useRelativePath: true
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
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
    new webpack.BannerPlugin('Copyrite "Alexsandrrh"'),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/assets/index.html',
      minify: isProduction
        ? {
            html5: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: false,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributese: true,
            useShortDoctype: true
          }
        : {}
    }),
    new SvgSpriteHtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main-[hash].css',
      chunkFilename: '[id]-[hash].css'
    })
  ],
  optimization: isProduction
    ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            sourceMap: false,
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin()
        ]
      }
    : {},
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: isProduction ? 80 : 3000
  }
};
