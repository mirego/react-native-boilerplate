module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  rules: {
    'import/order': 2,
    'unused-imports/no-unused-imports-ts': 2,
    'react-native/no-inline-styles': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unstable-nested-components': 0,
    '@typescript-eslint/no-shadow': 0,
    curly: 0,
    'comma-dangle': 0,
  },
};
