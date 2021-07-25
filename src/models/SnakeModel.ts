import { type } from 'os';
import { SinglyLinkedList, LinkedNode } from '../data_structure/SinglyLinkedList';
import { DIRECTION } from '../enums/Direction';
import Item from './ItemModel';
import Cell from './CellModel';
import { ITEM_STATE } from '../enums/ItemState';
interface SnakeMeat  {
    position: {
        x: number,
        y: number
    }
} 

export default class SnakeModel extends Item {
    private _body: SinglyLinkedList<SnakeMeat>| null = null;
    private _direction: DIRECTION = DIRECTION.DOWN;

    constructor(x: number, y: number) {
        super(x, y, ITEM_STATE.SNAKE);
        let newSnakeMeat: SnakeMeat = {position : this.getPosition()}
        this._body = new SinglyLinkedList(new LinkedNode(newSnakeMeat));
    }

    /**
     *  Snake move and eat all everything on his own path
     * */
    move = (direction: DIRECTION) => {
        this._direction = direction;
        // Snake move
        let snakeMeat: SnakeMeat = this.getNextCell(direction);
        // Check next cell
        let snakeMeatNode: LinkedNode<SnakeMeat>= new LinkedNode(snakeMeat);
        this._body?.appendHead(snakeMeatNode);
        this._body?.deleteTail();
    }

    eat(food: Item) {
        let headMeat: SnakeMeat | null | undefined = this._body? this._body.getHead()?.get_elem(): null;
        if(headMeat) {
            let x_food: number = food.getPosition().x;
            let y_food: number = food.getPosition().y;
            let nextCell: any = {
                position: {
                    x: x_food,
                    y: y_food,
                }
            }
            let newSnakeMeat: SnakeMeat = nextCell;
            let snakeMeatNode: LinkedNode<SnakeMeat> = new LinkedNode(newSnakeMeat); 
            this._body?.appendHead(snakeMeatNode);
        }
    }

    // checkCell(cell: {x: number, y: number}) {
    //     let headMeat: SnakeMeat | null | undefined = this._body? this._body.getHead()?.get_elem(): null;
    //     if(headMeat) {
    //         let x_head: number = headMeat? headMeat.position.x : 3;
    //         let y_head: number = headMeat? headMeat.position.y : 3;
            
    //     }
    //     return false;
    // }
    
    getSnakeBody() {
        return this._body;
    }

    getHead() {
        return this._body? this._body.getHead(): null;
    }

    getNextCell(direction: DIRECTION){
        let headMeat = this._body?.getHead()?.get_elem();
        let x_head: number = headMeat? headMeat.position.x : 3;
        let y_head: number = headMeat? headMeat.position.y : 3;
        let x_offset: number = (!(direction%2))? direction-1: 0;
        let y_offset: number = (direction%2)? direction-2 : 0;
        let nextCell: any = {
            position: {
                x: x_head+x_offset,
                y: y_head+y_offset
            }
        }
        return nextCell;
    }
}