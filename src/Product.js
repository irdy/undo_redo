export class Product {
    bgColor: string;

    constructor(bgColor: string = '#0f0') {
        this.bgColor = bgColor;
    }

    create(): HTMLDivElement {
        let html: string = `
            <div class="product" style="background: ${this.bgColor}">
                <div class="remove-product"></div>
            </div>
        `;

        html = html.trim();

        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }
}