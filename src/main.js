const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const osc = require("osc");

const NOT_RECOGNIZED = NaN;

let udpPort = new osc.UDPPort({
    remotePort: 57122,
    metadata: true
});

// TODO: Notify the renderer when an error occurs so that
// something can be shown to the user.
udpPort.on("error", (e) => {
    console.log("Error sending OSC message. " + e);
});

udpPort.open();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "main/preload.js")
        }
    });

    win.setBackgroundColor("#000000");
    win.loadFile("src/renderer/index.html");
    win.maximize();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    ipcMain.handle("send", async (event, poses, minimumScore, ip, port) => {
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            let x = [];
            let y = [];
            let z = [];

            let posePrefix = `/pose/${i}/`;

            pose.keypoints.forEach((keypoint) => {
                let xVal = keypoint.x;
                let yVal = keypoint.y;
                let zVal = keypoint.z !== undefined ?
                    keypoint.z : NOT_RECOGNIZED; // Not all models provide z.

                if (keypoint.score < minimumScore) {
                    xVal = NOT_RECOGNIZED;
                    yVal = NOT_RECOGNIZED;
                    zVal = NOT_RECOGNIZED;
                }

                x.push({
                    type: "f",
                    value: xVal
                });

                y.push({
                    type: "f",
                    value: yVal
                });

                z.push({
                    type: "f",
                    value: zVal
                });
            });

            udpPort.send({
                address: posePrefix + "x",
                args: x
            }, ip, port);

            udpPort.send({
                address: posePrefix + "y",
                args: y
            }, ip, port);

            udpPort.send({
                address: posePrefix + "z",
                args: z
            }, ip, port);
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
