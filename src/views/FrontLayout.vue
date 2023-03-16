<template>
  <h1 class="text-center my-3">前台頁面</h1>
  <nav class="navbar navbar-expand bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/products">Products</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/cart">Cart</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/admin/products">後台產品列表</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/login">登入</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  <div class="container">
    <!-- 此router view 是 display 各個children components -->
    <div class="row py-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'

export default {
  components: {
    RouterView,
    RouterLink
  }
}
</script>
