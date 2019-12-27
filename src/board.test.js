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

const compareNeighbourships = (a, b) => {
    const sum = (e) => {
        const o = e.original;
        const s = e.shift;
        const a = e.adjacent;
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
