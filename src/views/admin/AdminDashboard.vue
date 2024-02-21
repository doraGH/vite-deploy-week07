<template>
  <AdminNavbar />
  <div id="login-page" class="container-fluid">
    <RouterView></RouterView>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import AdminNavbar from '@/components/AdminNavbar.vue';

const { VITE_URL } = import.meta.env;

export default {
  components: { AdminNavbar },
  methods: {
    mounted() {
      // 取得暫存在cookie的 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$axios.defaults.headers.common.Authorization = token;

      // 確認是否登入狀態
      this.checkLogin();
    },
    // 確認是否登入
    checkLogin() {
      const url = `${VITE_URL}/api/user/check`;
      this.axios.post(url)
        .then((response) => {
          Swal.fire(response.data.success);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
          this.$router.push('/login');
        });
    },
  },

};
</script>
