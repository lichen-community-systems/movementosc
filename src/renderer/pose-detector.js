import {models} from "./models.js";

export class PoseDetector {
    constructor() {
        this.detector = undefined;
        this.model = models[0].model;
        this.config = models[0].config;
    }

    async update() {
        this.detector = await poseDetection.createDetector(this.model,
            this.config);
    }

    async ready() {
        await tf.ready();
        await this.update();
    }

    async detect(video) {
        const poses = await this.detector.estimatePoses(video);
        return poses;
    }
}
