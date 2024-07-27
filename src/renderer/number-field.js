export class NumberField {
    constructor(container, value) {
        this.value = value !== null && value !== undefined ? value : 0;
        this.container = container;
        this.container.onchange = this.update.bind(this);
        this.container.value = this.value;
    }

    update() {
        this.value = Number(this.container.value);
        return this.value;
    }
}
