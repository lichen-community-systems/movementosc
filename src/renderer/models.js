export const models = {
    "0": {
        id: "0",
        label: "MoveNet Multi-Pose Lightning",
        model: poseDetection.SupportedModels.MoveNet,
        config: {
            modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
            modelUrl: "models/movenet-tfjs-multipose-lightning-v1/model.json",
            enableSmoothing: true,
            enableTracking: true,
            trackerType: poseDetection.TrackerType.BoundingBox
        }
    },
    "1": {
        id: "1",
        label: "MoveNet Single Pose Thunder (High Accuracy)",
        model: poseDetection.SupportedModels.MoveNet,
        config: {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
            modelUrl: "models/movenet-tfjs-singlepose-thunder-v4/model.json",
            enableSmoothing: true
        }
    },
    "2": {
        id: "2",
        label: "Movenet Single Pose Lightning (Low Latency)",
        model: poseDetection.SupportedModels.MoveNet,
        config: {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
            modelUrl: "models/movenet-tfjs-singlepose-thunder-v4/model.json",
            enableSmoothing: true
        }
    },
    "3": {
        id: "3",
        label: "MediaPipe BlazePose Heavy (High Accuracy)",
        model: poseDetection.SupportedModels.BlazePose,
        config: {
            modelType: "heavy",
            modelUrl: "models/blazepose-3d-tfjs-landmark-heavy-v2",
            runtime: "mediapipe",
            solutionPath: "../../node_modules/@mediapipe/pose"
        }
    },
    "4": {
        id: "4",
        label: "MediaPipe BlazePose Full (Low Latency)",
        model: poseDetection.SupportedModels.BlazePose,
        config: {
            modelType: "full",
            modelUrl: "models/blazepose-3d-tfjs-landmark-full-v2",
            runtime: "mediapipe",
            solutionPath: "../../node_modules/@mediapipe/pose"
        }
    }
};
