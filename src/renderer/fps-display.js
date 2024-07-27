import {EMA} from "./ema.js";

export class FPSDisplay {
    constructor(container, refreshRate) {
        this.ema = new EMA();
        this.container = container;
        this.then = performance.now();
        this.lastRefreshTime = this.then;
        this.refreshRate = 1000 / refreshRate;
    }

    render() {
        let now = performance.now();
        let refreshDelta = now - this.lastRefreshTime;
        let frameDelta = this.ema.value(now - this.then);
        if (refreshDelta > this.refreshRate) {
            let fps = (1000 / frameDelta)|0;
            this.container.innerHTML = fps;
            this.lastRefreshTime = now;
        }

        this.then = now;
    }
}
