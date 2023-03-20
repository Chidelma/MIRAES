<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import Input from './Input.vue';
    import { allSizes, allCategories } from '../scripts/Shares';
    import SubmitBtn from './SubmitBtn.vue';
    import Break from './Break.vue';
    import { get } from 'svelte/store';
    import { modProduct, panel, store, storage, products } from '../scripts/Init';
    import { _item, _firestore } from '../scripts/Models';
    import Item from '../scripts/Item';
    import { v5 as uuidv5 } from 'uuid';

    export default defineComponent({
        components: { Input, SubmitBtn, Break },
        setup() {

            const allProducts = get(products);

            const img: string[] = [];

            const id = ref('');
            const urls = ref(img);
            const name = ref('');
            const price = ref('');
            const salePrice = ref('');
            const stock = ref('');
            const categories = ref(img);
            const sizes = ref(img);
            const tags = ref(img);

            const loading = ref(false);
            const editing = ref(false);

            modProduct.subscribe(value => {
                if(value != undefined) {
                    editing.value = true;
                    id.value = value.getId();
                    urls.value = value.getPhotos();
                    name.value = value.getName();
                    price.value = String(value.getPrice());
                    salePrice.value = String(value.getSalePrice());
                    stock.value = String(value.getStock());
                    categories.value = value.getCategories();
                    sizes.value = value.getSizes();
                    tags.value = value.getTags();
                } else {
                    id.value = '';
                    urls.value = img;
                    name.value = '';
                    price.value = '';
                    salePrice.value = '';
                    stock.value = '';
                    stock.value = '';
                    categories.value = img;
                    sizes.value = img;
                    tags.value = img;
                }
            });

            async function addEditProduct() {

                if(name.value !== "" && price.value !== "" && stock.value !== "" && sizes.value.length > 0 && categories.value.length > 0 && tags.value.length > 0) {

                    loading.value = true;

                    const item: _item = {
                        id: id.value === '' ? uuidv5(name.value + tags.value, uuidv5.URL) : id.value,
                        name: name.value,
                        photoUrls: urls.value,
                        price: Number(price.value),
                        salePrice: Number(salePrice),
                        stock: Number(stock),
                        categories: categories.value,
                        sizes: sizes.value,
                        tags: tags.value
                    }

                    if(await store.addData("ITEMS", item)) {

                        if(!editing.value) {
                            allProducts.unshift(new Item(item));
                        } else {
                            const idx = allProducts.findIndex((prod) => prod.getId() === item.id);
                            allProducts[idx] = new Item(item);
                        }

                        products.set(allProducts);

                        const empty: Item[] = [];
                        modProduct.set(empty[-1]);
                        panel.set(0);
                        panel.set(-1);
                    }

                    loading.value = false;
                }
            }

            return {
                urls,
                name,
                price,
                salePrice,
                stock,
                categories,
                sizes,
                tags,
                allSizes,
                allCategories,
                addEditProduct,
                loading
            }
        }
    })
</script>

<template>
    <v-row>
        <v-col cols="12" md="6" xs="12">
            <v-img class="img" v-for="url in urls" :key="url" :src="url"></v-img>
            <label>
                <v-icon x-large>mdi-image-plus</v-icon>
                <input type="file" multiple hidden />
            </label>
            <Break :rows="40" />
            <v-text-field filled label="Product Name" v-model="name" dense color="gold"></v-text-field>
            <v-text-field filled type="number" label="Price" v-model="price" dense color="gold"></v-text-field>
            <v-text-field filled type="number" label="Sale Price" v-model="salePrice" dense color="gold"></v-text-field>
        </v-col>
        <v-col class="text-right" cols="12" md="6" xs="12">
            <v-text-field filled label="Stock" v-model="stock" dense color="gold"></v-text-field>
            <v-select label="Sizes" v-model="sizes" :items="allSizes" small-chips attach multiple filled dense></v-select>
            <v-select label="Category" v-model="categories" :items="allCategories" small-chips attach multiple filled dense></v-select>
            <v-combobox label="Tags" v-model="tags" filled dense small-chips multiple color="gold"></v-combobox>
            <SubmitBtn size="small" :loading="loading" @click.native="addEditProduct()">Add/Edit Product</SubmitBtn>
        </v-col>
    </v-row>
</template>

<style>
    .img {
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;
    }
</style>