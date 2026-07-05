/*
==========================================================
UI SERVICE
==========================================================
*/

const UI = {

app:null,

initialize:function(){

this.app =
document.getElementById("app");

},

renderLogin:function(){

this.app.innerHTML =

`
<div class="card">

<div class="card-title">

Customer Login

</div>

<input
id="loginPhone"
type="tel"
placeholder="Mobile Number"
maxlength="10"
style="
width:100%;
padding:12px;
font-size:16px;
margin-bottom:12px;
">

<button
id="loginButton"
style="
width:100%;
padding:12px;
font-size:16px;
">

Login

</button>

</div>
`;

document
.getElementById("loginButton")
.addEventListener(
"click",
async function(){

const phone =
document
.getElementById("loginPhone")
.value;

const success =
await Auth.login(phone);

if(success){

App.loadDashboard();

}

});

},

renderDashboard:function(customer){

this.app.innerHTML =

`
<div class="card">

<div class="card-title">

Welcome

</div>

<div class="row">

<span>Name</span>

<span class="value">

${customer.name}

</span>

</div>

<div class="row">

<span>Customer ID</span>

<span class="value">

${customer.customerId}

</span>

</div>

<div class="row">

<span>Phone</span>

<span class="value">

${customer.phone}

</span>

</div>

</div>

<div id="dashboardContent">

</div>

<div class="bottom-nav">

<button
class="active">

Home

</button>

<button>

History

</button>

<button>

Bills

</button>

<button>

Notifications

</button>

</div>

`;

},

renderDashboardData:function(data){

const container =
document.getElementById(
"dashboardContent"
);

if(!container){

return;

}

container.innerHTML =

`
<div class="card">

<div class="card-title">

Today's Summary

</div>

<div class="row">

<span>Milk</span>

<span class="value">

${data.milk || 0} L

</span>

</div>

<div class="row">

<span>Rate</span>

<span class="value">

₹${data.rate || 0}

</span>

</div>

<div class="row">

<span>Amount</span>

<span class="value">

₹${data.amount || 0}

</span>

</div>

<div class="row">

<span>Balance</span>

<span class="value">

₹${data.balance || 0}

</span>

</div>

</div>
`;

}

};
