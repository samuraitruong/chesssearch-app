# Introduction

In this ambitious endeavor, our goal is to craft a cutting-edge chess game viewer that immerses users in the rich tapestry of chess history. With a harmonious blend of sleek modern design and state-of-the-art technologies, we aim to offer an unparalleled user experience. Our vision is to transform this platform into an engaging and enlightening educational tool, seamlessly weaving the intricate threads of the chess world into the fabric of our website.


## Get started

```sh

pnpm install
pnpm run link-lib (if change stockfish version)
pnpm run dev

```

_You can replace by yarn or npm if prefer._


## Design
### Home screen

<img width="1501" alt="image" src="https://github.com/samuraitruong/chesssearch-app/assets/1183138/052479c8-c0b6-45f5-ab34-346ef09303bc">

### Game Viewer(PGN Viewer)

<img width="1505" alt="image" src="https://github.com/samuraitruong/chesssearch-app/assets/1183138/0a002db3-eb6f-4116-8ada-ff91834e5bcb">


### Game Review

<img width="1505" alt="image" src="https://github.com/samuraitruong/chesssearch-app/assets/1183138/40ebd0d3-b31a-4b2e-8185-41d8cd4da6c9">

<img width="1506" alt="image" src="https://github.com/samuraitruong/chesssearch-app/assets/1183138/8216591f-be43-4cb2-b761-585032e18b12">



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
