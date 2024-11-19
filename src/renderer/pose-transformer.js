const KEYPOINT_NOT_RECOGNIZED = NaN;
const NUM_NORMALIZED_KEYPOINTS = 33;

const KEYPOINT_FORMAT = {
    COCO: 0,
    BLAZEPOSE: 1,
    UNKNOWN: -1
};

const KEYPOINT_NAMES = [
    "nose",
    "left_eye",
    "right_eye",
    "left_ear",
    "right_ear",
    "left_shoulder",
    "right_shoulder",
    "left_elbow",
    "right_elbow",
    "left_wrist",
    "right_wrist",
    "left_hip",
    "right_hip",
    "left_knee",
    "right_knee",
    "left_ankle",
    "right_ankle",
    "left_eye_inner",
    "left_eye_outer",
    "right_eye_inner",
    "right_eye_outer",
    "mouth_left",
    "mouth_right",
    "left_pinky",
    "right_pinky",
    "left_index",
    "right_index",
    "left_thumb",
    "right_thumb",
    "left_heel",
    "right_heel",
    "left_foot_index",
    "right_foot_index"
];

const NORMALIZED_TO_BLAZEPOSE = [
    0, 2, 5, 7, 8, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28,
    1, 3, 4, 6, 9, 10, 17, 18, 19, 20, 21, 22, 29, 30, 31, 32
];

function detectKeypointFormat(poses) {
    // TODO: Provide explicit metadata about how to map
    // keypoints for each model.
    if (poses.length < 1) {
        return KEYPOINT_FORMAT.UNKNOWN;
    }

    switch (poses[0].keypoints.length) {
        case 17:
            return KEYPOINT_FORMAT.COCO;
        case 33:
            return KEYPOINT_FORMAT.BLAZEPOSE;
        default:
            return KEYPOINT_FORMAT.UNKNOWN;
    }
}

function expandCOCOKeypoints(keypoints) {
    for (let i = 17; i < NUM_NORMALIZED_KEYPOINTS; i++) {
        keypoints[i] = {
            name: KEYPOINT_NAMES[i],
            score: 0.0,
            x: KEYPOINT_NOT_RECOGNIZED,
            y: KEYPOINT_NOT_RECOGNIZED,
            z: KEYPOINT_NOT_RECOGNIZED
        }
    }

    return keypoints;
}

function rearrangeBlazePoseKeypoints(keypoints) {
    let rearranged = [];

    for (let i = 0; i < NUM_NORMALIZED_KEYPOINTS; i++) {
        let blazePoseIdx = NORMALIZED_TO_BLAZEPOSE[i];
        rearranged.push(keypoints[blazePoseIdx]);
    }

    return rearranged;
}

function normalizePoseKeypoints(pose, format) {
    let keypoints = pose.keypoints;

    if (format === KEYPOINT_FORMAT.COCO) {
        pose.keypoints = expandCOCOKeypoints(keypoints);
    } else if (format === KEYPOINT_FORMAT.BLAZEPOSE) {
        pose.keypoints = rearrangeBlazePoseKeypoints(keypoints);
    }
}

function filterKeypoint(keypoint, minimumScore) {
    if (keypoint.score < minimumScore) {
        keypoint.x = KEYPOINT_NOT_RECOGNIZED;
        keypoint.y = KEYPOINT_NOT_RECOGNIZED;
        keypoint.z = KEYPOINT_NOT_RECOGNIZED;
    }
}

function normalizeKeypointValues(keypoint, w, h) {
    keypoint.x = keypoint.x / w;
    keypoint.y = keypoint.y / h;
    keypoint.z = keypoint.z !== undefined ?
        (keypoint.z / w) : KEYPOINT_NOT_RECOGNIZED;
}

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
        let format = detectKeypointFormat(poses);
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            normalizePoseKeypoints(pose, format);

            for (let j = 0; j < pose.keypoints.length; j++) {
                let keypoint = pose.keypoints[j];
                normalizeKeypointValues(keypoint, this.w, this.h);
                filterKeypoint(keypoint, minimumScore);
            }
        }

        return poses;
    }
};
