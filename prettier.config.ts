import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    printWidth: 80,
    arrowParens: "always",
    endOfLine: "lf",
    useTabs: false,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    quoteProps: "as-needed",
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    embeddedLanguageFormatting: "auto",
};

export default config;