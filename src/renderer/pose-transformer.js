const NOT_RECOGNIZED = NaN;

export class PoseTransformer {
    constructor(video) {
        this.video = video;
        this.update();
    }

    update() {
        this.h = this.video.offsetHeight;
        this.w = this.video.offsetWidth;
    }

    transform(poses, minimumScore) {
        // TODO: Reorder keypoints.
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            for (let j = 0; j < pose.keypoints.length; j++) {
                let keypoint = pose.keypoints[j];
                if (keypoint.score < minimumScore) {
                    keypoint.x = NOT_RECOGNIZED;
                    keypoint.y = NOT_RECOGNIZED;
                    keypoint.z = NOT_RECOGNIZED;
                } else {
                    keypoint.x = keypoint.x / this.w;
                    keypoint.y = keypoint.y / this.h;
                    keypoint.z = keypoint.z !== undefined ?
                        (keypoint.z / this.w) : NOT_RECOGNIZED;
                }
            }
        }

        return poses;
    }
};
