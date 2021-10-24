const alias = require('./importAliases');

const presets = ['module:metro-react-native-babel-preset'];

const plugins = [
  'optional-require',
  [
    'module-resolver',
    {
      root: ['./src'],
      alias
    }
  ]
];

if (process.env.NODE_ENV === 'production')
  plugins.push('transform-remove-console');

module.exports = {
  presets,
  plugins
};
