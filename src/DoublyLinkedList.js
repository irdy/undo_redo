class Node {
    constructor(value) {
        this.data = value;
        this.index = null;
        this.previous = null;
        this.next = null;
    }
}

export class DoublyLinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
        this._current = null;
    }

    /**
     * длина списка будет равна текущему узлу + 1
     * @private
     */
    _updateLength() {
        this._length = this.getCurrentIndex() + 1;
    }

    /**
     * создаем новый узел в конец списка
     * @param value
     * @returns {DoublyLinkedList}
     */
    add(value) {
        let node = new Node(value);
        this.tail = this._current;

        if (this._length) {
            node.previous = this.tail;
            this.tail.next = node;
        } else {
            this.head = node;
        }

        this._updateLength();
        this._current = this.tail = node;
        node.index = this._length;
        return this;
    }

    getCurrentIndex(): number {
        return this._current ? this._current.index : 0;
    }

    getCurrent() {
        return this._current;
    }

    /**
     * отслеживаем текущий узел при движении по списку
     * @returns {*}
     */
    getPrevious() {
        return this._current = this._current.previous === null ? this._current : this._current.previous;
    }

    /**
     * отслеживаем текущий узел при движении по списку
     * @returns {*}
     */
    getNext() {
        return this._current = this._current.next === null ? this._current : this._current.next;
    }
}