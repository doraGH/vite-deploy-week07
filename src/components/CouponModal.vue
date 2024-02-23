<template>
  <div
    class="modal fade"
    id="couponModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="couponModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input id="title" type="text" class="form-control"
            placeholder="請輸入標題"
            v-model="editCoupon.data.title">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input id="coupon_code" type="text" class="form-control"
            placeholder="請輸入優惠碼" v-model="editCoupon.data.code">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input id="due_date" type="date" class="form-control" v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="percent">折扣百分比</label>
            <input id="percent" type="number" class="form-control" min="0"
            placeholder="請輸入折扣百分比" v-model.number="editCoupon.data.percent">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox"
              v-model="editCoupon.data.is_enabled" :true-value="1" :false-value="0">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
          {{ isNew ? '新增優惠卷' :'更新優惠券' }}
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
  props: ['isNew', 'tempCoupon'],
  emits: ['update-coupon'],
  mixins: [modalMixin],

  data() {
    return {
      editCoupon: {
        data: {},
      },
      due_date: '',
    };
  },
  mounted() {
    this.editCoupon = this.tempCoupon;
    // this.showDate();
  },
  // methods: {
  //   // 顯示時間
  //   showDate() {
  //     const getTime = new Date().toISOString().slice(0, 10);
  //     this.due_date = getTime;
  //     console.log(this.due_date);
  //   },
  // },
  watch: {
    tempCoupen() {
      this.editCoupon = this.tempCoupon;
      const getTime = new Date(this.editCoupon.data.due_date * 1000).toISOString().split('T');
      [this.due_date] = getTime;
    },
    due_date() {
      this.editCoupon.data.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
};
</script>
