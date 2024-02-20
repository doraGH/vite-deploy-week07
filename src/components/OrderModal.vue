<template>
  <div
    class="modal fade"
    id="orderModal"
    ref="orderModal"
    tabindex="-1"
    aria-labelledby="orderModallLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h6>訂單內容</h6>
          <table class="table">
            <tbody>
              <tr>
                <th>訂單編號</th>
                <td>{{ tempOrder.data.id }}</td>
              </tr>
              <tr>
                <th>訂單日期</th>
                <td>{{ tempOrder.data.create_at }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <strong v-if="tempOrder.data.is_paid" class="text-success">已付款</strong>
                  <span v-else class="text-muted">尚未付款</span>
                </td>
              </tr>
              <tr>
                <th>總金額</th>
                <td>
                  $ {{ tempOrder.data.total }}
                </td>
              </tr>
            </tbody>
          </table>

          <h6>選購商品</h6>
          <table class="table">
            <tbody>
              <tr v-for="item in tempOrder.data.products" :key="item.id">
                <th>{{ item.product.title }}</th>
                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-end">
                  $ {{ item.final_total }}
                </td>
              </tr>
            </tbody>
          </table>

          <h6>用戶資料</h6>
          <table class="table">
            <tbody>
              <tr>
                <td>姓名</td>
                <td>{{ tempOrder.data.user.name }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ tempOrder.data.user.email }}</td>
              </tr>
              <tr>
                <td>電話</td>
                <td>{{ tempOrder.data.user.tel }}</td>
              </tr>
              <tr>
                <td>地址</td>
                <td>{{ tempOrder.data.user.address }}</td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
              v-model="this.isPaid" />
            <label class="form-check-label" for="flexCheckDefault">
              <span v-if="tempOrder.data.is_paid" class="text-success">已付款</span>
              <span v-else class="text-muted">未付款</span>
            </label>
          </div> -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
          @click.prevent="$emit('edit-order')"> <!-- 待修 -->
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
// import Swal from 'sweetalert2';

// const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['tempOrder'],
  emit: ['edit-order'],
  data() {
    return {
      bsModal: null,
      editOrder: {},
      isPaid: false,
    };
  },
  mounted() {
    // bs modal 實體化
    this.bsModal = new Modal(this.$refs.orderModal, {
      backdrop: 'static',
      keyboard: false,
    });
    this.editOrder = this.tempOrder;
  },
  methods: {
    // 更新產品資料
    // updateProduct() {
    //   const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.editOrder.data.id}`;

    //   this.axios.put(url, this.editOrder)
    //     .then((response) => {
    //       Swal.fire(response.data.message);
    //       this.bsModal.hide();
    //       this.$emit('updateProduct');
    //     })
    //     .catch((error) => {
    //       const errorMessage = Array.isArray(error.response.data.message)
    //         ? error.response.data.message.join('\n')
    //         : error.response.data.message;
    //       Swal.fire(errorMessage);
    //     });
    // },

    // 打開modal
    openModal() {
      this.bsModal.show();
    },
    closeModal() {
      this.bsModal.hide();
    },
  },
  watch: {
    tempOrder() {
      this.editOrder = this.tempOrder;
    },
  },
};
</script>
