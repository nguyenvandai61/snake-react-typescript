import { DIRECTION } from '../../enums/Direction';
import Snake from '../SnakeModel';

describe('Snake move', () => {
    let snake:Snake;
    let x: number = 3;
    let y: number = 3;

    beforeEach(() => {
        snake = new Snake(x, y);
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
});
