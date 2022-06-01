import{G as f,u as g,a as $,r as e,R as S,b as B,L as z,c as L}from"./index.c437e536.js";import{c as _,a as v,F as C,b as k}from"./formik.esm.0d4c661d.js";const j="_blog_ncjih_1",P="_edit_ncjih_29",F="_buttons_ncjih_51",T="_icon_ncjih_61";var b={blog:j,edit:P,buttons:F,icon:T};const I="_icon_dftfj_1";var R={icon:I};function y(t){return f({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]})(t)}function A(t){const s=g(r=>r.user.token),a=$(),m=t.id,l=async()=>{try{const r=await fetch(`https://blogaryan.herokuapp.com/user/${m}`,{method:"DELETE",headers:{authorization:`BEARER ${s}`}});if(a(-1),!r.ok)throw new Error("Could not delete blog page")}catch(r){console.log(r)}};return e.exports.createElement(y,{size:"30px",color:"red",className:R.icon,onClick:l})}const H="_error_1p36k_1",M="_form_1p36k_9";var E={error:H,form:M};function O(t){const[s,a]=e.exports.useState(!1),m=g(o=>o.user.token),l=async o=>{try{if(!(await fetch(`https://blogaryan.herokuapp.com/blogs/comment/${t.blogId}`,{method:"POST",body:JSON.stringify({comment:o.comment}),headers:{"Content-Type":"application/json",authorization:`BEARER ${m}`}})).ok)throw new Error("Could not create new comment");t.toggler()}catch(c){console.log(c)}},r=_().shape({comment:v().required("Your comment is empty!")});return e.exports.createElement("section",{className:E.form},e.exports.createElement(C,{initialValues:{comment:""},validationSchema:r,validateOnChange:!1,validateOnBlur:!1,onSubmit:o=>{l(o),a(!0),setTimeout(()=>{a(!1)},3e3)}},({errors:o,handleBlur:c,handleChange:i,values:u})=>e.exports.createElement(k,null,e.exports.createElement("label",{htmlFor:"comment"}," Add a Comment"),e.exports.createElement("textarea",{name:"comment",onChange:i,onBlur:c,value:u.comment}),o.comment&&e.exports.createElement("div",{className:E.error},o.comment),e.exports.createElement("button",{className:"btn",type:"submit",disabled:s},"Comment"))))}const D="_item_jxtt1_1",V="_user_jxtt1_13",q="_span_jxtt1_41",G="_icon_jxtt1_47";var p={item:D,user:V,span:q,icon:G},J="/myblog/assets/user-img.71898c51.png";function N(t){return f({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"}}]})(t)}function U(t){const[s,a]=e.exports.useState(!1),m=g(o=>o.user.token),l=async o=>{try{if(!(await fetch(`https://blogaryan.herokuapp.com/blogs/comment/${t.commentId}`,{method:"PATCH",body:JSON.stringify({comment:o.comment}),headers:{"Content-Type":"application/json",authorization:`BEARER ${m}`}})).ok)throw new Error("Could not update comment");t.editToggle(),t.toggler()}catch(c){console.log(c)}},r=_().shape({comment:v().required("Your comment is empty!")});return e.exports.createElement("section",{className:E.form},e.exports.createElement(C,{initialValues:{comment:t.comment},validationSchema:r,validateOnChange:!1,validateOnBlur:!1,onSubmit:o=>{l(o),a(!0),setTimeout(()=>{a(!1)},3e3)}},({errors:o,handleBlur:c,handleChange:i,values:u})=>e.exports.createElement(k,null,e.exports.createElement("label",{htmlFor:"comment"}," Edit Comment"),e.exports.createElement("textarea",{name:"comment",onChange:i,onBlur:c,value:u.comment}),o.comment&&e.exports.createElement("div",{className:E.error},o.comment),e.exports.createElement("button",{className:"btn",type:"submit",disabled:s},"Comment"))))}function Y(t){const s=g(n=>n.user.token),m=g(n=>n.user.id)===t.comment.user._id,[l,r]=e.exports.useState(!1);function o(n){return n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}const c=()=>{r(n=>!n)},i=async()=>{try{if(!(await fetch(`https://blogaryan.herokuapp.com/blogs/comment/${t.comment._id}`,{method:"DELETE",headers:{authorization:`BEARER ${s}`}})).ok)throw new Error("Could not delete comment");t.toggler()}catch(n){console.log(n)}},u=new Date(t.comment.date).toLocaleString();return e.exports.createElement("div",{className:p.item},e.exports.createElement("div",{className:p.user},e.exports.createElement("img",{src:J,alt:"Icon"}),e.exports.createElement("h3",null,o(t.comment.user.firstName)+" "+o(t.comment.user.lastName)+" ",e.exports.createElement("span",{className:p.span},u),e.exports.createElement("span",null,m&&e.exports.createElement(e.exports.Fragment,null,e.exports.createElement(N,{size:"20px",color:"grey",className:p.icon,onClick:c}),e.exports.createElement(y,{size:"20px",color:"grey",className:p.icon,onClick:i}))))),l?e.exports.createElement(U,{commentId:t.comment._id,comment:t.comment.content,toggler:t.toggler,editToggle:c}):e.exports.createElement("p",null,t.comment.content))}const K="_comments_1r48b_1",Q="_btn_1r48b_13",W="_container_1r48b_15",X="_active_1r48b_59";var d={comments:K,btn:Q,container:W,active:X};function Z(t){const{comments:s}=t,a=g(n=>n.user.token),[m,l]=e.exports.useState(0),r=5,o=m*r,c=s.length?s.length:1,i=Math.ceil(c/r),u=({selected:n})=>{l(n)};return e.exports.createElement("div",{className:d.comments},e.exports.createElement("h2",null,"Comments"),a?e.exports.createElement(O,{blogId:t.blogId,toggler:t.toggler}):e.exports.createElement("h3",null,"Login to comment"),s&&e.exports.createElement(e.exports.Fragment,null,s.slice(o,o+r).map(n=>e.exports.createElement(Y,{comment:n,key:n._id,toggler:t.toggler})),e.exports.createElement(S,{previousLabel:"Previous",nextLabel:"Next",pageCount:i,onPageChange:u,containerClassName:d.container,previousLinkClassName:d.btn,nextLinkClassName:d.btn,activeClassName:d.active})))}const oe=()=>{const t=B(),{id:s}=t,[a,m]=e.exports.useState(null),l=g(h=>h.user),[r,o]=e.exports.useState(!1),c=()=>{o(h=>!h)};e.exports.useEffect(()=>{(async()=>{try{const x=await fetch(`https://blogaryan.herokuapp.com/blogs/blog/${s}`);if(!x.ok)throw new Error("Could not fetch blog page");const w=await x.json();m(w.blog)}catch(x){console.log(x)}})()},[s,r]);const i=e.exports.createElement("div",{className:b.buttons},e.exports.createElement(z,{to:`/edit/${s}`},e.exports.createElement(N,{className:b.icon,size:"30px"})),e.exports.createElement(A,{id:s})),u=!!a;let n=!1;return!!l.token&&a&&(n=a.author._id===l.id),e.exports.createElement(e.exports.Fragment,null,u?e.exports.createElement(e.exports.Fragment,null,e.exports.createElement("div",{className:b.blog},e.exports.createElement("h1",null,a.title),e.exports.createElement("h2",null,a.author.firstName+" "+a.author.lastName," "),e.exports.createElement("h3",null,a.description),n&&i,e.exports.createElement("p",null,a.article)),e.exports.createElement(Z,{blogId:s,comments:a.comments,toggler:c})):e.exports.createElement(L,null))};export{oe as default};
