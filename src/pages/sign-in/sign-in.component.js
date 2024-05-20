import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/Auth";
import { extractFormData } from "../../utils/extractFormData";
import { useNavigate } from "../../hooks/useNavigate";


export class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      errors: {
        email: "",
      },
      isLoading: false,
    };

    this.template = template({
      routes: ROUTES
    });
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  signInUser = (evt) => {
    evt.preventDefault();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .signIn(formData.email, formData.password)
      .then(() => {
        useNavigate(ROUTES.account);
        // authService.updateUserProfile(rest).then(() => {
        //   setUser({ ...authService.getCurrentUser() });
        //   useToastNotification({
        //     message: "Success!!!",
        //     type: TOAST_TYPE.success,
        //   });
          
        // });
      })
      // .catch((error) => {
      //   useToastNotification({ message: error.message });
      // })
  };

  componentDidMount() {
    this.addEventListener("submit", this.signInUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.signInUser);
  }

}

customElements.define("sign-in-page", SignIn);
