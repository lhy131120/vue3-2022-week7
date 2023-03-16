<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true" ref="orderModal">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="orderModalLabel">
            訂單編號: {{ tempOrder.id }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="order.user">
          <div class="mb-3 row">
            <label for="staticName" class="col-sm-3 col-form-label">收貨人姓名:</label>
            <div class="col-sm-9">
              <input type="text" readonly class="form-control-plaintext" id="staticName" v-model="order.user.name">
              <!-- 以下這段可以顯示 -->
              <!-- {{ order.user.name }} <br>
              {{ order.user.email }} <br>
              {{ order.user.address }} <br>
              {{ order.user.tel }} -->
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-3 col-form-label">收貨人電郵:</label>
            <div class="col-sm-9">
              <input type="text" readonly class="form-control-plaintext" id="staticEmail" v-model="order.user.email">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticTel" class="col-sm-3 col-form-label">聯絡人電話:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="staticTel" v-model="order.user.tel">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticAddress" class="col-sm-3 col-form-label">送貨地址:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="staticAddress" v-model="order.user.address">
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="true" :false-value="false" v-model="order.is_paid">
              <label class="form-check-label" for="is_enabled">已付款</label>
            </div>
          </div>
          <hr>
          <div class="mb-3 row">
            <h3>Product List</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <td>項目</td>
                    <td style="width: 50px">數量</td>
                    <td class="text-center">價格</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td>{{ item.product.title }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-center">{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="updateOrder()" :disabled="isLoading">確認</button>
          <button type="button" class="btn btn-danger" @click="hideModal()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  props: ['tempOrder'],
  data () {
    return {
      isLoading: false,
      orderModal: null,
      // order: {}
      order: {
        user: {},
        products: {}
      }
    }
  },
  watch: {
    // 監聽Props值的變化
    tempOrder () {
      // this.order = JSON.parse(JSON.stringify(this.tempOrder))
      this.order = this.tempOrder
    }
  },
  methods: {
    updateOrder () {
      this.isLoading = true
      const url = `${VITE_URL}/api/${VITE_API}/admin/order/${this.tempOrder.id}`
      // console.log(url, this.tempOrder.id)
      this.$http.put(url, { data: this.order })
        .then(res => {
          // console.log(res.data)
          this.isLoading = false
        })
        .catch(err => {
          alert(err.message)
          this.isLoading = false
        })
      this.hideModal()
      this.$emit('editOrder')
    },
    showModal () {
      this.orderModal.show()
    },
    hideModal () {
      this.orderModal.hide()
    }
  },
  mounted () {
    this.orderModal = new bootstrap.Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: 'static'
    })
    // console.log(this.useInfo)
  }
}
</script>
