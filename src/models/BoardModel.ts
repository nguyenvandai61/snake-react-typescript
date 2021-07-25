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

    gameOver = () => {
        this._snake?.setIsAlive(false);
        // alert('Game Over');
    }

    drawApple() {
        if (!this._apple) return;
        let {x, y} = this._apple.getPosition();
        this._board[y][x] = 2;
    }

    drawSnakeMove() {
        if (!this._snake) return;
        let snakeBody = this._snake.getSnakeBody();
        let iterMeat = snakeBody?.getHead();
        let iterMeat2 = snakeBody?.getAfterTail(); 
        let head = iterMeat ? iterMeat.get_elem().position : { x: 3, y: 3 };
        let afterTail = iterMeat2? iterMeat2.get_elem().position : { x: 3, y: 3 };
        
        // highlight head
        this._board[afterTail.y][afterTail.x] = 0;
        this._board[head.y][head.x] = 1;
    }

    moveHandler(direction: DIRECTION) {
        let nextCell = this._snake?.getNextCell(direction);
        let {x, y} = nextCell.position;
        let nextCellValue: ITEM_STATE = this.getCellValue(x, y);
        
        switch (nextCellValue) {
            case ITEM_STATE.BLANK:
                this._snake?.move(direction);
                break;
            case ITEM_STATE.APPLE:
                let apple = new AppleModel(x, y);
                this._snake?.eat(apple);
                break;
            case ITEM_STATE.SNAKE:
                this.gameOver();
                break;
            case ITEM_STATE.WALL:
                this.gameOver();
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
}