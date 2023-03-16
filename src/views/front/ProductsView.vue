<template>
  <!-- <font-awesome-icon icon="fa-solid fa-spinner" /> -->
  <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
  <vue-loading :active="isLoading"></vue-loading>
  <div class="text-center">
    <h2 class="mb-5 text-danger">產品頁面</h2>
  </div>
  <hr>
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td width="250">{{ product.title }}</td>
          <td><img :src="product.imageUrl" width="200" alt=""></td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">
                <!-- <font-awesome-icon icon="fa-duotone fa-loader" v-if="loadingItem === product.id" /> -->
                詳細資料
              </router-link>
              <button @click="addToCart(product.id)" type="button" class="btn btn-outline-success" :disabled="loadingItem === product.id">
                <!-- <font-awesome-icon icon="fa-solid fa-spinner" /> -->
                <!-- <font-awesome-icon icon="fa-duotone fa-loader" v-if="loadingItem === product.id" /> -->
                加入購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      loadingItem: '',
      products: []
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProduct () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_API}/products/all`)
        .then(res => {
          this.products = res.data.products
          this.isLoading = false
        })
        .catch(err => {
          alert(err.message)
          this.isLoading = false
        })
    },
    addToCart (id, qty = 1) {
      this.loadingItem = id
      const data = { product_id: id, qty }
      this.$http.post(`${VITE_URL}/api/${VITE_API}/cart`, { data })
        .then(res => {
          this.loadingItem = ''
          alert(res.data.message)
        })
        .catch(err => { alert(err) })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
