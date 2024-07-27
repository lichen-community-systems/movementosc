export class TextField {
    constructor(container, value) {
        this.value = value !== null && value !== undefined ? value :
            container.value;
        this.container = container;
        this.container.onchange = this.update.bind(this);
        this.container.value = this.value;
    }

    update() {
        this.value = this.container.value;
        return this.value;
    }
}
