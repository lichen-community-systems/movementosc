const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const osc = require("osc");
const OSCFormatSender = require("./main/osc-format-sender.js");

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
    let format = "bundle";

    createWindow();
    let formatSender = new OSCFormatSender(udpPort);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    ipcMain.handle("updateFormat", async (event, formatID) => {
        format = formatID;
    });

    ipcMain.handle("send", async (event, poses, ip, port) => {
        if (format === "message-per-axis") {
            formatSender.sendMessagePerAxisFormat(poses, ip,
                port);
        } else {
            formatSender.sendBundleFormat(poses, ip, port);
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
