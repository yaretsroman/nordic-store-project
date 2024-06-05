import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';

import "../../components/router-link/router-link.component";

import { store } from "../../store/Store";

export class HomePage extends Component {
    constructor() {
        super();
        this.template = template({
            routes: ROUTES,
        });
    }

    subscribe = ({ detail }) => {
        console.log(detail.state);
    }

    componentDidMount() {
        store.subscribe(this.subscribe)
    }

    componentWillUnmount() {
        store.unSubscribe(this.subscribe)
    }
}

customElements.define('home-page', HomePage)