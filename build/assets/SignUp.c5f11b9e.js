import{e as g,a as f,r as e,F as h,C as E,L as N,f as x}from"./index.5c5cff56.js";import{c as S,a as s,F as w,b as y}from"./formik.esm.0f7b73f4.js";import{E as b,c as i}from"./ErrorModal.445f6efa.js";import{F as r}from"./FormikField.9d123fc7.js";function v(){const m=g(),c=f(),[o,n]=e.exports.useState(null),p=S().shape({firstName:s().required("This field is Required!"),lastName:s().required("This field is Required!"),email:s().email("Invalid email").required("This field is Required!"),password:s().min(8,"Too Short!").required("This field is Required!")}),d=async a=>{try{const t=await fetch("https://blogaryan.herokuapp.com/user/signup",{method:"POST",body:JSON.stringify({email:a.email,password:a.password,firstName:a.firstName,lastName:a.lastName}),headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error("Could not Sign Up!");const l=await t.json();localStorage.setItem("userData",JSON.stringify(l));const u=new Date(new Date().getTime()+1e3*60*60);localStorage.setItem("timer",JSON.stringify({timer:u.toISOString()})),m(x.login(l)),c("../",{replace:!0})}catch(t){console.log(t),n(t.message)}};return e.exports.createElement(h,null,!!o&&e.exports.createElement(b,{error:o,onClear:()=>n(!1)}),e.exports.createElement(E,{className:i.card},e.exports.createElement("div",{className:i.divisions},e.exports.createElement("h1",null,"Sign Up")),e.exports.createElement(w,{initialValues:{firstName:"",lastName:"",email:"",password:""},validationSchema:p,onSubmit:a=>{d(a)}},({errors:a,touched:t})=>e.exports.createElement(y,null,e.exports.createElement(r,{name:"firstName",label:"First Name"}),e.exports.createElement(r,{name:"lastName",label:"Last Name"}),e.exports.createElement(r,{name:"email",label:"Email",type:"email"}),e.exports.createElement(r,{name:"password",label:"Password",type:"password"}),e.exports.createElement("button",{className:"btn",type:"submit"},"Sign Up"))),e.exports.createElement("div",{className:i.divisions},e.exports.createElement(N,{to:"../login"},"Sign In if you have an existing account"))))}export{v as default};
