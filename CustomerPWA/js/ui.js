/*
==========================================================
UI SERVICE
==========================================================
*/

const UI = {

app:null,

initialize:function(){

this.app=
document.getElementById("app");

},

renderLogin:function(){

this.app.innerHTML=
Views.showLogin();

document
.getElementById("loginButton")
.addEventListener(
"click",
async function(){

const phone=
document
.getElementById("loginPhone")
.value
.trim();

const success=
await Auth.login(phone);

if(success){

App.loadDashboard();

}

}
);

},

renderDashboard:function(customer){

this.app.innerHTML=

Views.showDashboard(customer)+

this.bottomNavigation("home");

},

renderDashboardData:function(data){

const container=
document.getElementById(
"dashboardContent"
);

if(!container){
return;
}

container.innerHTML=

`
<div class="card">

<div class="card-title">
Today's Summary
</div>

<div class="row">
<span>Milk</span>
<span class="value">
${Utils.formatNumber(data.milk)} L
</span>
</div>

<div class="row">
<span>Rate</span>
<span class="value">
${Utils.formatCurrency(data.rate)}
</span>
</div>

<div class="row">
<span>Amount</span>
<span class="value">
${Utils.formatCurrency(data.amount)}
</span>
</div>

<div class="row">
<span>Balance</span>
<span class="value">
${Utils.formatCurrency(data.balance)}
</span>
</div>

</div>

`;

},

bottomNavigation:function(active){

return `

<div class="bottom-nav">

<button
id="navHome"
class="${active==="home"?"active":""}">

Home

</button>

<button
id="navLedger"
class="${active==="ledger"?"active":""}">

Ledger

</button>

<button
id="navBills"
class="${active==="bills"?"active":""}">

Bills

</button>

<button
id="navNotifications"
class="${active==="notifications"?"active":""}">

Alerts

</button>

<button
id="navProfile"
class="${active==="profile"?"active":""}">

Profile

</button>

</div>

`;

}

};
