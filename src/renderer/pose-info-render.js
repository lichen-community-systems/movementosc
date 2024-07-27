export class PoseInfoRenderer {
    constructor() {
        this.posesElement = document.getElementById("poses");
        this.posesStrings = ["person", "people"];
        this.posesStringElement =
            document.getElementById("posesString");
    }

    render(poses) {
        let numPoses = poses.length;
        this.posesElement.innerHTML = numPoses;
        this.posesStringElement.innerHTML = numPoses === 1 ?
            this.posesStrings[0] : this.posesStrings[1]

    }
}
