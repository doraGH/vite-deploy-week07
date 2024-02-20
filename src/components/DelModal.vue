<template>
  <div class="modal fade" id="delModal" ref="delModal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除</span>
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
          <strong class="text-danger">{{ item.data }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="$emit('del-item')">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    item: Object,
  },
  emits: ['del-item'],
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    // bs modal 實體化
    this.modal = new Modal(this.$refs.delModal, {
      backdrop: 'static',
      keyboard: false,
    });
  },
  methods: {
    // 打開modal
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
};
</script>
