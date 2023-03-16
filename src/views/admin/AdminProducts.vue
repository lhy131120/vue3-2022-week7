<template>
  <vue-loading :active="isLoading"></vue-loading>
  <h2 class="text-center text-danger">後台產品管理列表</h2>
  <hr>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th class="text-end" width="120">原價</th>
          <th class="text-end" width="120">售價</th>
          <th class="text-center" width="120">是否啟用</th>
          <th class="text-center"  width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td class="text-center">
            <span :class="{'text-success': product.is_enabled, 'text-danger': !product.is_enabled}">{{ product.is_enabled ? '啟用' : '未啟用' }}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', product)" :disabled="loadingItem === product.id">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="page" @change-page="getProducts" @go-prev-page="getProducts" @go-next-page="getProducts"></pagination>
  </div>
  <product-modal :temp-product="tempProduct" @getdata="getProducts" :is-new="isNew" ref="productModal"></product-modal>
  <delete-modal :temp-product="tempProduct" @getdata="getProducts" ref="delModal"></delete-modal>
</template>

<script>
import pagination from '../../components/AdminProductPagination.vue'
import productModal from '../../components/AdminProductModal.vue'
import deleteModal from '../../components/AdminProductDelModal.vue'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      loadingItem: '',
      products: {},
      tempProduct: {},
      isNew: false,
      page: {}
    }
  },
  components: {
    pagination,
    productModal,
    deleteModal
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_API}/admin/products/?page=${page}`)
        .then((res) => {
          console.log(res.data)
          this.products = res.data.products
          this.page = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.data.message)
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.showModal()
      } else if (status === 'edit') {
        this.tempProduct = { ...product }
        this.isNew = false
        this.$refs.productModal.showModal()
      } else if (status === 'delete') {
        this.tempProduct = { ...product }
        this.$refs.delModal.showModal()
      }
    },
    createImage () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    }
  }
}
</script>
