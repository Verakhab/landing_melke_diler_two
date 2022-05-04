require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src/styles'),
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cssoMinify,
          CssMinimizerPlugin.cleanCssMinify,
          CssMinimizerPlugin.esbuildMinify,
          CssMinimizerPlugin.parcelCssMinify
        ],
      }),
      isDev ? new ImageMinimizerPlugin({
        include: path.resolve(__dirname, './src/images'),
        minimizer: {
          filename: "[name][ext]",
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo"],
            ],
          },
        },
      }) : new ImageMinimizerPlugin({
        include: path.resolve(__dirname, './src/images'),
        minimizer: {
          filename: "[name][ext]",
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 10 }],
              ["svgo"],
            ],
          },
        },
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [ isDev ?
          { loader: 'style-loader' } :
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev ? true : false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev ? true : false
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src/images'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src/vendor/fonts'),
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      scriptLoading: 'module',
      favicon: './src/images/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ]
}