import { ITEM_STATE } from "../enums/ItemState";
import Item from "./ItemModel";

export default class AppleModel extends Item{
    constructor(x: number, y: number) {
        super(x, y, ITEM_STATE.APPLE);
    }
}