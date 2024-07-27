export class Select {
    constructor(container, options, defaultSelectedIdx) {
        this.container = container;
        this.options = options;
        this.selection = options.length > 0 ?
            this.options[defaultSelectedIdx].id : undefined
    }

    bind(onChange) {
        this.container.onchange = (event) => {
            this.selection = event.target.value;
            onChange(this.selection, this);
        };
    }

    render() {
        let optionsHTML = "";
        this.options.forEach((option) => {
            optionsHTML += `<option value=${option.id}>${option.label}</option>`;
        });
        this.container.innerHTML = optionsHTML;
    }
}
