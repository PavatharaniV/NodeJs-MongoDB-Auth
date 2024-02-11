module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','@babel/preset-env','@babel/preset-react', 'module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
    plugins:['react-native-reanimated/plugin']
  };
};
