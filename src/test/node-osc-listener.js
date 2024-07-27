const osc = require("osc");

let udpPort = new osc.UDPPort({localPort: 7500});
udpPort.on("message", (msg) => {console.log(msg)});
udpPort.open();
