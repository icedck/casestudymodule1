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

const white_color_id = 7;   //biến index lưu lại vị trí màu trắng

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = cols*block_size;
ctx.canvas.height = rows*block_size;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
        this.audio = new Audio("sound1.wav");
        this.audioGameOver = new Audio("gameover.mp3");
        this.audioPlay = new Audio("btnplay.mp3");
        this.highScore = localStorage.getItem("tetrisHighScore") || 0;
        document.getElementById("high-score").innerText = this.highScore;

    }

    reset(){
        this.score =0;
        this.grid=this.generateWhiteBoard();
        this.gameOver=false;
        this.audioPlay.play();
        this.drawBoard();
        document.getElementById("high-score").innerText = this.highScore;

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
                this.drawCell(col,row, this.grid[row][col]);
            }
        }
    }

    handleCompleteRows(){
        const latestGrid = board.grid.filter((row) => { // row => []
            return row.some(col => col === white_color_id);
        });
        const newScore = rows - latestGrid.length; // => newSore = tong cong hang da hoan thanh
        const newRows = Array.from({length: newScore}, () => Array(cols).fill(white_color_id));

        if (newScore){
        board.grid = [...newRows,...latestGrid];
        this.handleScore(newScore * 10);

        this.audio.play();
        console.log({latestGrid});
        }
    }

    handleScore(newScore) {
        this.score += newScore;
        document.getElementById("score").innerText = this.score;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("tetrisHighScore", this.highScore);
            document.getElementById("high-score").innerText = this.highScore;
        }
    }

    handleGameOver(){
        this.gameOver =true;
        this.isPlaying = false;
        this.audioGameOver.play();
        alert("GAME OVER !!!");
    }
}

class Brick{
    constructor(id) {
        this.id = id;
        this.layout = brick_layout[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2;
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

            return;
        }
        this.handleLanded();
        if(!board.gameOver){
            generateNewBrick();
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
                if (nextLayout[row][col] != white_color_id && nextRow >=0){
                    if ((col + nextCol < 0)||
                        (col + nextCol >= cols)||
                        (row + nextRow >= rows)||
                        board.grid[row+nextRow][col+nextCol] !== white_color_id
                    ){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    handleLanded(){
        if (this.rowPos<=0){
            board.handleGameOver();
            return;
        }

        for (let row =0;row<this.layout[this.activeIndex].length;row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== white_color_id){
                    board.grid[row+this.rowPos][col+this.colPos] = this.id;
                }
            }
        }

        board.handleCompleteRows();
        board.drawBoard();
    }

}

function generateNewBrick(){
    brick = new Brick(Math.floor(Math.random() * 10) % brick_layout.length);    // tao ra 1 id bat ki nam tu 0 -> 6
}

board = new Board(ctx);
board.drawBoard();
generateNewBrick()
// brick = new Brick(0);
// brick.moveLeft();
// brick.moveRight();
// brick.moveDown();
// brick.rotate();
document.getElementById("play").addEventListener("click", () => {
    board.reset();
    board.isPlaying = true;
    generateNewBrick();

    const refresh =setInterval(()=>{
        if(!board.gameOver){
            brick.moveDown();
        }else{
            clearInterval(refresh);
        }
    }, 1000);

})


document.addEventListener("keydown", event => {
    if (!board.gameOver && board.isPlaying){
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
    }

});
// board.drawCell(1,1,1);
console.table(board.grid);