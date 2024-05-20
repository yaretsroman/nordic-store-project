import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
import { TOAST_TYPE } from "../../constants/toast";
import { useToastNotification } from "../../hooks/useToastNotification";

export class SignUp extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES });
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

  registerUser = (evt) => {
    evt.preventDefault();
    const { email, password, ...rest } = extractFormData(evt.target);
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .signUp(email, password)
      .then(() => {
        authService.updateUserProfile(rest).then(() => {
          setUser({ ...authService.getCurrentUser() });
          useToastNotification({
            message: "Success!!!",
            type: TOAST_TYPE.success,
          });
          useNavigate(ROUTES.account);
        });
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }

}

customElements.define("sign-up-page", SignUp);
