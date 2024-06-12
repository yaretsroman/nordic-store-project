import { initializeApp } from "firebase/app";

export class Firebase {
    constructor() {
        this._app = initializeApp({
            apiKey: "AIzaSyD-n7LiSoL_qAMbWj8DAV3ARKQUxws-8Qg",
            authDomain: "nordic-store-project.firebaseapp.com",
            projectId: "nordic-store-project",
            storageBucket: "nordic-store-project.appspot.com",
            messagingSenderId: "648791182424",
            appId: "1:648791182424:web:407a694070bdd617334e2d"
        })
    }

    get app() {
        return this._app
    }
}

export const firebaseService = new Firebase()

