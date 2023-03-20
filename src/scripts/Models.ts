export interface _firebase {

    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}

export interface _firestore {

    coll: string,
    id: string,
}

export interface _search {

    key: string,
    value: any
}

export interface _user {

    id: string,
    email: string,
    displayName: string,
    photoUrl: string
}

export interface _role {

    id: string,

    canViewItems: boolean,
    canViewOrders: boolean,

    canAddItem: boolean,
    canEditItem: boolean,
    canDeleteItem: boolean,
    
    canViewUsers: boolean,
    canEditRole: boolean
}

export interface _cartItem {
    item:_item,
    quantity: number
}

export interface _cart {
    id: string,
    items: _cartItem[]
}

export interface _item {

    id: string,
    name: string,
    price: number,
    salePrice: number | null,
    photoUrls: string[],
    stock: number,
    sizes: string[],
    categories: string[]
    tags: string[]
}

export interface _order {

    id: string,
    userId?: string | null,
    name: string,
    date: string,
    email: string,

    address: string,
    city: string,
    province: string,
    country: string,
    postal: string,

    items: _cartItem[],
    status: string,
    trackingId: string | null
}
