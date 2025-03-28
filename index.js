const cols =10;
const rows = 20;
const block_size=30;
const color_mapping=[
    "red","orange","green","purple","blue","cyan","yellow","white"
];

const brick_layout=[
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

const key_codes = {
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
};

const white_color_id = 7;   //biến index lưu lại vị trí màu

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = cols*block_size;
ctx.canvas.height = rows*block_size;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
    }
    generateWhiteBoard() {
        return Array.from({length: rows}, () => Array(cols).fill(white_color_id));
    }
    drawCell(xAxis, yAxis, colorId){
        this.ctx.fillStyle = color_mapping[colorId] || color_mapping[white_color_id];
        this.ctx.fillRect(xAxis * block_size, yAxis * block_size, block_size, block_size);
        this.ctx.fillStyle="black";
        this.ctx.strokeRect(xAxis * block_size, yAxis * block_size, block_size, block_size);
    }
    drawBoard(){
        for (let row =0;row<this.grid.length;row++){
            for (let col =0;col<this.grid[0].length;col++){
                this.drawCell(col,row, white_color_id);
            }
        }
    }
}

class Brick{
    constructor(id) {
        this.id = id;
        this.layout = brick_layout[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = 3;
    }

    draw(){
        for (let row =0;row<this.layout[this.activeIndex].length;row++){
            for (let col =0;col<this.layout[this.activeIndex][0].length;col++){
                if (this.layout[this.activeIndex][row][col] != white_color_id){
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id)
                }
            }
        }
    }
    clear(){
        for (let row =0;row<this.layout[this.activeIndex].length;row++){
            for (let col =0;col<this.layout[this.activeIndex][0].length;col++){
                if (this.layout[this.activeIndex][row][col] != white_color_id){
                    board.drawCell(col + this.colPos, row + this.rowPos, white_color_id)
                }
            }
        }
    }

    moveLeft(){
        if (!this.checkCollistion(this.rowPos, this.colPos-1, this.layout[this.activeIndex])){
            this.clear();
            this.colPos--;
            this.draw();
        }

    }
    moveRight(){
        if (!this.checkCollistion(this.rowPos, this.colPos+1, this.layout[this.activeIndex])){
            this.clear();
            this.colPos++;
            this.draw();
        }
    }
    moveDown(){
        if (!this.checkCollistion(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
        }
    }
    rotate(){
        if (!this.checkCollistion(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    checkCollistion(nextRow, nextCol, nextLayout){
        // if(nextCol<0) return true;

        for (let row = 0;row < nextLayout.length;row++){
            for (let col =0;col < nextLayout[0].length;col++){
                if (nextLayout[row][col] != white_color_id){
                    if ((col + nextCol < 0)||(col + nextCol >= cols) || (row + nextRow >= rows)){
                        return true;
                    }
                }
            }
        }

        return false;
    }
}

board = new Board(ctx);
board.drawBoard();
brick = new Brick(0);
brick.draw();
// brick.moveLeft();
// brick.moveRight();
// brick.moveDown();
// brick.rotate();

document.addEventListener("keydown", event => {
    console.log(event)
    switch (event.code) {
        case key_codes.Left:
            brick.moveLeft();
            break;
        case key_codes.Right:
            brick.moveRight();
            break;
        case key_codes.Up:
            brick.rotate();
            break;
        case key_codes.Down:
            brick.moveDown();
            break;
        default:
            break;
    }
});
// board.drawCell(1,1,1);
console.table(board.grid);