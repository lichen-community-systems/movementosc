import { Select } from "./select.js";

const models = {
    "0": {
        id: "0",
        label: "Movenet Multi Pose Lightning",
        modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
        modelUrl: "models/movenet-tfjs-multipose-lightning-v1/model.json"
    },
    "1": {
        id: "1",
        label: "Movenet Single Pose Thunder",
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        modelUrl: "models/movenet-tfjs-singlepose-thunder-v4/model.json"
    },
    "2": {
        id: "2",
        label: "Movenet Single Pose Lightning",
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        modelUrl: "models/movenet-tfjs-singlepose-thunder-v4/model.json"
    }
};

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
