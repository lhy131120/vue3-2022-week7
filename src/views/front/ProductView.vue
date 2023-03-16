<template>
  <h3 class="text-primary">
    {{ product.title }}
  </h3>
  <div>
    <div class="row flex-nowrap p-3">
      <div class="col-md-5 p-0">
        <div class="mb-3">
          <img :src="product.imageUrl" class="img-fluid" alt="">
        </div>
        <template v-if="Array.isArray(product.imagesUrl)">
          <div class="row row-cols-3 my-2 flex-wrap">
            <div v-for="imageUrl in product.imagesUrl" :key="'source'+ imageUrl" class="col" >
              <img :src="imageUrl" class="img-fluid" alt="">
            </div>
          </div>
        </template>
        <template v-else>
          <h5 class="text-warning">
            抱歉沒有其他圖片提供
          </h5>
        </template>
      </div>
      <div class="col text-break">
        <h3 class="fw-bold">{{ product.category }}</h3>
        <h4>{{ product.description }}</h4>
        <p>{{ product.content}}</p>
      </div>
    </div>
    <hr>
    <div class="text-end">
      <button @click="addToCart(product.id)" type="button" class="btn btn-outline-secondary" :disabled="loadingItem === product.id">加入購物車</button>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_API } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      loadingItem: '',
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_API}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          alert(err.message)
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
