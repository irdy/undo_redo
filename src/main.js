import { Cart } from './Cart.js';
import { Goods } from './Goods.js';
import { MutationObserverProxy } from './MutationObserverProxy.js';
import { $ } from './alias.js';
import { History } from './History.js';
import { ObservedArea } from './ObservedArea.js';
import { DOM_Interaction } from './DOM_Interaction.js';

/**
 * PURE JS UNDO/REDO IMPLEMENTATION BASED ON `DOUBLY LINKED LIST` DATA STRUCTURE
 */

/**
 * filter
 * returns true if nodes were added
 * @param mutationRecord
 * @returns {boolean}
 */
let areNodesAdded = mutationRecord => {
    return mutationRecord.addedNodes.length > 0;
};

const DI = new DOM_Interaction();
new Goods(new Cart(DI), DI);

let observerProxy = new MutationObserverProxy($('#observed_area'), {
    childList: true,
    subtree: true
}, (mutationRecord) => {
    if (areNodesAdded(mutationRecord)) {
        history.push();
    }
});

let observedArea = new ObservedArea();
let history = new History(observedArea, observerProxy, DI);
