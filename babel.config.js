module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'components/*': './src/components/*',
          'store/*': './src/store/*',
          'globals/*': './src/globals/*',
          'navigation/*': './src/navigation/*',
          'screens/*': './src/screens/*',
          'assets/*': './src/assets/*',
        },
      },
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
};
