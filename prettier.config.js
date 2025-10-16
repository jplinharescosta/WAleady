/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'lf',
  useTabs: false,
  bracketSpacing: true,
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto'
};

module.exports = config;
