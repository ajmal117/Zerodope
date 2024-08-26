module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          "react-native-paper/babel",
          [
            "module:react-native-dotenv",
            {
              envName: "APP_ENV",
              moduleName: "@env",
              path: ".env",
            },
          ],
        ],
      },
    },
  };
};

// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: [
//     [
//       "module:react-native-dotenv",
//       {
//         envName: "APP_ENV",
//         moduleName: "@env",
//         path: ".env",
//       },
//     ],
//   ],
// };
