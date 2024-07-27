export class PoseDetector {
    constructor() {
        this.detector = undefined;
        this.modelType = poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING;
        this.modelUrl = "models/movenet-tfjs-multipose-lightning-v1/model.json";
    }

    async update() {
        this.detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, {
                modelType: this.modelType,
                modelUrl: this.modelUrl,
                enableSmoothing: true,
                enableTracking: true,
                trackerType: poseDetection.TrackerType.BoundingBox
            }
        );
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
