// @flow
import { $ } from './alias.js';
import { MutationObserverProxy } from './MutationObserverProxy.js';
import { ObservedArea } from './ObservedArea.js';
import { DoublyLinkedList } from './DoublyLinkedList.js';
import { DOM_Interaction } from './DOM_Interaction.js';

export class History {
    observedArea: ObservedArea;
    state: DoublyLinkedList;
    observerProxy: MutationObserverProxy;
    DI: DOM_Interaction;
    static NEXT_SELECTOR: string;
    static PREV_SELECTOR: string;

    constructor(observedArea: ObservedArea, observerProxy: MutationObserverProxy, DI: DOM_Interaction) {
        this.observedArea = observedArea;
        this.observerProxy = observerProxy;
        this.DI = DI;
        this.state = (new DoublyLinkedList()).add(observedArea.getHtml());
        this.initHandlers();
    }

    initHandlers() {
        $(History.NEXT_SELECTOR).addEventListener('click', () => {
            this.next();
        });

        $(History.PREV_SELECTOR).addEventListener('click', () => {
            this.prev();
        });
    }

    push() {
        this.state.add(this.observedArea.getHtml());
    }

    clear() {
        this.state = new DoublyLinkedList();
    }

    getHistoryList(): DoublyLinkedList {
        return this.state;
    }

    _renderObservedArea(record: string) {
        this.observerProxy.disable();
        this.observedArea.render(record);
        this.DI.restore();
        this.observerProxy.enable();
    }

    next() {
        this._renderObservedArea(this.state.getNext().data);
    }

    prev() {
        this._renderObservedArea(this.state.getPrevious().data);
    }

    toStart() {

    }

    toEnd() {

    }
}

History.NEXT_SELECTOR = '#next';
History.PREV_SELECTOR = '#prev';