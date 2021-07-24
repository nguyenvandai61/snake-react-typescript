import { DIRECTION } from "../../enums/Direction";
import Apple from "../../models/AppleModel";
import CellModel from "../../models/CellModel";
import Snake from "../../models/SnakeModel";

export default class BoardController {
    private _snake: Snake;
    private _apple: Apple;
    private _board: Array<Array<number>>;
    
    constructor(board: Array<Array<number>>) {
        this._snake = new Snake(3, 3);
        this._apple = new Apple(3, 6);
        this._board = board;
    }
    initGame = () => {
        console.log('init game');
    }

    drawApple() {
        let {x, y} = this._apple.getPosition();
        this._board[y][x] = 2;
    }

    drawSnakeMove() {
        let snakeBody = this._snake.getSnakeBody();
        let iterMeat = snakeBody?.getHead();
        let iterMeat2 = snakeBody?.getAfterTail(); 
        let head = iterMeat ? iterMeat.get_elem().position : { x: 3, y: 3 };
        let afterTail = iterMeat2? iterMeat2.get_elem().position : { x: 3, y: 3 };
        
        // highlight head
        this._board[afterTail.y][afterTail.x] = 0;
        this._board[head.y][head.x] = 1;
    }

    getSnake() {
        return this._snake;   
    }
    getBoard = () => {
        return this._board;
    };

    
}