import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SvgSpritePlugin from '../spriteCreator/plugin.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },

  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
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
      '@databases': path.resolve(__dirname, '../public/db'),
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'assets/images/[name][hash][ext]',
        },
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
      outputFile: path.join(__dirname, '../dist/sprite.svg'),
    }),
  ],
}
