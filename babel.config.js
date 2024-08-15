// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     env: {
//       production: {
//         plugins: ['react-native-paper/babel'],
//       },
//     },
//   };
// };

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
  ],
};
