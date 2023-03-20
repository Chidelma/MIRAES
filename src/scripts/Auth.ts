import firebase from 'firebase/app';
import 'firebase/auth';
import { _cart, _cartItem, _firestore, _item, _order, _role, _search, _user } from './Models';
import User from './User';

export default class Auth {

    private client: firebase.auth.Auth;

    private user: User;
    private verified: boolean;

    constructor(auth: firebase.auth.Auth) {

        this.client = auth;

        this.user = new User();
        this.verified = false;
    }

    async signUp(email: string, password: string): Promise<boolean> {

        let added = false;

        try {

            await this.client.createUserWithEmailAndPassword(email, password);

            await this.setUser(false);

            added = true;

        } catch(err) {
            console.log(err.code, err.message);
        }

        return added;
    }

    viewCurrUser() {
        return this.client.currentUser;
    }

    isAuth(): boolean {
        
        let auth = false;

        if(this.client.currentUser) {
            auth = true;
        }

        return auth;
    }

    isVerified(): boolean {
        return this.verified;
    }

    async signIn(email: string, password: string): Promise<boolean> {

        let exist = false;

        try {

            await this.client.signInWithEmailAndPassword(email, password);

            await this.setUser(true);

            exist = true;

        } catch(err) {
            console.log(err.code, err.message);
        }

        return exist;
    }


    async updateProfile(displayName: string, photoURL: string): Promise<boolean> {

        let changed = false;

        if(this.client.currentUser) {

            try {

                await this.client.currentUser.updateProfile({ displayName, photoURL });
    
                changed = true;
    
            } catch(err) {
                console.log(err.code, err.message);
            }
        }

        return changed;
    }

    async updateEmail(email: string): Promise<boolean> {

        let updated = false;

        if(this.client.currentUser) {

            try {

                await this.client.currentUser.updateEmail(email);
    
                updated = true;
    
            } catch(err) {
                console.log(err.code, err.message);
            }
        }

        return updated;
    }

    async sendEmailVerification(): Promise<boolean> {

        let sent = false;

        if(this.client.currentUser) {

            try {

                await this.client.currentUser.sendEmailVerification();
    
                sent = true;
    
            } catch(err) {
                console.log(err.code, err.message);
            }
        }

        return sent;
    }

    async updatePassword(newPassword: string): Promise<boolean> {

        let updated = false;

        if(this.client.currentUser) {

            try {

                await this.client.currentUser.updatePassword(newPassword);
    
                updated = true;
    
            } catch(err) {
                console.log(err.code, err.message);
            }
        }

        return updated;
    }

    async sendResetPasswordEmail(email: string): Promise<boolean> {

        let sent = false;

        try {

            await this.client.sendPasswordResetEmail(email);

            sent = true;

        } catch(err) {
            console.log(err.code, err.message);
        }

        return sent;
    }

    async deleteUser(): Promise<boolean> {

        let deleted = false;

        if(this.client.currentUser) {

            try {

                await this.client.currentUser.delete();
    
                deleted = true;
    
            } catch(err) {
                console.log(err.code, err.message);
            }
        }

        return deleted;
    }

    async signOut(): Promise<boolean> {

        let signedOut = false;

        try {

            await this.client.signOut();

            this.unsetUser();

            signedOut = true;

        } catch(err) {
            console.log(err.code, err.message);
        }

        return signedOut;
    }

    async setUser(login: boolean) {

        if(this.client.currentUser) {

            const currUser: any = {};

            currUser.id = this.client.currentUser.uid;

            if(this.client.currentUser.displayName) 
                currUser.displayName = this.client.currentUser.displayName;

            if(this.client.currentUser.email)
                currUser.email = this.client.currentUser.email;

            if(this.client.currentUser.photoURL)
                currUser.photoUrl = this.client.currentUser.photoURL;

            this.verified = this.client.currentUser.emailVerified;

            const user: _user = currUser;

            this.user = new User();

            this.user.setUser(user);

            if(login) {
                await this.user.setRole();
                await this.user.setCart();
                await this.user.setOrders();
            }
        }
    }

    getUser(): User {
        return this.user;
    }

    unsetUser() {
        if(!this.client.currentUser) {
            this.user = new User();
        }
    }
}