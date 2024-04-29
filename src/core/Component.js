import Handlebars from "handlebars";

export class Component extends HTMLElement {
    constructor() {
        super();
        this.state = {};
        this.props = {};
        this.template = null;
    }

    setState(callback) {
        this.state = callback(this.state);
        this.compile();
    }

    compile() {
        const template = Handlebars.compile(this.template);
        this.innerHTML = "";
        this.innerHTML = template(this.state);
    }

    connectedCallback() {
        this.compile();
        this.componentDidMount();
    }

    disconnectedCallback() {
        this.componentWillUnmount();
    }

    componentDidMount() {}
    componentWillUnmount() {}
}