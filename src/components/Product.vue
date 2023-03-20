<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import Input from './Input.vue';
    import SubmitBtn from './SubmitBtn.vue';
    import GoldBtn from './GoldBtn.vue';
    import Item from '../scripts/Item';
    import { get } from 'svelte/store';
    import { auth, panel, modProduct, products, store } from '../scripts/Init';
    import { _firestore } from '../scripts/Models';

    export default defineComponent({
        components: { Input, SubmitBtn, GoldBtn },
        props: {
            product: {
                type: Item,
                required: true
            }
        },
        setup(props) {

            function cleanTags(allTags: string[]): string {

                let tags = '';

                allTags.forEach((tag) => {
                    tags += tag + ' ';
                });

                return tags;
            }

            function cleanSizes(allSizes: string[]): string {

                let sizes = '';

                allSizes.forEach((size, idx) => {
                    if(idx == allSizes.length - 1)
                        sizes += size + ' ';
                    else
                        sizes += size + ', ';
                });

                return sizes;
            }

            function cleanCategories(allCates: string[]): string {

                let cats = '';

                allCates.forEach((cat, idx) => {
                    if(idx == allCates.length - 1)
                        cats += cat + ' ';
                    else
                        cats += cat + ', ';
                })

                return cats;
            }

            const userRole = ref(get(auth).getUser().getRole());
            const loading = ref(false);

            const itemImg = ref(props.product.getPhotos()[0]);
            const itemName = ref(props.product.getName());
            const itemTags = ref(cleanTags(props.product.getTags()));
            const itemSizes = ref(cleanSizes(props.product.getSizes()));
            const itemCats = ref(cleanCategories(props.product.getCategories()));
            const itemSalePrice = ref(props.product.getSalePrice());
            const itemPrice = ref(props.product.getPrice());

            const canEditItem = ref(userRole.value.canEditItem());
            const canDeleteItem = ref(userRole.value.canDeleteItem());

            function calcPercentage(): number {
                let perc = 0

                if(itemSalePrice.value != null)
                    perc = Number((itemSalePrice.value / itemPrice.value).toFixed(2));

                return 100 - (perc * 100);
            }

            auth.subscribe(value => {
                userRole.value = value.getUser().getRole();
                canEditItem.value = userRole.value.canEditItem();
                canDeleteItem.value = userRole.value.canDeleteItem()
            });

            function editProduct() {
                modProduct.set(props.product);
                panel.set(-1);
                panel.set(0);
            }

            async function deleteProduct() {

                const sure = confirm("Are You Sure you Want To Delete " + itemName.value);

                if(sure) {

                    loading.value = true;

                    const info: _firestore = {
                        coll: "ITEMS",
                        id: props.product.getId()
                    }

                    if(await store.removeData(info)) {

                        const allProducts = get(products);

                        const idx = allProducts.findIndex((item) => item.getId() == props.product.getId());

                        allProducts.splice(idx, 1);
                        /*
                        let cart_idx:number = userCart.findIndex((prod) => prod.get_item().get_id() === item.get_id());

                        if(cart_idx > -1) {
                            userCart.splice(cart_idx, 1);
                            setUserCart(userCart);
                        }
                        */
                        products.set(allProducts);
                    }

                    loading.value = false;
                }
            }

            return {
                cleanTags,
                itemImg,
                itemName,
                itemTags,
                itemSizes,
                itemSalePrice,
                itemCats,
                itemPrice,
                canEditItem,
                canDeleteItem,
                calcPercentage,
                editProduct,
                deleteProduct,
                loading
            }
        }
    })
</script>

<template>
    <v-card>
        <v-img height="250" :src="itemImg"></v-img>
        <v-card-title>{{ itemName }}</v-card-title>
        <v-card-subtitle>{{ itemCats }} | {{ itemTags }}</v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col>
                    <span v-if="product.getSalePrice() != null" class="salePrice">${{ itemSalePrice }} CAD</span>
                    <v-spacer></v-spacer>
                    <span class="itemPrice">${{ itemPrice }} CAD</span>
                    <v-spacer></v-spacer>
                    <span v-if="product.getSalePrice() != null">{{ calcPercentage() }}% Off</span>
                </v-col>
                <v-divider vertical inset></v-divider>
                <v-col>
                    <span>{{ itemSizes }}</span>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <GoldBtn block>Add To Cart</GoldBtn>
        </v-card-actions>
        <v-card-actions v-if="!canEditItem || canDeleteItem">
            <SubmitBtn v-if="!canEditItem" @click.native="editProduct()">Edit</SubmitBtn>
            <v-spacer></v-spacer>
            <SubmitBtn v-if="!canDeleteItem" :loading="loading" @click.native="deleteProduct()">Delete</SubmitBtn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
    .salePrice {
        text-decoration: line-through;
    }

    .itemPrice {
        color: red;
        font-size: large;
    }
</style>