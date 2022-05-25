module.exports = api => {
  const isDev = api.env(['development'])

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          },
          modules: false, // use webpack trans es6 module with tree-shaking
          forceAllTransforms: !isDev, // for UglifyJS
          useBuiltIns: false,
          debug: false,
        },
      ],
      '@babel/preset-typescript',
      ['@babel/preset-react', { development: isDev }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { corejs: 3 }],
      // 热加载
      isDev && 'react-refresh/babel',
    ].filter(Boolean),
  }
}
