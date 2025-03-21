const osc = require("osc");

class OSCFormatSender {
    constructor(udpPort)  {
        this.udpPort = udpPort;
    }

    generateAxisMessages(poses) {
        let axisMessages = [];

        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            let x = [];
            let y = [];
            let z = [];

            let posePrefix = `/pose/${i}/`;

            pose.keypoints.forEach((keypoint) => {
                x.push({
                    type: "f",
                    value: keypoint.x
                });

                y.push({
                    type: "f",
                    value: keypoint.y
                });

                z.push({
                    type: "f",
                    value: keypoint.z
                });
            });

            axisMessages.push({
                address: posePrefix + "x",
                args: x
            });

            axisMessages.push({
                address: posePrefix + "y",
                args: y
            });

            axisMessages.push({
                address: posePrefix + "z",
                args: z
            });
        }

        return axisMessages;
    }

    /**
     * Sends pose data as separate messages for each pose and keypoint axis.
     * A given OSC message will contain all 33 keypoints for a single axis of
     * a single pose.
     *
     * Unrecognized keypoints will be supplied as NaN.
     *
     * {
     *     address: "/poses/0/x",
     *     args: [0.0, 0.1, ..., 0.5]
     * }
     *
     * {
     *     address: "/poses/0/y",
     *     args: [0.1, 0.22, ..., 0.25]
     * }
     *
     * {
     *     address: "/poses/0/z",
     *     args: [0.5, 0.48, ..., 0.2]
     * }
     *
     * @param {*} poses the pose data in "native" format sent from the renderer
     * @param {*} ip the IP address to the the OSC bundle to
     * @param {*} port the port to send the OSC bundle on
     */
    sendMessagePerAxisFormat(poses, ip, port) {
        let axisMessages = this.generateAxisMessages(poses);

        for (let i = 0; i < axisMessages.length; i++) {
            let axisMessage = axisMessages[i]
            this.udpPort.send(axisMessage, ip, port)
        }
    }

    /**
     * Sends pose data as a bundle containing separate messages for
     * each pose and keypoint axis.
     * A given OSC message will contain all 33 keypoints for a
     * single axis of a single pose.
     *
     * Unrecognized keypoints will be supplied as NaN.
     *
     * {
     *   timeTag: osc.timeTag(0),
     *   packets: [
     *     {
     *       address: "/poses/0/x",
     *       args: [0.0, 0.1, ..., 0.5]
     *     },
     *     {
     *       address: "/poses/0/y",
     *       args: [0.1, 0.22, ..., 0.25]
     *     },
     *     {
     *       address: "/poses/0/z",
     *       args: [0.5, 0.48, ..., 0.2]
     *     }
     *   ]
     * }
     *
     * @param {*} poses the pose data in "native" format sent from the renderer
     * @param {*} ip the IP address to the the OSC bundle to
     * @param {*} port the port to send the OSC bundle on
     */
    sendBundledMessagePerAxisFormat(poses, ip, port) {
        let axisMessages = this.generateAxisMessages(poses);
        let bundle = {
            timeTag: osc.timeTag(0),
            packets: axisMessages
        };

        this.udpPort.send(bundle, ip, port);
    }

    /**
     * Sends pose data as an OSC bundle containing message packets
     * for each pose. Keypoints are represented as 33 arrays containing
     * x, y, z coodinates.
     *
     * Unrecognized keypoints will be supplied as NaN.
     *
     * {
     *   timeTag: osc.timeTag(0),
     *   packets: [
     *     {
     *       address: "/poses/0",
     *       args: [
     *         [ // nose
     *           {
     *             type: "f",
     *             value: 0.0
     *           },
     *           {
     *             type: "f",
     *             value: 0.1
     *           },
     *           {
     *             type: "f",
     *             value: NaN
     *           }
     *         ],
     *         [ // left eye
     *           {
     *             type: "f",
     *             value: 0.1
     *           },
     *           {
     *             type: "f",
     *             value: 0.22
     *           },
     *           {
     *             type: "f",
     *             value: NaN
     *           }
     *         ],
     *         ...
     *         [ // right foot index
     *           {
     *             type: "f",
     *             value: 0.5
     *           },
     *           {
     *             type: "f",
     *             value: 0.48
     *           },
     *           {
     *             type: "f",
     *             value: NaN
     *           }
     *         ]
     *       ]
     *     }
     *  ]
     *}
     *
     * @param {*} poses the pose data in "native" format sent from the renderer
     * @param {*} ip the IP address to the the OSC bundle to
     * @param {*} port the port to send the OSC bundle on
     */
    sendBundleArrayFormat(poses, ip, port) {
        let oscPoseBundle = {
            timeTag: osc.timeTag(0),
            packets: []
        };

        for (let i = 0; i < poses.length; i++) {
            let posePrefix = `/pose/${i}`;
            let pose = poses[i];
            let oscPose = {
                address: posePrefix,
                args: []
            };

            pose.keypoints.forEach((keypoint) => {
                let oscKeypoint = [
                    {
                        type: "f",
                        value: keypoint.x
                    },
                    {
                        type: "f",
                        value: keypoint.y
                    },
                    {
                        type: "f",
                        value: keypoint.z
                    }
                ];

                oscPose.args.push(oscKeypoint);
            });

            oscPoseBundle.packets.push(oscPose);
        }

        this.udpPort.send(oscPoseBundle, ip, port);
    }
};

module.exports = OSCFormatSender;
