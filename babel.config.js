module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          navigators: './src/navigators',
          screens: './src/screens',
        },
      },
    ],
  ],
};
