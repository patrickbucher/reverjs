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
}

module.exports = Board;
