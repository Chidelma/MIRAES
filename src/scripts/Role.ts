import { _order, _role } from './Models';

export default class Role {

    private id: string;

    private viewItems: boolean;
    private viewOrders: boolean;
    private viewUsers: boolean;

    private addItem: boolean;
    private editItem: boolean;
    private deleteItem: boolean;

    private editRole: boolean;

    private rolePrim: any;

    constructor() {

        this.id = '';

        this.viewItems = false;
        this.viewOrders = false;
        this.viewUsers = false;

        this.addItem = false;
        this.editItem = false;
        this.deleteItem = false;

        this.editRole = false;
    }

    setRole(role: _role) {

        this.id = role.id;

        this.viewItems = role.canViewItems;
        this.viewOrders = role.canViewOrders;
        this.viewUsers = role.canViewUsers;
        this.addItem = role.canAddItem;
        this.editItem = role.canEditItem;
        this.deleteItem = role.canDeleteItem;

        this.editRole = role.canEditRole;

        this.rolePrim = role;
    }

    getRolePrime(): _role {
        return this.rolePrim;
    }

    getId(): string {
        return this.id;
    }

    canViewItems(): boolean {
        return this.viewItems;
    }

    setViewItems(truth: boolean) {
        this.viewItems = truth;
        this.rolePrim.canViewItems = truth;
    }

    canViewOrders(): boolean {
        return this.viewOrders;
    }

    setViewOrders(truth: boolean) {
        this.viewOrders = truth;
        this.rolePrim.canViewOrders = truth;
    }

    canViewUsers(): boolean {
        return this.viewUsers;
    }

    setViewUsers(truth: boolean) {
        this.viewUsers = truth;
        this.rolePrim.canViewUsers = truth;
    }

    canAddItem(): boolean {
        return this.addItem;
    }

    setAddItem(truth: boolean) {
        this.addItem = truth;
        this.rolePrim.canAddItem = truth
    }

    canEditItem(): boolean {
        return this.editItem;
    }

    setEditItem(truth: boolean) {
        this.editItem = truth;
        this.rolePrim.canEditItem = truth;
    }

    canDeleteItem(): boolean {
        return this.deleteItem;
    }

    setDeleteItem(truth: boolean) {
        this.deleteItem = truth;
        this.rolePrim.canDeleteItem = truth;
    }

    canEditRole(): boolean {
        return this.editRole;
    }

    setEditRole(truth: boolean) {
        this.editRole = truth;
        this.rolePrim.canEditItem = truth;
    }
}