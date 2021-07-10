import { SinglyLinkedList, LinkedNode } from '../data_structure/SinglyLinkedList';
import { DIRECTION } from '../enums/Direction';
interface SnakeMeat {
    position: {
        x: number,
        y: number
    }
} 

export default class Snake {
    private _body: SinglyLinkedList<SnakeMeat>| null = null;

    constructor(x: number, y: number) {
        let newSnakeMeat: SnakeMeat = {
            position: {
                x, y
            }
        }
        this._body = new SinglyLinkedList(new LinkedNode(newSnakeMeat));
    }

    move = (direction: DIRECTION) => {
        // BUG
        let headMeat = this._body?.getHead()?.get_elem();
        console.log('move - old headMeat', headMeat);
        let x_head: number = headMeat? headMeat.position.x : 3;
        let y_head: number = headMeat? headMeat.position.y : 3;

        let x_offset: number = !(direction%2)? direction-1: 0;
        let y_offset: number = (direction%2)? direction-2 : 0;
        let snakeMeat: SnakeMeat = {
            position: {
                x: x_head+x_offset,
                y: y_head+y_offset
            }
        }
        console.log('snake meat add', snakeMeat);
        let snakeMeatNode: LinkedNode<SnakeMeat>= new LinkedNode(snakeMeat);
        this._body?.appendHead(snakeMeatNode);
        this._body?.deleteTail();
        console.log('move - this body', this._body);
    }

    getSnakeBody() {
        return this._body;
    }

    getHead() {
        return this._body? this._body.getHead(): null;
    }
}