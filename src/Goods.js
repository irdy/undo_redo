import { $ } from './alias.js';
import { ProductStorage } from './ProductStorage.js';
import { Cart } from './Cart.js';
import { Product } from './Product.js';
import { DOM_Interaction } from './DOM_Interaction.js';

export class Goods extends ProductStorage {
    static GOODS_SELECTOR: string;
    static ADD_PRODUCT_SELECTOR: string;
    static CURRENT_GOODS_SELECTOR: string;
    goodsNode: HTMLDivElement;
    addProductNode: HTMLInputElement;
    cart: Cart;

    constructor(cart: Cart, DI: DOM_Interaction) {
        super(Goods.GOODS_SELECTOR, Goods.CURRENT_GOODS_SELECTOR, DI);
        this.cart = cart;
        this.goodsNode = $(Goods.GOODS_SELECTOR);
        this.addProductNode = $(Goods.ADD_PRODUCT_SELECTOR);
        this.initHandlers(DI);
    }

    initHandlers(DI: DOM_Interaction) {

        let handler = (e: Event) => {
            if (e.target === this.goodsNode) {
                return;
            }

            let product = e.target;
            if (product && product.nodeType === 1 && product.classList.contains('product')) {
                this.cart.addProduct(e.target).render();
            }
        };

        handler = handler.bind(this);

        DI.save(
            {
                instance: this,
                prop: 'goodsNode',
                selector: Goods.GOODS_SELECTOR,
                handler
            }
        );

        //console.log(DI._storage);

        this.goodsNode.addEventListener('click', handler);

        this.addProductNode.addEventListener('change', (e:any) => {
            let product = new Product(e.target.value);
            this.addProduct(product.create()).render();
        });

    }
}

Goods.GOODS_SELECTOR = '#goods';
Goods.ADD_PRODUCT_SELECTOR = '#add_product';
Goods.CURRENT_GOODS_SELECTOR = '#goods > .product';