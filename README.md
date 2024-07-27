# MovementOSC
An application that detects body keypoints using Tensorflow.js' MoveNet models, and sends the data over Open Sound Control (OSC).

Currently, MovementOSC supports the following models:
1. Multi-pose MoveNet Lightning v1 (can detect multiple bodies at once)
2. Single-pose MoveNet Thunder v4 (highest accuracy)
3. Single-pose MoveNet Lightning v4 (lowest latency)

MovementOSC is an Electron-based app that is supported on macOS, Windows, and Linux. It works fully offline.

# Credits
MovementOSC is Copyright 2024 [Kinetic Light](https://kineticlight.org) and [Lichen Community Systems Worker Cooperative Canada](https://lichen.coop), and was created by [Colin Clark](https://colinclark.org).
