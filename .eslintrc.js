const { strictEslint } = require('@umijs/fabric');
const path = require('path');

const finalEslint = {
  ...strictEslint,
  extends: [
    "plugin:mdx/recommended", ...strictEslint.extends,
    "plugin:prettier/recommended"
  ],
  rules: {
    ...strictEslint.rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/label-has-for': 1,
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": "all"
      }
    ],
  },
  settings: {
    ...strictEslint.settings,
    'import/resolver': {
      alias: {
        map: [['@', path.join(__dirname) + '/src'], ['stories', path.join(__dirname) + '/stories']],
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
      },
    },
  },
  plugins: [
    ...strictEslint.plugins,
    "prettier"
  ]
};

module.exports = {
  ...finalEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    APP_TYPE: true,
    page: true,
  },
};
