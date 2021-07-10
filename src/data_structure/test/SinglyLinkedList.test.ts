import { SinglyLinkedList, LinkedNode } from '../SinglyLinkedList';


describe('Singly linked list', () => {
    let SLL : SinglyLinkedList<any>;

    beforeEach(() => {
        SLL = new SinglyLinkedList(new LinkedNode(3));
    });

    test('append head', () => {
        SLL.appendHead(new LinkedNode(4));
        expect(SLL.getHead()?.get_elem()).toBe(4);
        expect(SLL.getTail()?.get_elem()).toBe(3);
        expect(SLL.getLength()).toBe(2);
    });

    test('delete tail', () => {
        SLL.appendHead(new LinkedNode(4));
        SLL.deleteTail();
        expect(SLL.getHead()?.get_elem()).toBe(4);
        expect(SLL.getTail()?.get_elem()).toBe(4);
        expect(SLL.getLength()).toBe(1);
    });

    test('get afterTail', () => {
        SLL.appendHead(new LinkedNode(4));
        SLL.deleteTail();
        expect(SLL.getAfterTail()?.get_elem()).toBe(3);
    });
});
