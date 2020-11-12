module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          // bridge: './src/bridge',
          components: './src/components',
          // locale: './src/locale',
          // navigation: './src/navigation',
          // screens: './src/screens',
          // services: './src/services',
          // shared: './src/shared',
          // testMode: './src/testMode',
          // utils: './src/utils',
        },
      },
    ],
  ],
};