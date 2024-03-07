import{S as h}from"./sweetalert2.all-hWzV_FaV.js";import{_ as k,g as L,m as E,r,o as d,c as i,b as n,a as e,n as c,F as b,i as w,t as m,w as S,k as U,l as T,d as A,h as g,p as v}from"./index-0oAfesL3.js";import{c as V}from"./cartStore-2Wbd2u4T.js";var B={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"dorayu",BASE_URL:"/vite-deploy-week07/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:F,VITE_PATH:I}=B,N={data(){return{form:{data:{user:{name:"",email:"",tel:"",address:""},message:""}}}},computed:{...L(V,["cartList","status","isLoading"])},methods:{...E(V,["getCarts","deleteAllCarts","removeCartItem","updateCart"]),isPhone(t){return/^(09)[0-9]{8}$/.test(t)?!0:"需要正確的電話號碼"},createOrder(){const t=`${F}/api/${I}/order`,{form:a}=this;this.cartList.length!==0&&this.axios.post(t,a).then(u=>{h.fire(u.data.message),this.$refs.form.resetForm(),this.form.data.message="",this.getCarts()}).catch(u=>{h.fire(u.response.data.message)})}},mounted(){this.getCarts()}},q={class:"container my-4"},D=e("h2",null,"購物車",-1),P={class:"row"},R={class:"col-7"},M={class:"text-end"},O={key:0,class:"bg-light my-4 p-4"},H={class:"table align-middle"},Q=e("thead",null,[e("tr",null,[e("th"),e("th",null,"圖片"),e("th",null,"品名"),e("th",{style:{width:"150px"}},"數量/單位"),e("th",{class:"text-end"},"單價")])],-1),z=["disabled","onClick"],j=["src"],G={class:"input-group input-group-sm"},J={class:"input-group mb-3"},K=["onUpdate:modelValue","onBlur"],W={class:"input-group-text",id:"basic-addon2"},X={class:"text-end"},Y=e("td",{colspan:"4",class:"text-end"},"總計",-1),Z={class:"text-end"},$=e("td",{colspan:"4",class:"text-end text-success"},"折扣價",-1),ee={class:"text-end text-success"},se={key:1,class:"bg-light my-4 p-4"},te={class:"col-5"},ae={class:"mb-3"},le=e("label",{for:"email",class:"form-label"},"Email",-1),oe={class:"mb-3"},ne=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),de={class:"mb-3"},re=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),ie={class:"mb-3"},ce=e("label",{for:"address",class:"form-label"},"收件人地址",-1),me={class:"mb-3"},ue=e("label",{for:"message",class:"form-label"},"留言",-1),pe=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-primary"},"Submit")],-1);function _e(t,a,u,fe,o,f){const y=r("VueLoading"),x=r("font-awesome-icon"),p=r("VField"),_=r("ErrorMessage"),C=r("VForm");return d(),i(b,null,[n(y,{active:t.isLoading},null,8,["active"]),e("div",q,[D,e("div",P,[e("div",R,[e("div",M,[e("button",{class:c(["btn btn-outline-danger",{disabled:t.cartList.carts.length===0}]),type:"button",onClick:a[0]||(a[0]=(...s)=>t.deleteAllCarts&&t.deleteAllCarts(...s))},"清空購物車",2)]),t.cartList.carts&&t.cartList.carts.length>0?(d(),i("div",O,[e("table",H,[Q,e("tbody",null,[(d(!0),i(b,null,w(t.cartList.carts,s=>(d(),i("tr",{key:s.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",disabled:s.id===t.status.loadQty,onClick:l=>t.removeCartItem(s.id)},[s.id===t.status.loadQty?(d(),U(x,{key:0,icon:["fas","spinner"],"spin-pulse":""})):T("",!0),A(" x ")],8,z)]),e("td",null,[e("img",{class:"img-cart",src:s.product.imageUrl,alt:""},null,8,j)]),e("td",null,m(s.product.title),1),e("td",null,[e("div",G,[e("div",J,[g(e("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":l=>s.qty=l,onBlur:l=>t.updateCart(s)},null,40,K),[[v,s.qty,void 0,{number:!0}]]),e("span",W,m(s.product.unit),1)])])]),e("td",X,m(s.final_total),1)]))),128))]),e("tfoot",null,[e("tr",null,[Y,e("td",Z,m(t.cartList.total),1)]),e("tr",null,[$,e("td",ee,m(t.cartList.final_total),1)])])])])):(d(),i("div",se,"購物車沒有任何品項"))]),e("div",te,[n(C,{onSubmit:f.createOrder,ref:"form"},{default:S(({errors:s})=>[e("div",ae,[le,n(p,{type:"email",class:c(["form-control",{"is-invalid":s.email}]),id:"email",name:"email",placeholder:"請輸入Email",rules:"email|required",modelValue:o.form.data.user.email,"onUpdate:modelValue":a[1]||(a[1]=l=>o.form.data.user.email=l)},null,8,["class","modelValue"]),n(_,{class:"invalid-feedback",name:"email"})]),e("div",oe,[ne,n(p,{type:"text",class:c(["form-control",{"is-invalid":s.收件人姓名}]),id:"name",name:"收件人姓名",placeholder:"請輸入姓名",rules:"required",modelValue:o.form.data.user.name,"onUpdate:modelValue":a[2]||(a[2]=l=>o.form.data.user.name=l)},null,8,["class","modelValue"]),n(_,{class:"invalid-feedback",name:"收件人姓名"})]),e("div",de,[re,n(p,{type:"text",class:c(["form-control",{"is-invalid":s.tel}]),id:"tel",name:"tel",placeholder:"請輸入電話: 09xxxxxxxxx",rules:f.isPhone,modelValue:o.form.data.user.tel,"onUpdate:modelValue":a[3]||(a[3]=l=>o.form.data.user.tel=l)},null,8,["class","rules","modelValue"]),n(_,{class:"invalid-feedback",name:"tel"})]),e("div",ie,[ce,n(p,{type:"text",class:c(["form-control",{"is-invalid":s.收件人地址}]),id:"address",name:"收件人地址",placeholder:"請輸入地址",rules:"required",modelValue:o.form.data.user.address,"onUpdate:modelValue":a[4]||(a[4]=l=>o.form.data.user.address=l)},null,8,["class","modelValue"]),n(_,{class:"invalid-feedback",name:"收件人地址"})]),e("div",me,[ue,g(e("textarea",{name:"message",id:"message",class:"form-control",cols:"30",rows:"5","onUpdate:modelValue":a[5]||(a[5]=l=>o.form.data.message=l)},null,512),[[v,o.form.data.message]])]),pe]),_:1},8,["onSubmit"])])])])],64)}const ve=k(N,[["render",_e]]);export{ve as default};