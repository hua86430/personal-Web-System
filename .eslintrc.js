module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      jsx: true,
      globalReturn: false
    }
  },
  plugins: ['vue'],
  rules: {
    'block-scoped-var': ['error'],
    'callback-return': ['error', ['done', 'proceed', 'next', 'onwards', 'callback', 'cb']],
    'comma-style': ['warn', 'last'],
    curly: ['warn'],
    eqeqeq: ['error', 'always'],
    'eol-last': ['warn'],
    'handle-callback-err': ['error'],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 'off',
        FunctionDeclaration: { body: 1, parameters: 'off' },
        FunctionExpression: { body: 1, parameters: 'off' },
        CallExpression: { arguments: 'off' },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ignoredNodes: ['ConditionalExpression']
      }
    ],
    'linebreak-style': [0, 'windows'],
    'comma-dangle': 0,
    camelcase: 0,
    'arrow-parens': 0,
    'no-mixed-operators': 0,
    'vue/no-v-model-argument': 'off',
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'implicit-arrow-linebreak': 0,
    'no-dupe-keys': ['off'],
    'import/prefer-default-export': 0,
    'no-duplicate-case': ['error'],
    'vue/multi-word-component-names': 0,
    'no-console': 0,
    'default-case': 0,
    'no-extra-semi': ['warn'],
    'no-trailing-spaces': 0,
    'consistent-return': 0,
    'no-case-declarations': 0,
    'no-labels': ['error'],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-redeclare': ['warn'],
    'no-return-assign': ['error', 'always'],
    'no-sequences': ['error'],
    'no-trailing-spaces': ['warn'],
    'no-undef': ['off'],
    'vue/no-multiple-template-root': 0,
    'max-len': 0,
    'no-const-assign': 0,
    'no-plusplus': 0,
    'no-param-reassign': [
      'off',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ],
    // eqeqeq: 0,
    'no-tabs': 0,
    'operator-linebreak': 0,
    'no-unexpected-multiline': ['warn'],
    'no-unreachable': ['warn'],
    'no-unused-vars': [
      'warn',
      {
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^unused($|[A-Z].*$)',
        argsIgnorePattern: '^unused($|[A-Z].*$)',
        varsIgnorePattern: '^unused($|[A-Z].*$)'
      }
    ],
    'no-use-before-define': ['error', { functions: false }],
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],
    quotes: ['warn', 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    semi: ['warn', 'always'],
    'semi-spacing': ['warn', { before: false, after: true }],
    'semi-style': ['warn', 'last']
  },

  globals: {
    defineProps: 'readonly',
    ref: true,
    reactive: true,
    computed: true,
    onMounted: true,
    watch: true,
    watchEffect: true,
    Modal: true,
    toast: true,
    route: true,
    router: true,
    domain: true,
    axios: true,
    this: true,
    _: true
  }
};
