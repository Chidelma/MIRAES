import firebase from 'firebase';
import Auth from './Auth';
import Firestore from './Firestore';
import Storage from './Storage';
import { _firebase, _item, _order, _user } from './Models';
import Item from './Item';
import Order from './Order';
import User from './User';
import Cart from './Cart';
import { writable } from 'svelte/store';

const config: _firebase = {
    apiKey: "AIzaSyDRJbMO8p_kOJY6AH6VPRdMQYe1xjwo3zg",
    authDomain: "merkfabz.firebaseapp.com",
    databaseURL: "https://merkfabz.firebaseio.com",
    projectId: "merkfabz",
    storageBucket: "merkfabz.appspot.com",
    messagingSenderId: "653880877265",
    appId: "1:653880877265:web:90a623a4b5707fa203e5f0",
    measurementId: "G-NTVWNWY41C"
};

const app = firebase.initializeApp(config);

export const router = writable('/');

export const store = new Firestore(app.firestore());
export const auth = writable(new Auth(app.auth()));
export const storage = new Storage(app.storage());

export const total = writable(0);
export const tax = writable(0);
export const gross = writable(0);

const allProducts: Item[] = [];
const allFilters: Item[] = [];
const allOrders: Order[] = [];
const allUsers: User[] = [];

const userCart: Cart[] = [];
const userOrders: Order[] = [];

export const products = writable(allProducts);
export const filtered = writable(allFilters);

export const orders = writable(allOrders);
export const users = writable(allUsers);

export const uCart = writable(userCart);
export const uOrders = writable(userOrders);

export const panel = writable(-1);
export const modProduct = writable(allProducts[-1]);

async function setAllDocs() {

	const dbItems: _item[] = await store.getAllDocs("ITEMS");
	const dbOrders: _order[] = await store.getAllDocs("ORDERS");

	for(let i = 0; i < dbItems.length; i++)
        allProducts.push(new Item(dbItems[i]));

	for(let i = 0; i < dbOrders.length; i++)
        allOrders.push(new Order(dbOrders[i]));
    
    products.set(allProducts);
    orders.set(allOrders);
}

export async function setAllUsers() {

    const dbUsers: _user[] = await store.getAllDocs("USERS");

    for(let i = 0; i < dbUsers.length; i++) {

        const currUser: User = new User();

        currUser.setUser(dbUsers[i]);

        currUser.setRole();

        allUsers.push(currUser);
    }

    users.set(allUsers);
}

setTimeout(async () => {
    await setAllDocs();
}, 100);