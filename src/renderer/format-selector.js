import { Select } from "./select.js";

const OSC_FORMATS = [
    {
        id: "bundled-message-per-axis",
        label: "Bundled Message Per Axis"
    },
    {
        id: "message-per-axis",
        label: "Message Per Axis"
    },
    {
        id: "bundled-xyz-array",
        label: "Bundled xyz Array"
    },
];

export class FormatSelector {
    constructor(container, osc) {
        if (!container) {
            console.error("FormatSelector: No container was specified.");
        }
        this.select = new Select(container, [], "bundled-message-per-axis");
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
