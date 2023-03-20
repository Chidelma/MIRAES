import { _order } from './Models';
import Cart from './Cart';

export default class Order {

    private id: string;
    private date: string;
    private name: string;
    private email: string;

    private address: string;
    private city: string;
    private province: string;
    private country: string;
    private postal: string;

    private status: string;
    private trackingId: string | null;
    private items: Cart[];

    private orderPrim: _order;

    constructor(order: _order) {

        this.id = order.id;
        this.date = order.date;
        this.name = order.name;
        this.email = order.email;

        this.address = order.address;
        this.city = order.city;
        this.province = order.province;
        this.country = order.country;
        this.postal = order.postal;

        this.status = order.status;
        this.trackingId = order.trackingId;

        this.items = [];

        for(let i = 0; i < order.items.length; i++) 
            this.items.push(new Cart(order.items[i]));

        this.orderPrim = order;
    }

    getOrderPrim(): _order {
        return this.orderPrim;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getDate(): string {
        return this.date;
    }

    getAddress(): string {
        return this.address;
    }

    getCity(): string {
        return this.city;
    }

    getProvince(): string {
        return this.province;
    }

    getCountry(): string {
        return this.country
    }

    getPostal(): string {
        return this.postal;
    }
    
    getStatus(): string {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status;
        this.orderPrim.status = status;
    }

    getTrackingId(): string | null {
        return this.trackingId;
    }

    setTrackingId(trackingId: string) {
        this.trackingId = trackingId;
        this.orderPrim.trackingId = trackingId;
    }

    getItems(): Cart[] {
        return this.items;
    }

    setItems(items: Cart[]) {
        this.items = items;
    }
}