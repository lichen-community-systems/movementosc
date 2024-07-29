import { Select } from "./select.js";
import { models } from "./models.js";

export class ModelSelector {
    constructor(container) {
        this.container = container;
        this.options = [];
        for (let id in models) {
            this.options.push(models[id]);
        }
        this.selectedModel = models[0];
        this.select = new Select(this.container, this.options, this.selectedModel.id);
    }

    async update() {
        this.render();
    }

    async render() {
        this.select.selection = this.selectedModel;
        this.select.render();
    }
}
