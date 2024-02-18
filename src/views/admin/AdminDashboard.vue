<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <h2>後台管理頁面</h2>
      <button class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false" a
        ria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="btn btn-outline-primary m-2">返回前台</RouterLink>
          </li>
          <li>
            <button type="button" class="btn btn-outline-primary m-2" @click="logout">
              登出
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid my-4">
    <div class="row">
      <div class="col-2">
        <ul class="list-group">
          <li class="list-group-item"><RouterLink to="/admin/products">後台產品列表</RouterLink></li>
          <li class="list-group-item"><RouterLink to="/admin/order">後台訂單列表</RouterLink></li>
        </ul>
      </div>
      <div class="col-10"><RouterView></RouterView></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    mounted() {
    // 取得暫存在cookie的 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;

      // 確認是否登入狀態
      this.checkLogin();
    },
    // 確認是否登入
    checkLogin() {
      const url = `${VITE_URL}/api/user/check`;
      axios.post(url)
        .then((response) => {
          Swal.fire(response.data.success);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
          this.$router.push('/login');
        });
    },
    // 登出
    logout() {
      axios.post(`${VITE_URL}/logout`)
        .then(() => {
          this.$router.push('/login');
        })
        .catch((error) => {
          Swal.fire(error.response.statusText);
        });
    },
  },

};
</script>
