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

    ipcMain.handle("send", async (event, poses, ip, port) => {
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
