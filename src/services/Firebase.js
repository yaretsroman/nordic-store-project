import { initializeApp } from "firebase/app";

export class Firebase {
    constructor() {
        this._app = initializeApp({
            apiKey: import.meta.env.VITE_API_KEY,
            authDomain: "bakery-project-ead25.firebaseapp.com",
            projectId: "bakery-project-ead25",
            storageBucket: "bakery-project-ead25.appspot.com",
            messagingSenderId: "348506583839",
            appId: "1:348506583839:web:2c0b17771a9ecfe1e0b62a"
        })
    }

    get app() {
        return this._app
    }
}

export const firebaseService = new Firebase()

