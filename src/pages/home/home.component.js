import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';

import "../../components/router-link/router-link.component";

// import { store } from "../../store/Store";
import { useUserStore } from "../../hooks/useUserStore";

export class HomePage extends Component {
    constructor() {
        super();
        this.template = template();
        this.state = {
            links: [
              {
                label: "Sign In",
                href: ROUTES.singIn,
              },
            ],
          };
    }

    setLinks = () => {
        const { getUser } = useUserStore();
        if (getUser()) {
          this.setState({
            links: [
              {
                label: "Cart",
                href: ROUTES.cart,
              },
            ],
          });
        }
    };

    componentDidMount() {
        this.setLinks();
    }
}

customElements.define('home-page', HomePage)