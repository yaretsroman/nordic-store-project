import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';
import { apiService } from '../../services/Api';
import { useToastNotification } from "../../hooks/useToastNotification";

import "../../components/router-link/router-link.component";

// import { store } from "../../store/Store";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from '../../utils/api';
import { TOAST_TYPE } from '../../constants/toast';
import { useNavigate } from '../../hooks/useNavigate';
import { authService } from "../../services/Auth";

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
       {
        label: "My Cart",
        href: ROUTES.singIn,
      },
      ],
      products: [],
      orderCart: [],
      isLoading: false,
      user: null,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

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
              label: "LogOut",
              href: ROUTES.logOut,
            },
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

  // addToCard = (e) => {
  //   if (e.target.closest('.add-to-cart')) {
  //     let price = e.target.previousSibling.previousSibling.dataset.price;
  //     let title = e.target.parentElement.parentElement.dataset.title;``
  //     let img = e.target.parentElement.parentElement.dataset.img;
    
  //     const cartItems = { price, title, img };
  //     apiService.post('/order', cartItems).then(() => {
  //       this.setState({
  //         ...this.state,
  //         orderCart: this.state.orderCart.concat(cartItems),
  //       });
  //     })
  //   }
  // };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setLinks();
    this.getProducts();
    // this.addEventListener("click", this.addToCard);
    
  }

  componentWillUnmount() {
    // this.removeEventListener("click", this.addToCard);
  }
}

customElements.define('home-page', HomePage)