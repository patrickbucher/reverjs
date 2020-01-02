# reverjs

Implementation of a Reversi board in vanilla JavaScript.

## How to Use

Install `reverjs` package from [npm](https://www.npmjs.com/package/reverjs):

```bash
$ npm install reverjs --save reverjs
```

Create a new board with initial state:

```javascript
const board = new Board();
```

Get a list of allowed moves for a player:

```javascript
const playerOneValidMoves = board.validMoves(1);
const playerTwoValidMoves = board.validMoves(2);
```

Apply a move, which must be a valid move, i.e. part of the list returned by
`validMoves()`: 

```javascript
// set stone on the field at row 3 and column 2 for player 1
const newBoard = board.play(3, 2, 1);

// set stone on the field at row 5 and column 2 for player 2
const newBoard = board.play(5, 2, 2);
```

Since the board is implemented as an immutable class, a new board with all
changes applied will be returned. This is especially useful for applying
speculative moves, which makes implementing bots a lot easier.

Get the result to determine the outcome of the game:

```javascript
const result = board.result();
console.log(result);
```

Sample output:

    {
        playerOne: 48,
        playerTwo: 16,
        finished: true,
        tied: false,
        winner: 1,
    }
