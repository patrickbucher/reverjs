'use strict';

const dimension = 8;

const empty = 0;
const black = 1;
const white = 2;

const initRowColPlayer = [
    [3, 3, white],
    [3, 4, black],
    [4, 4, white],
    [4, 3, black]
];

class Board {

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
