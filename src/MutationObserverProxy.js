function defaultObserve(mutation) {
    console.log(mutation);
}

export class MutationObserverProxy {
    /**
     * @constructor
     * @param target - observed object
     * @param config - MutationObserver's config
     * @param callback - функция, которая будет вызвана после каждой мутации, принимает в качестве параметра
     * экземпляр MutationRecord
     * @returns MutationObserver
     */
    constructor(target, config = {}, callback = defaultObserve) {

        this.target = target;
        this.config = config;

        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(callback);
        });

        if (target && target.nodeType === 1) {
            this.enable();
        }
    }

    enable() {
        this.observer.observe(this.target, this.config);
    }

    disable() {
        this.observer.disconnect();
    }

    getMutationObserver() {
        return this.observer;
    }
}
