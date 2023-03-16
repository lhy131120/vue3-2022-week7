<template>
  <div>
    <vue-loading :active="isLoading"></vue-loading>
    <h2 class="mb-5 text-danger text-center">購物車頁面</h2>
    <div class="text-end" v-if="cart.total > 0">
      <button class="btn btn-outline-danger" type="button" :disabled="clearAll" @click="deleteAllItem">
        清空購物車</button>
    </div>
    <table v-if="cart.total === 0" class="table align-middle text-center">
      <thead>
        <tr>
          <th>購物車沒有任何物品, 趕快加物品來吧 ＊VV＊</th>
        </tr>
      </thead>
    </table>
    <table v-else class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
          <th class="text-end">總價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteItem(item)" :disabled="loadingItem === item.id">
                <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                x
              </button>
            </td>
            <td style="width: 200px">
              <img class="img-fluid" :src="item.product.imageUrl" alt="">
            </td>
            <td>
              {{ item.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select name="" id="" class="form-select" v-model="item.qty" @change="modifyItemQty(item)"
                    :disabled="loadingItem === item.id">
                    <option :value="i" v-for="i in 20" :key="i +'qty'">{{ i }}</option>
                  </select>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ item.product.price }}
            </td>
            <td class="text-end">
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="5" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total}}</td>
        </tr>
      </tfoot>
    </table>
    <!-- <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email"
            rules="email|required" v-model="data.user.email" :class="{ 'is-invalid': errors['email'] }"></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control" placeholder="請輸入姓名" rules="required|alpha|min:2"
            v-model="data.user.name" :class="{ 'is-invalid': errors['姓名'] }"></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="text" class="form-control" placeholder="請輸入電話" rules="required|numeric|min:8"
            v-model="data.user.tel" :class="{ 'is-invalid': errors['電話'] }"></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control" placeholder="請輸入地址" rules="required"
            v-model="data.user.address" :class="{ 'is-invalid': errors['地址'] }"></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="data.user.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div> -->
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email"
            rules="email|required" v-model="data.user.email" :class="{ 'is-invalid': errors['email'] }"></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control" placeholder="請輸入姓名" rules="required|alpha|min:2"
            v-model="data.user.name" :class="{ 'is-invalid': errors['姓名'] }"></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control" placeholder="請輸入電話" rules="required|numeric|min:8"
            v-model="data.user.tel" :class="{ 'is-invalid': errors['電話'] }"></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control" placeholder="請輸入地址" rules="required"
            v-model="data.user.address" :class="{ 'is-invalid': errors['地址'] }"></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea ref="textarea" id="message" class="form-control" cols="30" rows="10" style="resize:none; height: 200px; overflow-y: auto;" v-model="data.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger" :disabled="isOrdering">送出訂單</button>
        </div>
      </v-form>
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import VeeValidateRules from '@vee-validate/rules'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

const { VITE_URL, VITE_API } = import.meta.env

Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true
})

setLocale('zh_TW')

export default {
  data () {
    return {
      isLoading: false,
      cart: {},
      loadingItem: '',
      clearAll: false,
      isOrdering: false,
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    Field,
    VForm: Form,
    ErrorMessage
  },
  methods: {
    getCarts () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_API}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.isLoading = false
        })
    },
    modifyItemQty (item) {
      this.loadingItem = item.id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http.put(`${VITE_URL}/api/${VITE_API}/cart/${item.id}`, { data })
        .then((res) => {
          alert(res.data.message)
          this.loadingItem = ''
          this.getCarts()
        })
    },
    deleteItem (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_URL}/api/${VITE_API}/cart/${item.id}`)
        .then((res) => {
          this.loadingItem = ''
          alert(res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteAllItem () {
      this.clearAll = true
      this.$http.delete(`${VITE_URL}/api/${VITE_API}/carts`)
        .then(res => {
          alert(res.data.message)
          this.clearAll = false
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    createOrder () {
      this.isOrdering = true
      const data = this.data
      this.$http.post(`${VITE_URL}/api/${VITE_API}/order`, { data })
        .then(res => {
          alert(`${res.data.message}, 訂單號碼是:${res.data.orderId}`)
          this.$refs.form.resetForm()
          this.data.message = ''
          this.getCarts()
          this.isOrdering = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
