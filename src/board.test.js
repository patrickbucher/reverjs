'use strict';

const Board = require('./board.js');

const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

const boardAfterTwoMoves = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 1, 1, 2, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

it('create initial board', () => {
    const board = new Board();
    expect(board.fields).toEqual(initialBoard);
});

it('create board with wrong number of rows', () => {
    const fields = [
        // too few rows
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const exception = new RangeError(`fields requires 8 rows`);
    expect(() => {
        Board.of(fields)
    }).toThrow(exception);
});

it('create board with wrong number of columns', () => {
    const fields = [
        // too few cols
        [0], [0], [0], [0], [0], [0], [0], [0],
    ];
    const exception = new RangeError(`row requires 8 cols`);
    expect(() => {
        Board.of(fields)
    }).toThrow(exception);
});

it('create board with illegal field values', () => {
    const fields = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const exception = new RangeError(`illegal value 3 ([6/5])`)
    expect(() => {
        Board.of(fields)
    }).toThrow(exception);
});

it('find player one fields on initial board', () => {
    const board = new Board();
    expect(board.fieldsWithState(1)).toEqual([[3, 4], [4, 3]]);
});

it('find player two fields on initial board', () => {
    const board = new Board();
    expect(board.fieldsWithState(2)).toEqual([[3, 3], [4, 4]]);
});

it('find initial valid moves for player one', () => {
    const board = new Board();
    expect(board.validMoves(1)).toEqual(new Set([[2, 3], [3, 2], [5, 4], [4, 5]]));
});

it('find initial valid moves for player two', () => {
    const board = new Board();
    expect(board.validMoves(2)).toEqual(new Set([[2, 4], [3, 5], [4, 2], [5, 3]]));
});

it('find valid moves after two moves for player one', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.validMoves(1)).toEqual(new Set([[1, 5], [2, 5], [3, 5], [4, 5], [5, 5]]));
});

it('find valid moves after two moves for player two', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.validMoves(2)).toEqual(new Set([[2, 2], [3, 1], [4, 2], [5, 2]]));
});

it('find valid moves for illegal player', () => {
    const board = new Board();
    const exception = new RangeError(`illegal player 3`);
    expect(() => {
        board.validMoves(3);
    }).toThrow(exception);
});

it('play illegal move (row too low) with legal player', () => {
    const board = new Board();
    const exception = new RangeError(`move [-1/0] is out of bounds`);
    expect(() => {
        board.play(-1, 0, 1);
    }).toThrow(exception);
});

it('play illegal move (row too high) with legal player', () => {
    const board = new Board();
    const exception = new RangeError(`move [9/0] is out of bounds`);
    expect(() => {
        board.play(9, 0, 1);
    }).toThrow(exception);
});

it('play illegal move (col too low) with legal player', () => {
    const board = new Board();
    const exception = new RangeError(`move [0/-1] is out of bounds`);
    expect(() => {
        board.play(0, -1, 1);
    }).toThrow(exception);
});

it('play illegal move (col too high) with legal player', () => {
    const board = new Board();
    const exception = new RangeError(`move [0/9] is out of bounds`);
    expect(() => {
        board.play(0, 9, 1);
    }).toThrow(exception);
});

it('play legal move with illegal player', () => {
    const board = new Board();
    const exception = new RangeError(`illegal player 7`);
    expect(() => {
        board.play(3, 4, 7);
    }).toThrow(exception);
});

it('play invalid move for legal player', () => {
    const board = new Board();
    const exception = new RangeError(`move [2/3] is not valid for player 2`);
    expect(() => {
        // legal for player 1, not for 2
        board.play(2, 3, 2);
    }).toThrow(exception);
});

it('play legal first move with player one', () => {
    const board = new Board();
    const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(board.play(2, 3, 1).fields).toEqual(expected);
});

it('play legal second move with player two', () => {
    const before = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = Board.of(before);
    const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(board.play(2, 2, 2).fields).toEqual(expected);
});

it('play legal third move with player one', () => {
    const before = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = Board.of(before);
    const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(board.play(5, 4, 1).fields).toEqual(expected);
});

it('play legal fourth move with player two', () => {
    const before = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const board = Board.of(before);
    const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(board.play(5, 5, 2).fields).toEqual(expected);
});

