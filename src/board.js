'use strict';

// dimension is the default row and column dimension for a Reversi board.
const dimension = 8;

// empty represents an empty field.
const empty = 0;

// one represents a field belonging to the first player.
const one = 1;

// two represents a field belonging to the second player.
const two = 2;

// initRowColPlayer is an array of the initial game position, which is used for
// the board initialization.
const initRowColPlayer = [
    [3, 3, two],
    [3, 4, one],
    [4, 4, two],
    [4, 3, one],
];

// shifts is a map of [row, col] shift array for all possible directions on the
// board.
const shifts = [
    [-1, +0], // north
    [-1, +1], // north east
    [+0, +1], // east
    [+1, +1], // south east
    [+1, +0], // south
    [+1, -1], // south west
    [+0, -1], // west
    [-1, -1], // north west
];

// Board is a board for the game Reversi, which consists of fields arranged as
// n rows and n columns (usually 8x8). The fields are either empty, one
// (value 1), or two (value 2).
class Board {

    // constructor creates a new board with the initial game position, i.e.
    // all fields are empty, expect the four fields in the middle, which are
    // set to one or two (initial position).
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
                if (row[c] != empty && row[c] != one && row[c] != two) {
                    throw new RangeError(`illegal value ${row[c]} ([${r}/${c}])`);
                }
            }
        }
        board.fields = fields;
        return board;
    }

    // validMoves returns all moves that are valid for the given player on the
    // current board. The moves are returned as an array of [row, col] arrays.
    validMoves(player) {
        const validMoves = new Set([]);
        const emptyFields = this.fieldsWithState(empty);
        const otherPlayer = this.opponent(player);
        const emptyFieldsNextToOpponent = this.adjacentOf(emptyFields, otherPlayer);
        for (const candidate of emptyFieldsNextToOpponent) {
            // search from adjacent field into shift direction
            const shift = candidate.shift;
            for (let field = candidate.adjacent;
                field[0] >= 0 && field[0] < dimension && field[1] >= 0 && field[1] < dimension;
                field[0] += shift[0], field[1] += shift[1]) {
                const fieldValue = this.fields[field[0]][field[1]];
                if (fieldValue == empty) {
                    // empty field found: do not search any further
                    break;
                }
                if (fieldValue == player) {
                    // if own field is found in shift direction, the move is valid
                    validMoves.add(candidate.original);
                    break;
                }
            }
        }
        return validMoves;
    }

    // adjacentOf returns all adjacent fields of the given fields that have the
    // given state. The fields are returned as a map consisting of:
    // 1) the original field from fields
    // 2) the adjacent field with the given state
    // 3) the shift applied in order to get from 1) to 2)
    adjacentOf(fields, state) {
        const adjacents = [];
        for (const field of fields) {
            const [r, c] = field;
            for (const shift of shifts) {
                const [newRow, newCol] = [r + shift[0], c + shift[1]];
                if (newRow < 0 || newRow >= dimension ||
                    newCol < 0 || newCol >= dimension) {
                    // out of board bounds, ignore direction
                    continue; 
                }
                if (this.fields[newRow][newCol] == state) {
                    adjacents.push({
                        original: [r, c],
                        shift: shift,
                        adjacent: [newRow, newCol],
                    });
                }
            }
        }
        return adjacents;
    }

    // fieldsWithState returns all the field indices as an array with elements
    // in the form [row, column] that have the given state as their value.
    fieldsWithState(state) {
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
        if (player == one) {
            return two;
        } else if (player == two) {
            return one;
        }
        throw RangeError(`illegal player ${player}`);
    }
}

module.exports = Board;
