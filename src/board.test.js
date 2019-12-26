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

it('find black fields on initial board', () => {
    const board = new Board();
    expect(board.getFieldsWithState(1)).toEqual([[3, 4], [4, 3]]);
});

it('find white fields on initial board', () => {
    const board = new Board();
    expect(board.getFieldsWithState(2)).toEqual([[3, 3], [4, 4]]);
});

it('find black fields after two moves', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.getFieldsWithState(1)).toEqual([
        [3, 2], [3, 3], [4, 3]
    ]);
});

it('find white fields after two moves', () => {
    const board = Board.of(boardAfterTwoMoves);
    expect(board.getFieldsWithState(2)).toEqual([
        [2, 4], [3, 4], [4, 4]
    ]);
});

it('find opponent of black player', () => {
    const board = new Board();
    const blackPlayer = 1;
    const whitePlayer = 2;
    const opponent = board.opponent(blackPlayer);
    expect(opponent).toEqual(whitePlayer);
});

it('find opponent of black player', () => {
    const board = new Board();
    const blackPlayer = 1;
    const whitePlayer = 2;
    const opponent = board.opponent(whitePlayer);
    expect(opponent).toEqual(blackPlayer);
});

it('find opponent of illegal player', () => {
    const board = new Board();
    const illegalPlayer = 3;
    const exception = new RangeError(`illegal player ${illegalPlayer}`);
    expect(() => {
        board.opponent(illegalPlayer)
    }).toThrow(exception);
});
