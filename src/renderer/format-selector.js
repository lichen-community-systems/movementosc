import { Select } from "./select.js";

const OSC_FORMATS = [
    {
        id: "bundle",
        label: "Atomic Bundle Format"
    },
    {
        id: "message-per-axis",
        label: "Message Per Axis"
    }
];

export class FormatSelector {
    constructor(container, osc) {
        if (!container) {
            console.error("FormatSelector: No container was specified.");
        }
        this.select = new Select(container, [], "sendBundleFormat");
        this.formats = [...OSC_FORMATS];
        this.container = container;

        this.bindFormatUpdate(osc);
        this.update();
    }

    bindFormatUpdate(osc) {
        let that = this;
        this.select.bind(function () {
            osc.updateFormat(that.select.selection);
        });
    };

    async update() {
        this.select.options = this.formats;
        this.render();
    }

    async render() {
        this.select.render();
    }
}
