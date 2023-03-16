<template>
  <vue-loading :active="isLoading"></vue-loading>
  <h2 class="text-center text-danger mb-4">後台產品訂單列表</h2>
  <hr>
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <td>訂單號碼</td>
          <td>訂單狀態</td>
          <td>訂單建立日期</td>
          <td>訂單客戶資訊</td>
          <td></td>
        </tr>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            <span :class="{'text-success': order.is_paid, 'text-danger': !order.is_paid}">{{ order.is_paid ? '已付' : '未付'}}</span>
          </td>
          <td>{{ order.create_at }}</td>
          <td>
            收貨人姓名: {{ order.user.name }} <br>
            聯絡電郵: {{ order.user.email }} <br>
            聯絡電話: {{ order.user.tel }} <br>
            送貨地址: {{ order.user.address }}
          </td>
          <td>
            <button type="button" class="btn btn-primary" @click="openOrderModal(order)">修改訂單</button>
          </td>
        </tr>
      </tbody>
    </table>
    <orderModal ref="orderModal" :temp-order="tempOrder" @editOrder="getOrders"></orderModal>
    <!-- Pagination -->
    <nav v-if="orderMounted && orders">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{disabled: !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getOrders(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ active: page === pagination.current_page }" v-for='page in pagination.total_pages' :key="page +'page'" >
          <a class="page-link" href="#" @click.prevent="getOrders(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled: !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getOrders(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import orderModal from '../../components/AdminOrderModal.vue'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      tempOrder: {},
      pagination: {},
      orderMounted: false
    }
  },
  components: {
    orderModal
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_API}/admin/orders/?page=${page}`)
        .then(res => {
          console.log(res.data.orders)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
          this.orderMounted = true
        })
        .catch(err => {
          console.log('admin orders error: ' + err)
          this.isLoading = false
        })
    },
    openOrderModal (order) {
      this.tempOrder = { ...order }
      // console.log(this.tempOrder.user.name)
      this.$refs.orderModal.showModal()
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
