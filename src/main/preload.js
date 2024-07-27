const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("osc", {
    send: (poses, ip, port) => ipcRenderer.invoke("send", poses, ip, port)
});
