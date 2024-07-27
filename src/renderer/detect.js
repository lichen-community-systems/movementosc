import { ModelSelector } from "./model-selector.js";
import { PoseDetector } from "./pose-detector.js";
import { FPSDisplay } from "./fps-display.js";
import { PoseInfoRenderer } from "./pose-info-render.js";
import { DeviceSelector } from "./device-selector.js";
import { CameraVideo } from "./camera-video.js";
import { VideoPoseRenderer } from "./video-pose-renderer.js";
import { TextField } from "./text-field.js";
import { NumberField } from "./number-field.js";

let modelSelector = new ModelSelector(document.getElementById("modelSelector"));
modelSelector.select.bind((id) => {
    modelSelector.selectedModel = modelSelector.options[id];
    poseDetector.modelType = modelSelector.selectedModel.modelType;
    poseDetector.modelUrl = modelSelector.selectedModel.modelUrl;
    poseDetector.update();
});
await modelSelector.update();

let poseDetector = new PoseDetector();
await poseDetector.ready();

let deviceSelector = new DeviceSelector(
    document.getElementById("deviceSelector"));
await deviceSelector.update();

let cameraVideo = new CameraVideo(document.getElementById("camera"));
deviceSelector.select.bind((id) => {
    cameraVideo.id = id;
    cameraVideo.update();
});
await cameraVideo.ready();

let videoPoseRenderer = new VideoPoseRenderer(
    document.getElementById("points"), cameraVideo.container);
let fpsDisplay = new FPSDisplay(document.getElementById("fps"), 2.5);
let poseInfoRenderer = new PoseInfoRenderer();
let minimumScoreField = new NumberField(document.getElementById("score"), 0.25);
let ipField = new TextField(document.getElementById("ip"), "127.0.0.1");
let portField = new NumberField(document.getElementById("port"), 7500);

async function detectPoses() {
    await cameraVideo.playable();
    const poses = await poseDetector.detect(cameraVideo.container);
    fpsDisplay.render();
    poseInfoRenderer.render(poses);
    videoPoseRenderer.minimumScore = minimumScoreField.value;
    videoPoseRenderer.render(poses);
    osc.send(poses, ipField.value, portField.value);
    requestAnimationFrame(detectPoses);
}

detectPoses();
