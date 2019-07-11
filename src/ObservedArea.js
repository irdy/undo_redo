import { $ } from "./alias.js";

const STATE = 'state';
const { localStorage } = window;

export class ObservedArea {
    constructor() {
        this.el = $('#observed_area');
        this._initHandlers();
    }

    _initHandlers() {
        window.onunload = e => {
            e.preventDefault();
            this.saveStateBeforeExit();
        };
    }

    getHtml() {
        return this.el.innerHTML;
    }

    render(state: string) {
        this.el.innerHTML = state;
    }

    saveStateBeforeExit() {
        localStorage.setItem(STATE, this.getHtml());
    }
}

ObservedArea.OBSERVED_AREA_SELECTOR = '#observed_area';