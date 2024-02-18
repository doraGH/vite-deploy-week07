<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>後台產品列表</h2>
      <button class="btn btn-primary" @click="openProductModal('createNew')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120" class="text-center">
            原價
          </th>
          <th width="120" class="text-center">
            售價
          </th>
          <th width="100" class="text-center">
            是否啟用
          </th>
          <th width="120" class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">{{ item.origin_price }}</td>
          <td class="text-center">{{ item.price }}</td>
          <td class="text-center">
            <span :class="{'text-success': item.is_enabled}">
              {{ item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click.prevent="openProductModal('edit', item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="openProductModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getProducts"></PaginationComponent>
  </div>
  <!-- Modal 新增修改視窗 -->
  <ProductModal
    ref="productModal"
    :is-new="isNew"
    :temp-product="tempProduct"
    @update-product="getProducts"
    @update-temp-product="handleUpdateTempProduct">
  </ProductModal>

  <!-- Modal 刪除彈跳視窗 -->
  <DelProductModal
  ref="delProductModal"
  :temp-product="tempProduct"
  @update-product="getProducts"></DelProductModal>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        data: {},
      },
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    ProductModal,
    DelProductModal,
  },
  mounted() {
    // 取得cookie token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
  methods: {
    // 確認登入狀態
    checkLogin() {
      const url = `${VITE_URL}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProducts();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
          this.$router.push('/login');
        });
    },
    // 取得產品
    getProducts(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      axios.get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.isLoading = false;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // open bs modal 代值判斷傳入是哪一個
    openProductModal(status, item) {
      if (status === 'createNew') {
        this.isNew = true;
        this.tempProduct.data = {};
        this.openProductModalShow();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempProduct.data = { ...item };
        this.openProductModalShow();
      } else if (status === 'delete') {
        this.tempProduct.data = { ...item };
        this.openDelProductModalShow();
      }
    },
    // 接收tempProduct事件
    handleUpdateTempProduct(updatedData) {
      this.tempProduct = {
        ...this.tempProduct,
        data: { ...this.tempProduct.data, ...updatedData },
      };
    },

    // bsModal show
    openProductModalShow() {
      this.$refs.productModal.openModal();
    },
    openDelProductModalShow() {
      this.$refs.delProductModal.openModal();
    },
  },
};
</script>
