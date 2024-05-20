import { Component } from '../../core/Component';
import template from './user-account.template.hbs';
import { ROUTES } from '../../constants/routes';

import "../../components/router-link/router-link.component";

export class userAccount extends Component {
    constructor() {
        super();
        this.template = template({
            routes: ROUTES,
        });

    };
}

customElements.define('user-account', userAccount);