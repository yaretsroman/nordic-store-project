import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./cart.template.hbs";
import { apiService } from '../../services/Api';
import { mapResponseApiData } from '../../utils/api';
import { useUserStore } from "../../hooks/useUserStore";

export class CartPage extends Component {
  constructor() {
    super();
    this.template = template({
        routes: ROUTES,
    });
    
    this.state = {
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

  getProducts = () => {
    apiService
    .get("/order")
    .then(({ data }) => {
      this.setState({
        ...this.state,
        products: mapResponseApiData(data),
      });
    })
  };

  onClick = ({ target }) => {
    const { getUser } = useUserStore()
    if (target.closest(".clear")) {
      this.toggleIsLoading()
      apiService.delete("/order").then(() => {
        apiService.get("/order").then(({ data }) => {
          this.setState({
            ...this.state,
            
            user: getUser()
          });
        })
      });
    }
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.getProducts();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}



customElements.define("cart-page", CartPage);
