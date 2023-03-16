<template>
  <div ref="deleteModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct" :disabled="loadingItem">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  props: ['tempProduct'],
  data () {
    return {
      loadingItem: false,
      productDelModal: null,
      product: {
        imagesUrl: []
      }
    }
  },
  watch: {
    tempProduct () {
      this.product = this.tempProduct
    }
  },
  mounted () {
    this.productDelModal = new bootstrap.Modal(this.$refs.deleteModal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    deleteProduct () {
      this.loadingItem = true
      this.$http.delete(`${VITE_URL}/api/${VITE_API}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.hideModal()
          this.$emit('getdata')
          this.loadingItem = false
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.loadingItem = false
        })
    },
    showModal () {
      this.productDelModal.show()
    },
    hideModal () {
      this.productDelModal.hide()
    }
  }
}
</script>
