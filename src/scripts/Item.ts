import { _item } from './Models';

export default class Item {

    private id: string;
    private name: string;
    private price: number;
    private salePrice: number | null;
    private photoUrls: string[];
    private stock: number;
    private sizes: string[];
    private categories: string[];
    private tags: string[];

    private itemPrim: _item;

    constructor(item: _item) {

        this.id = item.id;
        this.name = item.name;
        this.price = item.price;
        this.salePrice = item.salePrice;
        this.photoUrls = item.photoUrls;
        this.stock = item.stock;
        this.sizes = item.sizes;
        this.categories = item.categories;
        this.tags = item.tags;

        this.itemPrim = item;
    }

    getItemPrim(): _item {
        return this.itemPrim;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getSalePrice(): number | null {
        return this.salePrice;
    }

    getPhotos(): string[] {
        return this.photoUrls;
    }

    getStock(): number {
        return this.stock;
    }

    getSizes(): string[] {
        return this.sizes;
    }

    getCategories(): string[] {
        return this.categories;
    }

    getTags(): string[] {
        return this.tags;
    }
}
