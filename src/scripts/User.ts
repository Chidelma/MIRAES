import { _user, _role, _firestore, _cart, _cartItem, _order, _search } from './Models';
import Role from './Role'; 
import { store, uCart, uOrders } from './Init';
import Cart from './Cart';
import Order from './Order';
import { get } from 'svelte/store';

export default class User {

    private name: string;
    private id: string;
    private role: Role;
    private email: string;
    private photoUrl: string;

    private userPrim: any;

    constructor() {

        this.name = '';
        this.id = '';
        this.role = new Role();
        this.email = '';
        this.photoUrl = '';
    }

    setUser(user: _user) {

        this.name = user.displayName;
        this.id = user.id;
        this.email = user.email;
        this.photoUrl = user.photoUrl;

        this.userPrim = user;
    }

    getUserPrim(): _user {
        return this.userPrim;
    }

    async setRole() {

        const info: _firestore = {
            coll: "ROLES",
            id: this.id
        }

        this.role.setRole(await store.getData(info));
    }

    getPhotoUrl(): string {
        return this.photoUrl;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getRole(): Role {
        return this.role
    }

    getEmail(): string {
        return this.email;
    }

    async setCart() {

        const info: _firestore = {
            coll: "CARTS",
            id: this.id
        }

        const cartInfo: _cart = await store.getData(info);

        for(let i = 0; i < cartInfo.items.length; i++)
            get(uCart).push(new Cart(cartInfo.items[i]));
    }

    async setOrders() {

        const search: _search = {
            key: 'user_id',
            value: this.id
        }

        const orders: _order[] = await store.getDocs("ORDERS", search);

        for(let i = 0; i < orders.length; i++) 
            get(uOrders).push(new Order(orders[i]));
    }
}