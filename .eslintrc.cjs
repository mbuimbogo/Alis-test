require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:vue/vue3-recommended',
    'plugin:vuetify/base',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    'no-duplicate-imports': 'warn',
    'no-empty': 'error', // Disallows empty block statements. This rule ignores block statements which contain a comment
    'no-unused-vars': 'warn', // Warn if there are any variables that have not been used.
    'no-var': 'error', //This rule is aimed at discouraging the use of var and encouraging the use of const or let instead.
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'require-await': 'warn',
    // Vue
    'vue/block-order': 'error',
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.d.ts',
      rules: {
        'import/no-duplicates': 'off',
      },
    },
  ],
};
