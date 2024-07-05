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
      cart: [],
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
            cart: data,
            user: getUser()
          });
        })
      });
    }
  };

  init = async() => {
    this.toggleIsLoading()
    try {
      const { getUser } = useUserStore();
      const { data } = await apiService.get("/order");
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        user: getUser(),
        cart: result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.toggleIsLoading()
    }
  }

  componentDidMount() {
    this.init();
    this.getProducts();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}



customElements.define("cart-page", CartPage);
