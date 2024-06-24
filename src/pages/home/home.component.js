import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';
import { apiService } from '../../services/Api';
import { useToastNotification } from "../../hooks/useToastNotification";

import "../../components/router-link/router-link.component";

// import { store } from "../../store/Store";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from '../../utils/api';

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
       products: [],
    };
  }

  setLinks = () => {
      const { getUser } = useUserStore();
      if (getUser()) {
        this.setState({
          links: [
            {
              label: "My Cart",
              href: ROUTES.cart,
            },
            {
              label: "Log Out",
              href: ROUTES.singIn,
            }
          ],
        });
      }
  };

  getProducts = () => {
    
    apiService
      .get("/products")
      .then(({ data }) => {
        this.setState({
          ...this.state,
          products: mapResponseApiData(data),
        });
      })
      
  };

  componentDidMount() {
    this.setLinks();
    this.getProducts();
  }
}

customElements.define('home-page', HomePage)