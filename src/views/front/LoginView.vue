<template>
  <vue-loading :active="isLoading"></vue-loading>
  <h1 class="h3 mb-3 font-weight-normal text-center text-danger">
    請先登入
  </h1>
  <form id="form" class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus v-model="users.username">
      <label for="username">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="password" placeholder="Password" required v-model="users.password">
      <label for="password">Password</label>
    </div>
    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" >
      登入
    </button>
  </form>
</template>

<script>
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      users: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 登入API
      this.isLoading = true
      this.$http.post(`${VITE_URL}/admin/signin`, this.users)
        .then(res => {
          this.isLoading = false
          const { token, expired } = res.data
          document.cookie = `vue2022Ex=${token}; expires=${new Date(expired)}`
          this.clearInputVal()
          this.$router.push('/admin/products')
        })
        .catch(err => {
          this.isLoading = false
          alert(err.message)
          this.clearInputVal()
        })
    },
    clearInputVal () {
      this.users.username = ''
      this.users.password = ''
    }
  }
}
</script>
