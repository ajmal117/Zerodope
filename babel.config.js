module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // Deprecated in favor of 'blocklist'
        whitelist: null, // Deprecated in favor of 'allowlist'
        safe: false,
        allowUndefined: true,
        verbose: false
      }]
    ]
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
