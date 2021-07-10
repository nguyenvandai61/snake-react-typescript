import { DIRECTION } from "../../enums/Direction";
import Snake from "../../models/Snake";

export default class BoardController {
    private _snake: Snake;
    private _board: Array<Array<number>>;
    
    constructor(board: Array<Array<number>>) {
        this._snake = new Snake(3, 3);
        this._board = board;
    }
    initGame = () => {
        console.log('init game');
    }
    handleMoveEvents = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            this._snake.move(DIRECTION.DOWN);
            console.log('press Enter');
        }
    };

    getSnake() {
        return this._snake;   
    }
    getBoard = () => {
        return this._board;
    };
}