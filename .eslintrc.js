module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'next'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/jsx-no-bind': 'off',
    'react/no-unescaped-entities': 'off',
    'no-use-before-define': 'off',
    'import/no-cycle': 'off',
    'react/require-default-props': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
