import { ITEM_STATE } from '../enums/ItemState';
export default class ItemModel {
    protected __x: number = 0;
    protected __y: number = 0;
    protected __state: ITEM_STATE = 0;

    constructor(x: number, y: number, state: ITEM_STATE) {
        this.__x = x;
        this.__y = y;
        this.__state = state;
    }

    getPosition(): { x: number, y: number } {
        return {
            x: this.__x,
            y: this.__y
        }
    }

    getState() {
        return this.__state;
    }
}