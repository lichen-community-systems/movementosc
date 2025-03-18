#!/usr/bin/env node

const osc = require("osc");
const util = require('node:util');

let udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 7500
});

udpPort.on("osc", (packet) => {
    console.log(util.inspect(packet, {
        depth: 100
    }));
});

udpPort.open();
