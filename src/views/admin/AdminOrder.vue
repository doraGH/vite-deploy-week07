<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>訂單列表</h2>
      <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="delAllOrder">清空訂單</button>
      </div>
    </div>

    <table class="table align-middle">
      <thead>
        <tr>
          <th>訂單日期</th>
          <th>訂單編號</th>
          <th>訂單總金額</th>
          <th>付款狀態</th>
          <th>查看訂單</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr>
            <td>{{ formatDate(item.create_at) }}</td>
            <td>{{ item.id }}</td>
            <td>NT$ {{ item.total }}</td>
            <td>
              <span :class="{'text-success': item.is_paid}">
              {{ item.is_paid ? '已付款' : '未付款' }}</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click.prevent="openOrderModal('edit', item)">
                <font-awesome-icon :icon="['fas', 'eye']" /> 編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click.prevent="openOrderModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getOrders"></PaginationComponent>

  </div>

  <!-- Modal 刪除彈跳視窗 -->
  <div id="delOrderModal" ref="delOrderModal" class="modal fade" tabindex="-1"
      aria-labelledby="delOrderModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempOrder.data.id }}</strong> 訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delOneOrder(tempOrder.data.id)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';

import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {
        data: {},
      },
      isLoading: false,
      delModal: null,
    };
  },
  components: {
    PaginationComponent,
  },
  methods: {
    // 取得訂單
    getOrders(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.axios
        .get(url)
        .then((response) => {
          const { orders, pagination } = response.data;
          this.isLoading = false;
          this.orders = orders;
          this.pagination = pagination;
          console.log(response);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
          this.$router.push('/login');
        });
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      const thisTime = `${getTime.getFullYear()}/${getTime.getMonth() + 1}/${getTime.getDate()}`;
      return `${thisTime}`;
    },
    // open bs modal 代值判斷傳入是哪一個
    openOrderModal(status, item) {
      // eslint-disable-next-line no-console
      console.log(status, item);
      if (status === 'edit') {
        this.tempOrder.data = { ...item };
        // this.openOrderModal();
        // this.bsDelProductModal.show();
      } else if (status === 'delete') {
        this.tempOrder.data = { ...item };
        this.delModal.show();
      }
    },
    // 取消單一訂單
    delOneOrder(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`;
      this.axios
        .delete(url, id).then(() => {
          this.delModal.hide();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 取消全部訂單
    delAllOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`;
      this.axios
        .delete(url).then((response) => {
          Swal.fire(response.data.message);
          this.getOrders();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // bsModal show
    openDelOrderModal() {
      this.$refs.delProductModal.openModal();
    },
  },
  mounted() {
    this.delModal = new Modal(this.$refs.delOrderModal, {
      backdrop: 'static',
      keyboard: false,
    });
    this.getOrders();
  },
};
</script>
