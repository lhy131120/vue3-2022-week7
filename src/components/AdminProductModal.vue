<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? '新增產品' : '編輯產品'}}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input id="imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結" v-model="product.imageUrl">
                </div>
                <img class="img-fluid" :src="product.imageUrl" alt="">
              </div>
              <!-- 參考片段 -->
              <!-- 判斷tempProduct是否有array作圖片 -->
              <div v-if="Array.isArray(product.imagesUrl)">
                <div v-for="(img, key) in product.imagesUrl" :key="key + 2023">
                  <input type="text" class="form-control" v-model="product.imagesUrl[key]" placeholder="imageUrl">
                  <img :src="product.imagesUrl[key]" alt="" class="img-fluid mb-3">
                </div>
                <!--  出現僚件: array沒有data的情況下, 現在的欄位有輸入 -->
                <button v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="product.imagesUrl.push('')">新增圖片</button>
                <!-- 出現條件: array最少存在一則data,  -->
                <button v-else class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="product.imagesUrl.pop()">刪除圖片</button>
              </div>
              <!-- 沒有的話就貼出新增按鈕 -->
              <div v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImage()">新增圖片</button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="product.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="product.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="product.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="product.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="product.content"></textarea>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="content" class="form-label">上傳主要圖片</label>
                  <input type="file" class="form-control" ref="uploadImg" placeholder="上傳圖片">
                </div>
                <div class="mb-3 col align-self-end g-0">
                  <button type="button" class="btn btn-outline-primary" @click="uploadImage">上傳確認</button>
                </div>
              </div>
              <!-- <div class="mb-3 row" v-if="uploadImageURL">
                <label for="staticUploadImageURL" class="col-sm-3 col-form-label">己上傳圖片網址</label>
                <div class="col">
                  <p class="text-break">{{ uploadImageURL }}</p>
                </div>
              </div> -->
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="product.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct" :disabled="loadingItem">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
const { VITE_URL, VITE_API } = import.meta.env

export default {
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      isUploadImage: false,
      uploadImageURL: '',
      loadingItem: false,
      productModal: {},
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
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    uploadImage () {
      const fileInput = this.$refs.uploadImg
      const file = fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http.post(`${VITE_URL}/api/${VITE_API}/admin/upload`, formData)
        .then(res => {
          console.log(res.data.imageUrl)
          // this.uploadImageURL = res.data.imageUrl
          this.product.imageUrl = res.data.imageUrl
          fileInput.value = ''
        })
        .catch(err => {
          alert(err.response.data.message)
          fileInput.value = ''
        })
    },
    updateProduct () {
      this.loadingItem = true
      // 由於create / edit都使用同一個model, 用let定義,url/method會根據不用而改變
      let url = `${VITE_URL}/api/${VITE_API}/admin/product`
      let method = 'post'
      // isNew = 新增 / !isNew = 編輯
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_API}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message)
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
      this.productModal.show()
    },
    hideModal () {
      this.productModal.hide()
      this.uploadImageURL = ''
    }
  }
}
</script>
