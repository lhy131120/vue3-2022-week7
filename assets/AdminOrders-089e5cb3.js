import{M as E}from"./bootstrap.esm-434bcbc7.js";import{_ as M,o as d,c as n,b as e,t as r,D as c,H as u,K as L,F as p,f as b,C as k,d as v,G as _,I as m,r as g,e as h}from"./index-77d831c0.js";const{VITE_URL:V,VITE_API:I}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API:"sakimotorin-vue2022",BASE_URL:"/vue3-2022-week6/",MODE:"production",DEV:!1,PROD:!0},w={props:["tempOrder"],data(){return{isLoading:!1,orderModal:null,order:{user:{},products:{}}}},watch:{tempOrder(){this.order=this.tempOrder}},methods:{updateOrder(){this.isLoading=!0;const a=`${V}/api/${I}/admin/order/${this.tempOrder.id}`;this.$http.put(a,{data:this.order}).then(t=>{this.isLoading=!1}).catch(t=>{alert(t.message),this.isLoading=!1}),this.hideModal(),this.$emit("editOrder")},showModal(){this.orderModal.show()},hideModal(){this.orderModal.hide()}},mounted(){this.orderModal=new E(this.$refs.orderModal,{keyboard:!1,backdrop:"static"})}},C={class:"modal fade",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true",ref:"orderModal"},T={class:"modal-dialog"},$={class:"modal-content border-0"},U={class:"modal-header"},A={class:"modal-title fs-5",id:"orderModalLabel"},D=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),P={key:0,class:"modal-body"},R={class:"mb-3 row"},N=e("label",{for:"staticName",class:"col-sm-3 col-form-label"},"收貨人姓名:",-1),B={class:"col-sm-9"},S={class:"mb-3 row"},F=e("label",{for:"staticEmail",class:"col-sm-3 col-form-label"},"收貨人電郵:",-1),j={class:"col-sm-9"},q={class:"mb-3 row"},z=e("label",{for:"staticTel",class:"col-sm-3 col-form-label"},"聯絡人電話:",-1),G={class:"col-sm-9"},H={class:"mb-3 row"},K=e("label",{for:"staticAddress",class:"col-sm-3 col-form-label"},"送貨地址:",-1),J={class:"col-sm-9"},Q={class:"mb-3"},W={class:"form-check"},X=e("label",{class:"form-check-label",for:"is_enabled"},"已付款",-1),Y=e("hr",null,null,-1),Z={class:"mb-3 row"},ee=e("h3",null,"Product List",-1),te={class:"table-responsive"},se={class:"table"},oe=e("thead",null,[e("tr",null,[e("td",null,"項目"),e("td",{style:{width:"50px"}},"數量"),e("td",{class:"text-center"},"價格")])],-1),le={class:"text-center"},re={class:"text-center"},de={class:"modal-footer"},ne=["disabled"];function ie(a,t,f,x,s,i){return d(),n("div",C,[e("div",T,[e("div",$,[e("div",U,[e("h1",A," 訂單編號: "+r(f.tempOrder.id),1),D]),s.order.user?(d(),n("div",P,[e("div",R,[N,e("div",B,[c(e("input",{type:"text",readonly:"",class:"form-control-plaintext",id:"staticName","onUpdate:modelValue":t[0]||(t[0]=o=>s.order.user.name=o)},null,512),[[u,s.order.user.name]])])]),e("div",S,[F,e("div",j,[c(e("input",{type:"text",readonly:"",class:"form-control-plaintext",id:"staticEmail","onUpdate:modelValue":t[1]||(t[1]=o=>s.order.user.email=o)},null,512),[[u,s.order.user.email]])])]),e("div",q,[z,e("div",G,[c(e("input",{type:"text",class:"form-control",id:"staticTel","onUpdate:modelValue":t[2]||(t[2]=o=>s.order.user.tel=o)},null,512),[[u,s.order.user.tel]])])]),e("div",H,[K,e("div",J,[c(e("input",{type:"text",class:"form-control",id:"staticAddress","onUpdate:modelValue":t[3]||(t[3]=o=>s.order.user.address=o)},null,512),[[u,s.order.user.address]])])]),e("div",Q,[e("div",W,[c(e("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":!0,"false-value":!1,"onUpdate:modelValue":t[4]||(t[4]=o=>s.order.is_paid=o)},null,512),[[L,s.order.is_paid]]),X])]),Y,e("div",Z,[ee,e("div",te,[e("table",se,[oe,e("tbody",null,[(d(!0),n(p,null,b(s.order.products,o=>(d(),n("tr",{key:o.id},[e("td",null,r(o.product.title),1),e("td",le,r(o.qty),1),e("td",re,r(o.total),1)]))),128))])])])])])):k("",!0),e("div",de,[e("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=o=>i.updateOrder()),disabled:s.isLoading},"確認",8,ne),e("button",{type:"button",class:"btn btn-danger",onClick:t[6]||(t[6]=o=>i.hideModal())},"取消")])])])],512)}const ae=M(w,[["render",ie]]),{VITE_URL:ce,VITE_API:ue}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API:"sakimotorin-vue2022",BASE_URL:"/vue3-2022-week6/",MODE:"production",DEV:!1,PROD:!0},_e={data(){return{isLoading:!1,orders:[],tempOrder:{},pagination:{},orderMounted:!1}},components:{orderModal:ae},methods:{getOrders(a=1){this.isLoading=!0,this.$http.get(`${ce}/api/${ue}/admin/orders/?page=${a}`).then(t=>{console.log(t.data.orders),this.orders=t.data.orders,this.pagination=t.data.pagination,this.isLoading=!1,this.orderMounted=!0}).catch(t=>{console.log("admin orders error: "+t),this.isLoading=!1})},openOrderModal(a){this.tempOrder={...a},this.$refs.orderModal.showModal()}},mounted(){this.getOrders()}},he=e("h2",{class:"text-center text-danger mb-4"},"後台產品訂單列表",-1),pe=e("hr",null,null,-1),me={class:"table-responsive"},be={class:"table"},fe=e("tr",null,[e("td",null,"訂單號碼"),e("td",null,"訂單狀態"),e("td",null,"訂單建立日期"),e("td",null,"訂單客戶資訊"),e("td")],-1),ve=e("br",null,null,-1),ge=e("br",null,null,-1),Me=e("br",null,null,-1),ke=["onClick"],xe={key:0},ye={class:"pagination justify-content-center"},Oe=e("span",{"aria-hidden":"true"},"«",-1),Ee=[Oe],Le=["onClick"],Ve=e("span",{"aria-hidden":"true"},"»",-1),Ie=[Ve];function we(a,t,f,x,s,i){const o=g("vue-loading"),y=g("orderModal");return d(),n(p,null,[v(o,{active:s.isLoading},null,8,["active"]),he,pe,e("div",me,[e("table",be,[e("tbody",null,[fe,(d(!0),n(p,null,b(s.orders,l=>(d(),n("tr",{key:l.id},[e("td",null,r(l.id),1),e("td",null,[e("span",{class:_({"text-success":l.is_paid,"text-danger":!l.is_paid})},r(l.is_paid?"已付":"未付"),3)]),e("td",null,r(l.create_at),1),e("td",null,[h(" 收貨人姓名: "+r(l.user.name)+" ",1),ve,h(" 聯絡電郵: "+r(l.user.email)+" ",1),ge,h(" 聯絡電話: "+r(l.user.tel)+" ",1),Me,h(" 送貨地址: "+r(l.user.address),1)]),e("td",null,[e("button",{type:"button",class:"btn btn-primary",onClick:O=>i.openOrderModal(l)},"修改訂單",8,ke)])]))),128))])]),v(y,{ref:"orderModal","temp-order":s.tempOrder,onEditOrder:i.getOrders},null,8,["temp-order","onEditOrder"]),s.orderMounted&&s.orders?(d(),n("nav",xe,[e("ul",ye,[e("li",{class:_(["page-item",{disabled:!s.pagination.has_pre}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[0]||(t[0]=m(l=>i.getOrders(s.pagination.current_page-1),["prevent"]))},Ee)],2),(d(!0),n(p,null,b(s.pagination.total_pages,l=>(d(),n("li",{class:_(["page-item",{active:l===s.pagination.current_page}]),key:l+"page"},[e("a",{class:"page-link",href:"#",onClick:m(O=>i.getOrders(l),["prevent"])},r(l),9,Le)],2))),128)),e("li",{class:_(["page-item",{disabled:!s.pagination.has_next}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[1]||(t[1]=m(l=>i.getOrders(s.pagination.current_page+1),["prevent"]))},Ie)],2)])])):k("",!0)])],64)}const $e=M(_e,[["render",we]]);export{$e as default};