import { ITEM_STATE } from "../enums/ItemState";
import Item from "./ItemModel";

export default class CellModel extends Item{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(x: number, y: number, state: ITEM_STATE) {
        super(x, y, state);
    }
}