import{_ as h,c,b as t,t as n,F as a,f as m,o as r}from"./index-77d831c0.js";const{VITE_URL:u,VITE_API:p}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API:"sakimotorin-vue2022",BASE_URL:"/vue3-2022-week6/",MODE:"production",DEV:!1,PROD:!0},g={data(){return{isLoading:!1,loadingItem:"",product:{}}},methods:{getProduct(){const{id:e}=this.$route.params;this.$http.get(`${u}/api/${p}/product/${e}`).then(o=>{this.product=o.data.product}).catch(o=>{alert(o.message)})},addToCart(e,o=1){this.loadingItem=e;const l={product_id:e,qty:o};this.$http.post(`${u}/api/${p}/cart`,{data:l}).then(i=>{this.loadingItem="",alert(i.data.message)}).catch(i=>{alert(i)})}},mounted(){this.getProduct()}},f={class:"text-primary"},v={class:"row flex-nowrap p-3"},y={class:"col-md-5 p-0"},b={class:"mb-3"},x=["src"],I={key:0,class:"row row-cols-3 my-2 flex-wrap"},k=["src"],w={key:1,class:"text-warning"},E={class:"col text-break"},V={class:"fw-bold"},P=t("hr",null,null,-1),T={class:"text-end"},A=["disabled"];function L(e,o,l,i,s,_){return r(),c(a,null,[t("h3",f,n(s.product.title),1),t("div",null,[t("div",v,[t("div",y,[t("div",b,[t("img",{src:s.product.imageUrl,class:"img-fluid",alt:""},null,8,x)]),Array.isArray(s.product.imagesUrl)?(r(),c("div",I,[(r(!0),c(a,null,m(s.product.imagesUrl,d=>(r(),c("div",{key:"source"+d,class:"col"},[t("img",{src:d,class:"img-fluid",alt:""},null,8,k)]))),128))])):(r(),c("h5",w," 抱歉沒有其他圖片提供 "))]),t("div",E,[t("h3",V,n(s.product.category),1),t("h4",null,n(s.product.description),1),t("p",null,n(s.product.content),1)])]),P,t("div",T,[t("button",{onClick:o[0]||(o[0]=d=>_.addToCart(s.product.id)),type:"button",class:"btn btn-outline-secondary",disabled:s.loadingItem===s.product.id},"加入購物車",8,A)])])],64)}const B=h(g,[["render",L]]);export{B as default};
