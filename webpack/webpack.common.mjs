import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import SvgSpritePlugin from '../spriteCreator/plugin.mjs';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@widgetComponents': path.resolve(__dirname, '../src/widgets'),
      '@pageComponents': path.resolve(__dirname, '../src/pages'),
      '@uiComponents': path.resolve(__dirname, '../src/shared/ui'),
      '@colors': path.resolve(__dirname, '../src/styles/_colors.scss'),
      '@typographyStyles': path.resolve(
        __dirname,
        '../src/styles/_typography.scss',
      ),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@svg': path.resolve(__dirname, '../src/assets/svg'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|woff2?|eot|ttf|otf|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new SvgSpritePlugin({
      inputDir: path.join(__dirname, '../src/assets/svg'),
      outputFile: path.join(__dirname, '../dist/sprite.svg')
    }),
  ],
};
