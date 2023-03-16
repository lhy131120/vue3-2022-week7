<template>
  <h1 class="text-center my-3">後台頁面</h1>
  <nav class="navbar navbar-expand bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link class="nav-link" to="/admin/products">後台產品列表</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/admin/orders">後台訂單列表</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/">返回前台首頁</router-link></li>
            <li class="nav-item"><a href="javascript:;" class="nav-link" @click.prevent="logout">登出</a></li>
          </ul>
        </div>
      </div>
    </nav>
  <div class="container">
    <!-- 此router view 是 display 各個children components -->
    <div class="row py-3">
        <router-view v-if="isAdmin"></router-view>
    </div>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      isAdmin: ''
    }
  },
  components: {
    RouterView,
    RouterLink
  },
  methods: {
    logout () {
      document.cookie = `vue2022Ex=; expires=${new Date()};`
      this.$router.push('/login')
    },
    checkLogin () {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('vue2022Ex='))
        ?.split('=')[1]
      this.$http.defaults.headers.common.Authorization = cookieValue

      const url = `${VITE_URL}/api/user/check`
      this.$http.post(url)
        .then((res) => {
          // console.log(res)
          this.isAdmin = true
        })
        .catch((err) => {
          console.log(err)
          this.$router.push('/login')
          this.isAdmin = false
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
