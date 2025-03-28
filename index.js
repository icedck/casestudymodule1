const cols =10;
const rows = 20;
const block_size=30;
const color_mapping=[
    "red","orange","green","purple","blue","cyan","yellow","white"
];
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
board = new Board(ctx);
board.drawBoard();
// board.drawCell(1,1,1);
console.table(board.grid);