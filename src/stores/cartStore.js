import { defineStore } from 'pinia';
// import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    cartList: {},
    isLoading: false,
    status: {
      loadCart: '',
      loadQty: '',
    },
  }),
  actions: {
    // 加入購物車
    addCart(id, qty = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.status.loadCart = id;
      const myCart = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.axios
        .post(url, myCart)
        .then((response) => {
          // this.$refs.modal.hideModal();
          this.status.loadCart = '';
          this.getCarts();
          Swal.fire(response.data.message);
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 取得購物車
    getCarts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.isLoading = true;
      this.axios
        .get(url)
        .then((response) => {
          const { data } = response.data;
          this.isLoading = false;
          this.cartList = data;
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 刪除單一購物車
    removeCartItem(cartId) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`;
      this.status.loadQty = cartId;
      this.axios
        .delete(url)
        .then((response) => {
          Swal.fire(response.data.message);
          this.status.loadQty = '';
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 刪除全部購物車
    deleteAllCarts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/carts`;
      this.axios
        .delete(url)
        .then((response) => {
          this.getCarts();
          Swal.fire(response.data.message);
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
    // 更新購物車
    updateCart(data) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`;
      const cart = {
        data: {
          product_id: data.product_id,
          qty: data.qty,
        },
      };
      this.status.loadQty = data.id;
      this.axios
        .put(url, cart)
        .then((response) => {
          Swal.fire(response.data.message);
          this.status.loadQty = '';
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.data.message);
        });
    },
  },

  getters: {},
});
