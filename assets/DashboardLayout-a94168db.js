import{_ as m,R as p,a as k,c as f,b as t,d as n,w as i,I as g,J as x,C as V,F as w,r as d,o as u,e as c}from"./index-77d831c0.js";const{VITE_URL:E}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API:"sakimotorin-vue2022",BASE_URL:"/vue3-2022-week6/",MODE:"production",DEV:!1,PROD:!0},b={data(){return{isAdmin:""}},components:{RouterView:p,RouterLink:k},methods:{logout(){document.cookie=`vue2022Ex=; expires=${new Date};`,this.$router.push("/login")},checkLogin(){var o;const r=(o=document.cookie.split("; ").find(s=>s.startsWith("vue2022Ex=")))==null?void 0:o.split("=")[1];this.$http.defaults.headers.common.Authorization=r;const e=`${E}/api/user/check`;this.$http.post(e).then(s=>{this.isAdmin=!0}).catch(s=>{console.log(s),this.$router.push("/login"),this.isAdmin=!1})}},mounted(){this.checkLogin()}},A=t("h1",{class:"text-center my-3"},"後台頁面",-1),L={class:"navbar navbar-expand bg-light"},R={class:"container-fluid"},$={class:"collapse navbar-collapse",id:"navbarNav"},B={class:"navbar-nav"},C={class:"nav-item"},D={class:"nav-item"},I={class:"nav-item"},N={class:"nav-item"},y={class:"container"},T={class:"row py-3"};function U(r,e,o,s,_,l){const a=d("router-link"),h=d("router-view");return u(),f(w,null,[A,t("nav",L,[t("div",R,[t("div",$,[t("ul",B,[t("li",C,[n(a,{class:"nav-link",to:"/admin/products"},{default:i(()=>[c("後台產品列表")]),_:1})]),t("li",D,[n(a,{class:"nav-link",to:"/admin/orders"},{default:i(()=>[c("後台訂單列表")]),_:1})]),t("li",I,[n(a,{class:"nav-link",to:"/"},{default:i(()=>[c("返回前台首頁")]),_:1})]),t("li",N,[t("a",{href:"javascript:;",class:"nav-link",onClick:e[0]||(e[0]=g((...v)=>l.logout&&l.logout(...v),["prevent"]))},"登出")])])])])]),t("div",y,[t("div",T,[_.isAdmin?(u(),x(h,{key:0})):V("",!0)])])],64)}const M=m(b,[["render",U]]);export{M as default};
