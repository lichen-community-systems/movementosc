export class EMA {
    constructor(initialState) {
        this.state = initialState !== undefined &&
            initialState !== null ? initialState : 0.0;
        this.alpha = 0.1;
    }

    value(value) {
        let avg = (this.alpha * value) + (1.0 - this.alpha) *
            this.state;
        this.state = avg;

        return avg;
    }
}
