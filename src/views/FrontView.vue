<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <h2><img src="/logoname.png" style="height: 80px;"></h2>
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
            <RouterLink to="/" class="nav-link">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link">前台產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link">登入頁</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>