it('play legal move in fictional setting', () => {
    const before = [
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 0, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    const board = Board.of(before);
    const expected = [
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 1, 2, 2, 2, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 2, 2, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 2],
        [2, 2, 1, 1, 2, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    expect(board.play(3, 4, 2).fields).toEqual(expected);
});

it('get result for initial state', () => {
    const board = new Board();
    const expected = {
        playerOne: 2,
        playerTwo: 2,
        finished: false,
        tied: false,
        winner: 0,
    };
    expect(board.result()).toEqual(expected);
});

it('get result for almost finished state', () => {
    const fields = [
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 0, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    const board = Board.of(fields);
    const expected = {
        playerOne: 35,
        playerTwo: 28,
        finished: false,
        tied: false,
        winner: 0,
    };
    expect(board.result()).toEqual(expected);
});

it('get result for finished state (player one wins)', () => {
    const fields = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 1, 1],
        [1, 2, 2, 1, 1, 1, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 1],
        [1, 1, 2, 2, 1, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const board = Board.of(fields);
    const expected = {
        playerOne: 48,
        playerTwo: 16,
        finished: true,
        tied: false,
        winner: 1,
    };
    expect(board.result()).toEqual(expected);
});

it('get result for finished state (player two wins)', () => {
    const fields = [
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 1, 2, 2, 2, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 2, 2, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 2],
        [2, 2, 1, 1, 2, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    const board = Board.of(fields);
    const expected = {
        playerOne: 16,
        playerTwo: 48,
        finished: true,
        tied: false,
        winner: 2,
    };
    expect(board.result()).toEqual(expected);
});

it('get result for tied state', () => {
    const fields = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    const board = Board.of(fields);
    const expected = {
        playerOne: 32,
        playerTwo: 32,
        finished: true,
        tied: true,
        winner: 0,
    }
    expect(board.result()).toEqual(expected);
});

it('create copy of initial board', () => {
    const board = new Board();
    const copy = board.copy();
    expect(board === copy).toBeFalsy(); // different instance
    expect(board.fields).toEqual(copy.fields); // same values
});

const compareNeighbourships = (a, b) => {
    const sum = (e) => {
        const o = e.original;
        const s = e.shift;
        const a = e.adjacent;
        // numeric representation of original, shift, and adjacent for sorting
        return Number(`1${o[0]}${o[1]}${s[0]+1}${s[1]+1}${a[0]}${a[1]}`);
    };
    const sumA = sum(a);
    const sumB = sum(b);
    return sumA - sumB;
};

it('find empty fields adjacent to player one fields', () => {
    const board = new Board();
    const emptyFields = board.fieldsWithState(0);
    const neighbourships = board.adjacentOf(emptyFields, 1);
    const expected = [
        {original: [2, 3], shift: [+1, +1], adjacent: [3, 4]},
        {original: [2, 4], shift: [+1, +0], adjacent: [3, 4]},
        {original: [2, 5], shift: [+1, -1], adjacent: [3, 4]},
        {original: [3, 5], shift: [+0, -1], adjacent: [3, 4]},
        {original: [4, 5], shift: [-1, -1], adjacent: [3, 4]},
        {original: [3, 2], shift: [+1, +1], adjacent: [4, 3]},
        {original: [4, 2], shift: [+0, +1], adjacent: [4, 3]},
        {original: [5, 2], shift: [-1, +1], adjacent: [4, 3]},
        {original: [5, 3], shift: [-1, +0], adjacent: [4, 3]},
        {original: [5, 4], shift: [-1, -1], adjacent: [4, 3]},
    ];
    neighbourships.sort(compareNeighbourships);
    expected.sort(compareNeighbourships);
    expect(neighbourships).toEqual(expected);
});

it('find player one fields after two moves', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.fieldsWithState(1)).toEqual([
        [3, 2], [3, 3], [4, 3]
    ]);
});

it('find player two fields after two moves', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.fieldsWithState(2)).toEqual([
        [2, 4], [3, 4], [4, 4]
    ]);
});

it('find opponent of player one', () => {
    const board = new Board();
    const playerOne = 1;
    const playerTwo = 2;
    const opponent = board.opponent(playerOne);
    expect(opponent).toEqual(playerTwo);
});

it('find opponent of player two', () => {
    const board = new Board();
    const playerOne = 1;
    const playerTwo = 2;
    const opponent = board.opponent(playerTwo);
    expect(opponent).toEqual(playerOne);
});

it('find opponent of illegal player', () => {
    const board = new Board();
    const illegalPlayer = 3;
    const exception = new RangeError(`illegal player ${illegalPlayer}`);
    expect(() => {
        board.opponent(illegalPlayer)
    }).toThrow(exception);
});
