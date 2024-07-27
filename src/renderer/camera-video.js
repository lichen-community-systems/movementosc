export class CameraVideo {
    constructor(container, id) {
        this.id = id;
        this.container = container;
    }

    async update() {
        let constraints = {
            video: this.id === null || this.id == undefined ? true : {
                deviceId: this.id
            }
        };

        let mediaStream = await navigator.mediaDevices.getUserMedia(
            constraints);

        this.container.srcObject = mediaStream;
        await this.container.play();

        return this.container;
    }

    async ready() {
        return await this.update();
    }

    async playable() {
        return await this.container.play();
    }
}
