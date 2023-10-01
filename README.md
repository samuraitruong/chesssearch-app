# Introduction

In this ambitious endeavor, our goal is to craft a cutting-edge chess game viewer that immerses users in the rich tapestry of chess history. With a harmonious blend of sleek modern design and state-of-the-art technologies, we aim to offer an unparalleled user experience. Our vision is to transform this platform into an engaging and enlightening educational tool, seamlessly weaving the intricate threads of the chess world into the fabric of our website.


## Get started

```sh

pnpm install
pnpm run link-lib (if change stockfish version)
pnpm run dev

```

_You can replace by yarn or npm if prefer._

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


Ref:
https://github.com/davidfstein/anaLIsys/blob/main/src/utils/Evaluation.js
