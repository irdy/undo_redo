import { $ } from './alias.js';
import { ProductStorage } from './ProductStorage.js';
import { DOM_Interaction } from './DOM_Interaction.js';

export class Cart extends ProductStorage {
    constructor(DI: DOM_Interaction) {
        super(
            Cart.CART_SELECTOR,
            Cart.CURRENT_GOODS_SELECTOR,
            DI
        );

        this.initHandlers();
    }

    initHandlers() {
        $(Cart.CLEAR_CART_SELECTOR).addEventListener('click', () => {
            this.clear().render();
        })
    }
}

Cart.CART_SELECTOR = '#cart';
Cart.CURRENT_GOODS_SELECTOR = '#cart > .product';
Cart.CLEAR_CART_SELECTOR = '#clear_cart';