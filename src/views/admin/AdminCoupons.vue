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
          <th width="120">名稱</th>
          <th>折扣百分比</th>
          <th width="120" class="text-center">到期日</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span :class="{'text-success': item.is_enabled}">
              {{ item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm"
              @click.prevent="openCouponModal('edit', item)">
                編輯
              </button>
            <button type="button" class="btn btn-outline-danger btn-sm"
            @click.prevent="openCouponModal('delete', item)">
              刪除
            </button>
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
    @update-coupon="getCoupons">
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
    // 取得列表
    getCoupons() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { coupons, pagination } = response.data;
          this.isLoading = false;
          this.coupons = coupons;
          this.pagination = pagination;
        })
        .catch((error) => {
          this.isLoading = false;
          Swal.fire(error.response.data.message);
        });
    },
    // 刪除優惠券
    delCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.data.id}`;
      this.axios.delete(url)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  mounted() {
    this.getCoupons();
  },
};
</script>
