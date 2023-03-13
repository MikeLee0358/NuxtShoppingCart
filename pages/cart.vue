<template>
  <div>
    <h2 class="text-white text-2xl text-center my-8">your baskcet</h2>
    <!-- get data -->
    <div v-if="cartStore.cart.length">
      <!-- product list -->
      <div v-for="product in cartStore.cart" class="flex gap-8 items-center">
        <img :src="product.img" :alt="product.title" />
        <p class="text-white">{{ product.title }}</p>
        <p class="text-white">{{ product.price * product.quantity }} coins.</p>
        <!-- product quantity -->
        <ProductQuantity :product="product" />
        <!-- delete -->
        <button class="ml-auto" @click="cartStore.deleteFromCart(product)">
          <span class="material-symbols-outlined text-white">delete</span>
        </button>
      </div>
      <div class="text-right pt-4 mt-4 border-t-2">
        <span class="text-white">total price: </span>
        <span class="text-secondary">{{ cartStore.cartTotal }}</span>
      </div>
    </div>

    <!-- no data -->
    <div v-else>
      <p class="text-white">no items</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~~/stores/cartStore";
const cartStore = useCartStore();
</script>

<style scoped></style>
