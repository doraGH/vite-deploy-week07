<template>
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ tempProduct.data.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['tempProduct'],
  data() {
    return {
      bsDelProductModal: null,
    };
  },
  mounted() {
    // bs modal 實體化
    this.bsDelProductModal = new Modal(this.$refs.delProductModal, {
      backdrop: 'static',
      keyboard: false,
    });
  },
  methods: {
    // 刪除單一產品
    deleteProduct() {
      axios
        .delete(
          `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.data.id}`,
        )
        .then((response) => {
          Swal.fire(response.data.message);
          this.bsDelProductModal.hide();
          this.$emit('updateProduct');
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 打開modal
    openModal() {
      this.bsDelProductModal.show();
    },
  },
};
</script>
