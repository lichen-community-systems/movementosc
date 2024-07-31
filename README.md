# MovementOSC
An application that detects body keypoints using Tensorflow.js' MoveNet models, and sends the data over Open Sound Control (OSC).

Currently, MovementOSC supports the following models:
1. MoveNet Multi-pose Lightning v1 (can detect multiple bodies at once)
2. MoveNet Single-pose Thunder v4 (highest accuracy)
3. MoveNet Single-pose Lightning v4 (lowest latency)
4. BlazePose Heavy (higher accuracy, 33 key points, single pose)
5. BlazePose Full (lower latency accuracy, 33 key points, single pose)

MovementOSC is an Electron-based app that is supported on macOS, Windows, and Linux. It works fully offline.

## Keypoints

The TensorFlow pose detection documentation provides images that show the [correspondence between keypoints and bodies](https://github.com/tensorflow/tfjs-models/tree/cd45df42c8a7605da649789aefb5ae3745f32592/pose-detection#keypoint-diagram).

# Credits
MovementOSC is Copyright 2024 [Kinetic Light](https://kineticlight.org) and [Lichen Community Systems Worker Cooperative Canada](https://lichen.coop), and was created by [Colin Clark](https://colinclark.org).
