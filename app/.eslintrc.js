module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    curly: [2, 'all'],
    eqeqeq: ['error'],
    //'react/prop-types': ['warn'], //we have typescript, shouldn't need this
    'react/display-name': ['warn'],
    'no-duplicate-imports': ['error'],
    'sort-imports': ['warn'],
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['**/@streamlinehq/**/*.js', 'cypress', 'webpack'],
};
