import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./cart.template.hbs";
import { apiService } from "../../services/Api";

export class CartPage extends Component {
    constructor() {
        super();
        this.template = template({
            routes: ROUTES,
        });
        
    }

    onClick = () => {}

    componentDidMount() {
        this.addEventListener("click", this.onClick)
    }

    componentWillUnmount() {
        this.removeEventListener("click", this.onClick)
    }
}

customElements.define("cart-page", CartPage);
