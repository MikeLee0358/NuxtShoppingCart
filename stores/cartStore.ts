// import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: (): any => ({
    cart: [],
  }),
  getters: {
    cartTotal(): number {
      return this.cart.reduce((total: number, item: any) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    numberOfProducts(): number {
      return this.cart.reduce((total: number, item: any) => {
        return total + item.quantity;
      }, 0);
    },
  },
  actions: {
    async getCart() {
      const data = await $fetch("http://localhost:4000/cart");
      this.cart = data;
    },
    async deleteFromCart(product: any) {
      this.cart = this.cart.filter((p: any) => product !== p);
      await $fetch("http://localhost:4000/cart/" + product.id, {
        method: "delete",
      });
    },
    async incQuantity(product: any) {
      let updateProduct;
      this.cart = this.cart.map((p: any) => {
        if (p.id === product.id) {
          p.quantity++;
          updateProduct = p;
        }
        return p;
      });
      // make put request
      await $fetch("http://localhost:4000/cart/" + product.id, {
        method: "PUT",
        body: JSON.stringify(updateProduct),
      });
    },
    async decQuantity(product: any) {
      let updateProduct;
      this.cart = this.cart.map((p: any) => {
        if (p.id === product.id && product.quantity > 1) {
          p.quantity--;
          updateProduct = p;
        }
        return p;
      });
      if (updateProduct) {
        // make put request
        await $fetch("http://localhost:4000/cart/" + product.id, {
          method: "PUT",
          body: JSON.stringify(updateProduct),
        });
      }
    },
    async addToCart(product: any) {
      const exists = this.cart.find((p: any) => p.id === product.id);
      if (exists) {
        this.incQuantity(product);
      }
      if (!exists) {
        this.cart.push({ ...product, quantity: 1 });

        await $fetch("http://localhost:4000/cart", {
          method: "post",
          body: JSON.stringify({ ...product, quantity: 1 }),
        });
      }
    },
  },
});
