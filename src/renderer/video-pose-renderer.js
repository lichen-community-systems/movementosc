export class VideoPoseRenderer {
    constructor(container, video) {
        this.container = container;
        this.video = video;
        this.pointColor = "yellow";
        this.outlineColor = "white";
        this.pointSize = 7;
        this.ctx = this.container.getContext("2d");
        this.update();
    }

    update() {
        this.h = this.video.offsetHeight;
        this.w = this.video.offsetWidth;
        this.container.setAttribute("height", this.h);
        this.container.setAttribute("width", this.w);
        this.ctx.fillStyle = this.pointColor;
        this.ctx.strokeStyle = this.outlineColor;
    }

    // TODO: Add some lowpass filtering on the box outline.
    drawBox(pose) {
        if (!pose.box) {
            return;
        }

        let boxX = pose.box.xMin * this.w;
        let boxW = (pose.box.xMax * this.w) - boxX;
        let boxY = pose.box.yMin * this.h;
        let boxH = (pose.box.yMax * this.h) - boxY;

        this.ctx.strokeRect(boxX, boxY, boxW, boxH);
    }

    render(poses, minimumScore) {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.drawImage(this.video, 0, 0, this.w, this.h);

        for (let pose of poses) {
            this.drawBox(pose);

            for (let keypoint of pose.keypoints) {
                if (keypoint.score > minimumScore) {
                    this.ctx.fillRect(keypoint.x, keypoint.y,
                        7, 7);
                }
            }
        }
    }
}
