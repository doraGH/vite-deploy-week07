<template>
  <div class="container-fluid">
    <div id="login" class="row align-items-stretch">
      <div class="col-6 login-box d-flex">
        <div class="tibox align-self-center ps-5">Welcom <br>Bake!</div>
      </div>
      <div class="col-4 offset-md-1 align-self-center">
        <h2 class="text-center mb-5">登入管理後台</h2>
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">帳號</label>
            <input type="email" class="form-control" id="username"
            placeholder="請輸入您的信箱"
            v-model="user.username"
            >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密碼</label>
            <input type="password" class="form-control" id="password"
            placeholder="請輸入密碼" required
            v-model="user.password">
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const url = `${VITE_URL}/admin/signin`;
      axios
        .post(url, this.user)
        .then((response) => {
          const { expired, token } = response.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
  },
};
</script>
