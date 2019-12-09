'use strict';

const dimension = 8;

const empty = 0;
const black = 1;
const white = 2;

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
        this.fields = fields;
    }
}

module.exports = Board;
