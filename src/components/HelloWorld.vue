<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
	import Product from './Product.vue';
	import ModProduct from './ModProduct.vue';
	import GoldBtn from './GoldBtn.vue';
	import Input from './Input.vue';
	import Break from './Break.vue';
    import { get, writable } from 'svelte/store';
	import { products, auth, panel } from '../scripts/Init';
	import { allCategories, allSizes } from '../scripts/Shares';
	import Item from '../scripts/Item';

    export default defineComponent({
        components: { Product, GoldBtn, Input, ModProduct, Break },
        setup() {

			const userRole = ref(get(auth).getUser().getRole());

			const canAddItem = ref(userRole.value.canAddItem());

			const allProducts = ref(get(products));

			products.subscribe(value => allProducts.value = value);

			const searchTerm = ref('');
			const category = ref('');
			const selectedSize = ref('');

			const expand = ref(get(panel));

			panel.subscribe(value => expand.value = value);

			function searchProducts() {
				allProducts.value = get(products).filter((item) => item.getName().includes(searchTerm.value));
			}

			function selectCategory() {

				const results: Item[] = [];

				get(products).forEach((item) => {
					item.getCategories().forEach((cat) => {
						if(cat === category.value)
							results.push(item);
					});
				});
				
				allProducts.value = results;
			}

			function selectSize() {

				const results: Item[] = [];

				get(products).forEach((item) => {
					item.getSizes().forEach((size) => {
						if(size === selectedSize.value)
							results.push(item);
					});
				});
				
				allProducts.value = results;
			}

            return { 
				allProducts, 
				userRole, 
				canAddItem, 
				allCategories, 
				allSizes,
				searchTerm,
				searchProducts,
				category,
				selectCategory,
				selectedSize,
				selectSize,
				expand
			}
        }
    })
</script>

<template>
    <v-container fluid>
		<v-expansion-panels v-if="!canAddItem" v-model="expand">
			<v-expansion-panel>
				<v-expansion-panel-header>
					ADD PRODUCT
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<ModProduct />
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<Break :rows="20" />
		<v-row>
			<v-col cols="12" md="4" sm="12">
				<Input icon="mdi-magnify" v-model="searchTerm" label="Search" @keyup.native="searchProducts()" />
			</v-col>
			<v-col cols="12" md="4" sm="12">
				<v-select color="gold" label="Category" v-model="category" filled :items="allCategories" @change.native="selectCategory()"></v-select>
			</v-col>
			<v-col cols="12" md="4" sm="12">
				<v-select color="gold" label="Size" v-model="selectedSize" filled :items="allSizes" @change.native="selectSize()"></v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col v-model="allProducts" lg="3" md="4" xs="12" v-for="(item, idx) in allProducts" :key="idx">
				<Product :product="item" />
			</v-col>
		</v-row>
    </v-container>
</template>
