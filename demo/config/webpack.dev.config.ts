import { resolve } from 'path'
import { Configuration } from 'webpack'
import { Configuration as DevServerConfigure } from 'webpack-dev-server'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import baseConfig from './webpack.base.config'
import { CLIENT_ROOT } from './constants'

interface DevConfigure extends Configuration {
  devServer: DevServerConfigure
}

export default (env: Record<string, any>): DevConfigure => {
  const devConfig = {
    mode: 'development' as DevConfigure['mode'],
    entry: {
      index: resolve(CLIENT_ROOT, 'index.tsx'),
    },
    output: {
      publicPath: '',
      path: resolve(__dirname, '../public'),
      filename: '[name].js',
      chunkFilename: 'chunk.[name].js',
    },

    devtool: 'inline-source-map',

    plugins: [
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'slate demo',
        template: resolve(CLIENT_ROOT, 'index.ejs'),
        filename: 'index.html',
        templateParameters: {
          __DEV__: true,
        },
      }),
    ].filter(Boolean) as (
      | ReactRefreshWebpackPlugin
      | HtmlWebpackPlugin
      | CopyWebpackPlugin
    )[],

    devServer: {
      port: Number(env.port || 9090),
      hot: true,
      allowedHosts: 'all',
      client: {
        overlay: true,
      },
      historyApiFallback: {
        rewrites: [{ from: /^\/interact\//, to: '/interact/index.html' }],
      },
      // writeToDisk: true,
    },
  }

  return merge<DevConfigure>(baseConfig(env) as DevConfigure, devConfig)
}
