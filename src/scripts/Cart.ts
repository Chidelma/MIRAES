import Item from './Item';
import { _cart, _cartItem, _item } from './Models';

export default class Cart {

    private item: Item;
    private quantity: number;
    private cartPrim: _cartItem;

    constructor(cartItem: _cartItem) {

        this.item = new Item(cartItem.item);
        this.quantity = cartItem.quantity;
        this.cartPrim = cartItem
    }

    getCartPrim(): _cartItem {
        return this.cartPrim;
    }

    getItem(): Item {
        return this.item;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuanity(quantity: number) {
        if(0 <= quantity && quantity <= this.item.getStock()) {
            this.quantity = quantity;
            this.cartPrim.quantity = quantity;
        }
    }
}