import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNotification";
// import { useUserStore } from "./hooks/useUserStore";

import './core/Router';

import './pages/home/home.component';
import './pages/cart/cart.component';
import './pages/sign-in/sign-in.component';
import './pages/sign-up/sign-up.component';
import './pages/user-account/user-account.component';
import './pages/not-found/not-found.component';

import "./components/toast/toast.components";
import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";
import { store } from "./store/Store";

export class App extends Component {
    constructor() {
        super();
        this.template = template({
            routes: ROUTES,
        });
        this.state = {
            isLoading: false,
        };
    }

    toggleIsLoading = () => {
        this.setState({
          ...this.state,
          isLoading: !this.state.isLoading,
        });
    };

    initializeApp() {
        this.toggleIsLoading();
        // const { setUser } = useUserStore();
        authService
        .authorizeUser()
      .then((user) => {
        store.setState({ user })
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
    }

    componentDidMount() {
        this.initializeApp()
    }
}

customElements.define("my-app", App);
