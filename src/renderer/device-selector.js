import { Select } from "./select.js";

export class DeviceSelector {
    constructor(container) {
        this.select = new Select(container, [], undefined);
        this.devices = [];
        this.selectedDevice = undefined;
        this.container = container;
    }

    async update() {
        let devices =
            await navigator.mediaDevices.enumerateDevices();

        devices.forEach((device) => {
            if (device.kind === "videoinput") {
                this.devices.push({
                    id: device.deviceId,
                    label: device.label
                });
            }
        });

        this.select.options = this.devices;
        this.render();
    }

    async render() {
        this.select.render();
    }
}
