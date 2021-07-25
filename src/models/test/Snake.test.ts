import { DIRECTION } from '../../enums/Direction';
import Snake from '../SnakeModel';
import AppleModel from '../AppleModel';
import BoardModel from '../BoardModel';

let WIDTH = 12;
let HEIGHT = 12;
let board = new Array(WIDTH).fill(0).map((_, i) => new Array(HEIGHT).fill(0));

describe('Snake move', () => {
    let snake:Snake;
    let x: number = 3;
    let y: number = 3;
    let boardController: BoardModel;
    
    beforeEach(() => {
        boardController = new BoardModel(JSON.parse(JSON.stringify(board)), WIDTH, HEIGHT);
        boardController.addSnake(snake = new Snake(x, y));
    });

    test('snake left left', () => {
        snake?.move(DIRECTION.LEFT);
        snake?.move(DIRECTION.LEFT);
        expect(snake?.getSnakeBody()?.getHead()?.get_elem().position).toStrictEqual({x: x-2, y: y});
        expect(snake?.getSnakeBody()?.getTail()?.get_elem().position).toStrictEqual({x: x-2, y: y})
        expect(snake?.getSnakeBody()?.getLength()).toBe(1);
    });

    test('snake right right', () => {
        snake?.move(DIRECTION.RIGHT);
        snake?.move(DIRECTION.RIGHT);
        expect(snake?.getSnakeBody()?.getHead()?.get_elem().position).toStrictEqual({x: x+2, y: y});
        expect(snake?.getSnakeBody()?.getLength()).toBe(1);
    });

    test('snake up up', () => {
        snake?.move(DIRECTION.UP);
        snake?.move(DIRECTION.UP);
        expect(snake?.getSnakeBody()?.getHead()?.get_elem().position).toStrictEqual({x: x, y: y-2});
        expect(snake?.getSnakeBody()?.getLength()).toBe(1);
    });

    test('snake down down', () => {
        snake?.move(DIRECTION.DOWN);
        snake?.move(DIRECTION.DOWN);
        expect(snake?.getSnakeBody()?.getHead()?.get_elem().position).toStrictEqual({x: x, y: y+2});
        expect(snake?.getSnakeBody()?.getLength()).toBe(1);
    });

    test('Collision with wall', () => {
        console.log(boardController?.getSnake()?.getSnakeBody()?.getHead()?.get_elem().position);
        boardController.moveHandler(DIRECTION.LEFT);
        boardController.moveHandler(DIRECTION.LEFT);
        boardController.moveHandler(DIRECTION.LEFT);
        console.log(boardController?.getSnake()?.getSnakeBody()?.getHead()?.get_elem().position);
        boardController.moveHandler(DIRECTION.LEFT);
        boardController.moveHandler(DIRECTION.LEFT);
        console.log(boardController?.getSnake()?.getSnakeBody()?.getHead()?.get_elem().position);
        expect(boardController?.getSnake()?.getIsAlive()).toBe(false);
    })
});

describe('Snake eat apple', () => {
    let snake:Snake;
    let apple: AppleModel;
    let x: number = 3;
    let y: number = 3;

    beforeEach(() => {
        let boardController = new BoardModel(JSON.parse(JSON.stringify(board)), WIDTH, HEIGHT);
        boardController.addSnake(snake = new Snake(x, y));
        boardController.addApple(apple = new AppleModel(x, y+1));
    });

    test('snake eat down', () => {
        snake?.eat(apple);
        expect(snake?.getSnakeBody()?.getHead()?.get_elem().position).toStrictEqual({x: x, y: y+1});
        expect(snake?.getSnakeBody()?.getTail()?.get_elem().position).toStrictEqual({x: x, y: y});
        expect(snake?.getSnakeBody()?.getLength()).toBe(2);
    });
});
