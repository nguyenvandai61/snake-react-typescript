export class LinkedNode<T> {
    private _elem: T;
    private _next: LinkedNode<T> | null;
    private _prev: LinkedNode<T> | null;

    constructor(elem: T) {
        this._elem = elem;
        this._next = null;
        this._prev = null;
    }

    set_next(nextNode: LinkedNode<T>| null) {
        this._next = nextNode;
    }
    set_prev(prevNode: LinkedNode<T>| null) {
        this._prev = prevNode;
    }
    get_elem() {
        return this._elem;
    }
    get_next() {
        return this._next;
    }
    get_prev() {
        return this._prev;
    }
}

export class SinglyLinkedList<T> {
    private _head: LinkedNode<T> | null = null;
    private _tail: LinkedNode<T> | null = null;
    private _afterTail: LinkedNode<T> | null = null;

    private _len = 0;
    
    constructor(headElement?: LinkedNode<T>) {
        this._head = headElement || null;
        this._tail = this._head;
        this._len = 1;
    }

    appendHead(newHead: LinkedNode<T>) {
        this._head?.set_prev(newHead);
        newHead.set_next(this._head);
        this._head = newHead;
        this._len++;
    }

    deleteTail() {
        if (this._tail) {
            this._afterTail = new LinkedNode<T>(this._tail?.get_elem());
        }
        let prevNode: LinkedNode<T>|null = this._tail? this._tail.get_prev():null;
        prevNode?.set_next(null);
        this._tail = prevNode;
        this._len--;
    }

    getAfterTail() {
        return this._afterTail;
    }

    getHead() {
        return this._head;
    }

    getLength() {
        return this._len;
    }

    getTail() {
        return this._tail;
    }

    printAllNodes() {
        let iterNode = this._head;
        while(iterNode != null) {
            console.log(iterNode.get_elem());
            iterNode = iterNode.get_next();
        }
        console.log('finish print all nodes');
    }
    printLength() {
        console.log(this._len);
    }
}