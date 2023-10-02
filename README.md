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


#### Game review move details

<img width="1499" alt="image" src="https://github.com/samuraitruongau/chesssearch-app/assets/56257669/d6039eed-99a0-4d08-924f-fab73accf993">


## Data Structure
### Algoria
The main data source for the application is algoria, the data structure is flexiable but requires below attributes
```
Event
White
Black
Site
Date
Moves: array of San move
Pgn full PGN string
```

Below are an example:
```json

"id": "2014091",
                    "game": "D Hausrath vs Erik Janse",
                    "result": "1-0",
                    "moveCount": 40,
                    "year": 2017,
                    "event": "21st HZ Open",
                    "eco": "A05 Reti Opening",
                    "pgn": "[Event \"21st HZ Open\"]\n[Site \"Vlissingen NED\"]\n[Date \"2017.??.??\"]\n[EventDate \"?\"]\n[Round \"1.7\"]\n[Result \"1-0\"]\n[White \"Daniel Hausrath\"]\n[Black \"Erik Janse\"]\n[ECO \"A05\"]\n[WhiteElo \"2491\"]\n[BlackElo \"?\"]\n[PlyCount \"79\"]\n\n1.Nf3 Nf6 2.g3 g6 3.b3 Bg7 4.Bb2 c5 5.c4 d5 6.cxd5 Qxd5 7.Bg2 Nc6 8.Nc3 Qd6 9.Ne4 Qd5 10.Nfg5 Kf8 11.O-O Nxe4 12.Bxg7+ Kxg7 13.Nxe4 Bf5 14.d3 b6 15.Nxc5 Qxc5 16.Rc1 Qa3 17.Bxc6 Rac8 18.Qd2 Rc7 19.Bf3 Rhc8 20.Rc4 Rxc4 21.bxc4 Be6 22.Rb1 Rc5 23.Rb3 Qa4 24.h4 Ra5 25.Qb2+ f6 26.a3 h6 27.Rc3 Qd1+ 28.Kg2 g5 29.hxg5 hxg5 30.Qb4 Rc5 31.g4 Kf7 32.Qb2 Ra5 33.Rc1 Qa4 34.Rh1 Qxa3 35.Qb1 Qd6 36.Rh8 Qf4 37.e3 Qd6 38.Qh1 Qxd3 39.Qh5+ Kg7 40.Qh6+ 1-0",
                    "Event": "21st HZ Open",
                    "Site": "Vlissingen NED",
                    "Date": "2017.??.??",
                    "EventDate": "2017.??.??",
                    "Round": "1.7",
                    "Result": "1-0",
                    "White": "Daniel Hausrath",
                    "Black": "Erik Janse",
                    "ECO": "A05",
                    "WhiteElo": "2491",
                    "BlackElo": "?",
                    "PlyCount": "79",
                    "moves": [
                        "Nf3",
                        "Nf6",
                        "g3",
                        "g6",
                        "b3",
                        "Bg7",
                        "Bb2",
                        "c5",
                        "c4",
                        "d5",
                        "cxd5",
                        "Qxd5",
                        "Bg2",
                        "Nc6",
                        "Nc3",
                        "Qd6",
                        "Ne4",
                        "Qd5",
                        "Nfg5",
                        "Kf8",
                        "O-O",
                        "Nxe4",
                        "Bxg7+",
                        "Kxg7",
                        "Nxe4",
                        "Bf5",
                        "d3",
                        "b6",
                        "Nxc5",
                        "Qxc5",
                        "Rc1",
                        "Qa3",
                        "Bxc6",
                        "Rac8",
                        "Qd2",
                        "Rc7",
                        "Bf3",
                        "Rhc8",
                        "Rc4",
                        "Rxc4",
                        "bxc4",
                        "Be6",
                        "Rb1",
                        "Rc5",
                        "Rb3",
                        "Qa4",
                        "h4",
                        "Ra5",
                        "Qb2+",
                        "f6",
                        "a3",
                        "h6",
                        "Rc3",
                        "Qd1+",
                        "Kg2",
                        "g5",
                        "hxg5",
                        "hxg5",
                        "Qb4",
                        "Rc5",
                        "g4",
                        "Kf7",
                        "Qb2",
                        "Ra5",
                        "Rc1",
                        "Qa4",
                        "Rh1",
                        "Qxa3",
                        "Qb1",
                        "Qd6",
                        "Rh8",
                        "Qf4",
                        "e3",
                        "Qd6",
                        "Qh1",
                        "Qxd3",
                        "Qh5+",
                        "Kg7",
                        "Qh6+"
                    ],
                    "fen": "7R/p3p1k1/1p2bp1Q/r5p1/2P3P1/3qPB2/5PK1/8 b - - 3 40",
                    "Year": "2017",
                    "objectID": "2014091",
```


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
