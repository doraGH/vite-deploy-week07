<template>
  <div
    class="modal fade"
    id="couponModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>優惠券細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          123
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary">
            確認
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
// import Swal from 'sweetalert2';
// const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  mixins: [modalMixin],
};
</script>
