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
