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
          ],
        });
      }
  };

  logout = () => {
    this.toggleIsLoading()
    const { setUser } = useUserStore();
    authService
    .logOut()
    .then(() => {
      setUser(null);
      useToastNotification({ type: TOAST_TYPE.success, message: 'Success!' });
      useNavigate(ROUTES.home);
      
    })
    .catch((message) => {
      useToastNotification({ message });
    })
    .finally(() => {
      this.toggleIsLoading();
    });
  } 

  onClick = ({ target }) => {
    if (target.closest(".logout-btn")) {
      this.logout();
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
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define('home-page', HomePage)