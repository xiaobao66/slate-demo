import { resolve } from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackBar from 'webpackbar'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CLIENT_ROOT, ROOT } from './constants'

export default (env: Record<string, any>): Configuration => {
  const isDev = env.mode === 'development'
  const isHot = !!env.hot

  const styleLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
    },
  }

  const cssLoaderWithModule = {
    loader: 'css-loader', // translates CSS into CommonJS
    options: {
      ...cssLoader.options,
      modules: {
        compileType: 'module',
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
        exportLocalsConvention: 'camelCaseOnly',
      },
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-custom-media',
          'postcss-color-function',
          ['autoprefixer', { flexbox: 'no-2009' }],
        ],
      },
      sourceMap: true,
    },
  }

  const lessLoader = {
    loader: 'less-loader', // compiles less to CSS
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  }

  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: ['node_modules'],
      alias: {
        '@': resolve(__dirname, '../src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: isDev,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [styleLoader, cssLoader],
        },
        {
          test: /\.less$/,
          rules: [
            {
              use: [styleLoader],
            },
            {
              oneOf: [
                {
                  exclude: /\.global\./,
                  use: [
                    '@teamsupercell/typings-for-css-modules-loader',
                    cssLoaderWithModule,
                  ],
                },
                {
                  use: [cssLoader],
                },
              ],
            },
            {
              use: [postcssLoader, lessLoader],
            },
          ],
        },
        {
          test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
        {
          test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    },
    plugins: [
      new WebpackBar({}),
      new DefinePlugin({
        __DEV__: isDev,
      }),
      new MiniCssExtractPlugin({
        // 配合module中loader使用，生产环境才需要hash
        filename: isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
      }),
      env.copyPublic &&
        new CopyWebpackPlugin({
          patterns: [
            {
              from: resolve(CLIENT_ROOT, 'public'),
              to: 'public', // 相对于output
            },
          ],
        }),
      env.manifest && new WebpackManifestPlugin(),
    ].filter(Boolean),
  }
}
