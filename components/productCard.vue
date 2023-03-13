<template>
  <div class="card flex items-center gap-8">
    <img :src="product.img" :alt="product.title" />
    <div>
      <p class="text-2xl text-secondary">{{ product.title }}</p>
      <p class="text-xl text-gray-50">{{ product.description }}</p>
      <p class="text-lg text-secondary">{{ product.price }} Silver coins</p>

      <button class="btn" @click="addToBasket" :disabled="isPendding">
        <span v-show="isPendding">Adding...</span>
        <span v-show="!isPendding">Add to Basket</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
const { product } = defineProps(["product"]);
const cartStore = useCartStore();
const isPendding = ref(false);

const addToBasket = async () => {
  isPendding.value = true;
  await cartStore.addToCart(product);
  setTimeout(() => {
    isPendding.value = false;
  }, 1000);
};
</script>

<style scoped></style>
