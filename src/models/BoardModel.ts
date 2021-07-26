import { DIRECTION } from "../enums/Direction";
import { ITEM_STATE } from "../enums/ItemState";
import Apple from "./AppleModel";
import Snake from "./SnakeModel";
import AppleModel from './AppleModel';

export default class BoardModel {
    private _width: number = 12;
    private _height: number = 8;
    private _snake: Snake | null = null;
    private _apple: Apple | null = null;
    private _board: Array<Array<number>>;
    private _direction: DIRECTION = DIRECTION.RIGHT;
    
    constructor(board: Array<Array<number>>, width: number, height: number) {
        this._board = board;
        this._width = width;
        this._height = height;
    }

    addApple(apple: Apple) {
        this._apple = apple;
    }

    addSnake(snake: Snake) {
        this._snake = snake;
    }

    initGame = () => {
        console.log('init game');
    }
    
   

    updateDraw = () => {
        console.log('update draw');
        this.drawSnakeMove();
        this.drawApple();
    }
    gameOver = () => {
        this._snake?.setIsAlive(false);
        console.log('game over');
        // alert('Game Over');
    }

    drawApple() {
        if (!this._apple) return;
        let {x, y} = this._apple.getPosition();
        this._board[y][x] = 2;
    }

    drawSnakeMove() {
        if (!this._snake) return;
        console.log('A');
        let snakeBody = this._snake.getSnakeBody();
        let iterMeat = snakeBody?.getHead();
        let iterMeat2 = snakeBody?.getAfterTail(); 
        let head = iterMeat ? iterMeat.get_elem().position : { x: 3, y: 3 };
        let afterTail = iterMeat2? iterMeat2.get_elem().position : { x: 3, y: 3 };
        console.log('B');
        // highlight head
        this._board[afterTail.y][afterTail.x] = 0;
        this._board[head.y][head.x] = 1;
    }

    setDirection(direction: DIRECTION) {
        // No opposiite direction
        if ((this._direction+direction)%2 === 0) return;
        this._direction = direction;
    }


    moveHandler() {
        console.log(this._snake);
        let nextCell = this._snake?.getNextCell(this._direction);
        let {x, y} = nextCell.position;
        let nextCellValue: ITEM_STATE = this.getCellValue(x, y);
        console.log(x, y);
        switch (nextCellValue) {
            case ITEM_STATE.BLANK:
                this._snake?.move(this._direction);
                break;
            case ITEM_STATE.APPLE:
                let apple = new AppleModel(x, y);
                this._snake?.eat(apple);
                // Create a other apple
                let x_apple: number, y_apple: number;
                do {
                    x_apple = Math.floor(Math.random() * this._width);
                    y_apple = Math.floor(Math.random() * this._height);
                } while (!(this.getCellValue(x_apple, y_apple) === ITEM_STATE.BLANK));
                // console.log(`create apple at ${x_apple}, ${y_apple}`);
                this._apple = new AppleModel(x_apple, y_apple);
                this.drawApple();
                break;
            case ITEM_STATE.SNAKE:
                // this.gameOver();
                break;
            case ITEM_STATE.WALL:
                // this.gameOver();
                break;
        }
    }

    getSnake() {
        return this._snake;   
    }
    getBoard = () => {
        return this._board;
    };

    getCellValue(x: number, y: number): ITEM_STATE {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return ITEM_STATE.WALL;
        }
        return this._board[y][x];
    }

    getDirection() {
        return DIRECTION[this._direction];
    }
}