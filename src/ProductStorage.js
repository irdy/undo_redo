import { $, $$ } from './alias.js';
import { DOM_Interaction } from './DOM_Interaction.js';

export class ProductStorage {
    static REMOVE_SELECTOR: string;
    products: HTMLElement[];
    DI: DOM_Interaction;
    parentNode: HTMLElement;

    constructor(parentNodeSelector: string, productsSelector: string, DI: DOM_Interaction) {

        let handler = (e: Event) => this.removeProduct(e.target);
        handler = handler.bind(this);

        this.products = Array.from(ProductStorage.getCurrentGoods(productsSelector));
        this.DI = DI;
        this.parentNode = $(parentNodeSelector);
        this.parentNode.addEventListener('click', handler);

        DI.save([
            {
                instance: this,
                prop: 'parentNode',
                selector: parentNodeSelector,
                handler
            },
            {
                instance: this,
                prop: 'products',
                selector: productsSelector,
                asArray: true
            }
        ]);

    }

    static getCurrentGoods(selector: string) {
        return $$(selector);
    }

    _removeChildNodes() {
        while (this.parentNode.lastChild) {
            this.parentNode.removeChild(this.parentNode.lastChild);
        }
    }

    addProduct(product: HTMLElement) {
        if (product.nodeType !== 1) {
            throw new Error('product must be a DOM-node');
        }
        this.products.push(product.cloneNode(true));
        return this;
    }

    removeProduct(elem?: HTMLElement) {
        if (elem && elem.nodeType === 1 && elem.classList.contains(ProductStorage.REMOVE_SELECTOR)) {
            this.products = this.products.filter(node => node !== elem.parentElement);
            this.render();
        }
        return this;
    }

    clear() {
        this.products = [];
        return this;
    }

    getProducts() {
        return this.products;
    }

    createFragment() {
        let fragment = document.createDocumentFragment();

        if (this.products.length === 0) {
            this.reload();
        } else {
            this.products.forEach(node => {
                fragment.appendChild(node);
            });
        }

        return fragment;
    }

    reload() {
        this.parentNode.parentNode.replaceChild(this.parentNode, this.parentNode);
    }

    render() {
        this._removeChildNodes();
        this.parentNode.appendChild(this.createFragment());
    }
}

ProductStorage.REMOVE_SELECTOR = 'remove-product';