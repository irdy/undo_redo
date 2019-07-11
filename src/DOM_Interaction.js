// @flow
import { $$ } from './alias.js';

interface IRepresentation {
    instance: any,
    prop: string,
    selector: string,
    evType?: string,
    handler?: () => mixed,
    handlerConfig?: Object,
    asArray: boolean
}

export class DOM_Interaction {

    _storage: IRepresentation[];

    constructor() {
        this._storage = [];
    }

    save(r: IRepresentation | IRepresentation[]) {
        this._storage = this._storage.concat(r);
    }

    restore() {
        this._storage.forEach(r => {
            let nodes = $$(r.selector);
            let { instance, prop } = r;

            if (nodes.length === 1) {
                instance[prop] = r.asArray === true ? [nodes[0]] : nodes[0];
            } else if (nodes.length === 0 || nodes.length > 1) {
                instance[prop] = r.asArray === true ? Array.from(nodes) : nodes;
            } else {
                throw new Error('unexpected case!');
            }

            if (r.handler) {
                nodes.forEach(node => {
                    node.addEventListener(
                        r.evType ? r.evType : 'click',
                        r.handler,
                        r.handlerConfig ? r.handlerConfig : false
                    );
                })
            }
        })
    }
}