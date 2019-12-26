'use strict';

// dimension is the default row and column dimension for a Reversi board.
const dimension = 8;

// empty represents an empty field.
const empty = 0;

// black represents a field belonging to the black player.
const black = 1;

// white represents a field belonging to the white player.
const white = 2;

// initRowColPlayer is an array of the initial game position, which is used for
// the board initialization.
const initRowColPlayer = [
    [3, 3, white],
    [3, 4, black],
    [4, 4, white],
    [4, 3, black]
];

// Board is a board for the game Reversi, which consists of fields arranged as
// n rows and n columns (usually 8x8). The fields are either empty, black
// (value 1), or white (value 2).
class Board {

    // constructor creates a new board with the initial game position, i.e.
    // all fields are empty, expect the four fields in the middle, which are
    // set to black or white (initial position).
    constructor() {
        let fields = new Array();
        for (let r = 0; r < dimension; r++) {
            let row = new Array();
            for (let c = 0; c < dimension; c++) {
                row.push(empty);
            }
            fields.push(row);
        }
        for (let [row, col, val] of initRowColPlayer) {
            fields[row][col] = val;
        }
        this.fields = fields;
    }

    // of creates and returns a board from the given fields.  If the given
    // array does not match the row and column dimensions, or if any of the
    // fields has an illegal value (i.e. not 0, 1, or 2), a RangeError is
    // thrown.
    static of(fields) {
        let board = new Board();
        if (fields.length != dimension) {
            throw new RangeError(`fields requires ${dimension} rows`);
        }
        for (let r = 0; r < dimension; r++) {
            let row = fields[r];
            if (row.length != dimension) {
                throw new RangeError(`row requires ${dimension} cols`);
            }
            for (let c = 0; c < dimension; c++) {
                if (row[c] != empty && row[c] != black && row[c] != white) {
                    throw new RangeError(`illegal value ${row[c]} ([${r}/${c}])`);
                }
            }
        }
        board.fields = fields;
        return board;
    }

    // getFieldsWithState returns all the field indices as an array with
    // elements in the form [row, column] that have the given state as their
    // value.
    getFieldsWithState(state) {
        const fields = [];
        for (const row in this.fields) {
            for (const col in this.fields[row]) {
                if (this.fields[row][col] == state) {
                    fields.push([Number(row), Number(col)]);
                }
            }
        }
        return fields;
    }

    // opponent determines the opponent of the given player. If an illegal
    // player value is given (i.e. not equal 1 or 2), a RangeError is thrown.
    opponent(player) {
        if (player == black) {
            return white;
        } else if (player == white) {
            return black;
        }
        throw RangeError(`illegal player ${player}`);
    }
}

module.exports = Board;
