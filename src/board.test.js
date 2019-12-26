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

it('find one fields on initial board', () => {
    const board = new Board();
    expect(board.fieldsWithState(1)).toEqual([[3, 4], [4, 3]]);
});

it('find two fields on initial board', () => {
    const board = new Board();
    expect(board.fieldsWithState(2)).toEqual([[3, 3], [4, 4]]);
});

it('find initial valid moves for player one', () => {
    const board = new Board();
    expect(board.validMoves(1)).toEqual(new Set([[2, 3], [3, 2], [5, 4], [4, 5]]));
});

it('find one fields after two moves', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.fieldsWithState(1)).toEqual([
        [3, 2], [3, 3], [4, 3]
    ]);
});

it('find two fields after two moves', () => {
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

it('find opponent of player one', () => {
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
