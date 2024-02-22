<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>優惠卷列表</h2>
      <button class="btn btn-primary" @click="openCouponModal('createNew')">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ formatDate(item.due_date) }}</td>
          <td>
            <span :class="{'text-success': item.is_enabled}">
              {{ item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
                @click.prevent="openCouponModal('edit', item)">
                  編輯
                </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="openCouponModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getCoupons"></PaginationComponent>
  </div>
  <!-- 新增視窗 -->
  <CouponModal
    ref="couponModal"
    :temp-coupon="tempCoupon"
    @update-coupon="updateCoupons">
  </CouponModal>

  <!-- Modal 刪除視窗 -->
  <DelModal
    ref="delModal"
    :item="tempCoupon"
    @del-item="delCoupon"></DelModal>
</template>

<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        data: {},
      },
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    CouponModal,
    DelModal,
  },
  methods: {
    // open bs modal
    openCouponModal(status, item) {
      if (status === 'createNew') {
        this.isNew = true;
        this.tempCoupon.data = {};
        this.$refs.couponModal.openModal();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempCoupon.data = { ...item };
        this.$refs.couponModal.openModal();
      } else if (status === 'delete') {
        this.tempCoupon.data = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toISOString().slice(0, 10);
    },
    // 取得列表
    getCoupons() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          console.log(response);
          const { coupons, pagination } = response.data;
          this.isLoading = false;
          this.coupons = coupons;
          this.pagination = pagination;
        })
        .catch((error) => {
          this.isLoading = false;
          Swal.fire(error.response.data.message);
          this.$router.push('/login');
        });
    },
    // 刪除優惠券
    delCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.data.id}`;
      this.axios.delete(url)
        .then((response) => {
          Swal.fire(response.data.message);
          this.$refs.delModal.hideModal();
          this.getCoupons();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 更新優惠券
    updateCoupons(item) {
      // this.isLoading = true;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let http = 'post';

      // 不是isNew則為新增
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.data.id}`;
        http = 'put';
      }

      this.axios[http](url, item)
        .then((response) => {
          Swal.fire(response.data.message);
          this.$refs.couponModal.hideModal();
          this.getCoupons();
        })
        .catch((error) => {
          const errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response.data.message;
          Swal.fire(errorMessage);
        });
    },

  },
  mounted() {
    this.getCoupons();
  },
};
</script>
