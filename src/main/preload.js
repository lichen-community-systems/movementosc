const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("osc", {
    send: (poses, minimumScore, ip, port) => ipcRenderer.invoke(
        "send", poses, minimumScore, ip, port)
});
