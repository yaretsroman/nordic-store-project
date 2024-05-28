import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';

import "../../components/router-link/router-link.component";
import { store } from "../../store/Store";

export class HomePage extends Component {
    constructor() {
        super();
        this.template = template();
        this.state = {
            links: [
                {
                    icon: this.icon,
                    href: ROUTES.singIn,
                },
                {
                    icon: this.icon,
                    href: ROUTES.cart,
                }
            ]
        }
    }

    subscribe = ({ detail }) => {
        console.log(detail.state);
        // if(detail.state.user) {
        //     this.setState({
        //         links: [
        //             {
                        
        //                 href: ROUTES.account,
        //             },
        //             {
                        
        //                 href: ROUTES.cart,
        //             }
        //         ]
        //     })
        // }
    }

    componentDidMount() {
        store.subscribe(this.subscribe)
    }

    componentWillUnmount() {
        store.unSubscribe(this.subscribe)
    }
}

customElements.define('home-page', HomePage)