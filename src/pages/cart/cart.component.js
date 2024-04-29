import { Component } from "../../core/Component";
import template from "./cart.template.hbs";

export class CartPage extends Component {
    constructor() {
        super();
        this.template = template();
        this.state = {}
    }
}

customElements.define("cart-page", CartPage);
