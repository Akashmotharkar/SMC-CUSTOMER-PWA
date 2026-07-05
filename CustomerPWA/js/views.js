/*
==========================================================
APPLICATION VIEWS
==========================================================
*/

const Views = {

showLogin:function(){

return `

<div class="card">

<div class="card-title">
Customer Login
</div>

<input
id="loginPhone"
type="tel"
maxlength="10"
placeholder="Enter Mobile Number"
class="text-box">

<button
id="loginButton"
class="primary-button">

Login

</button>

</div>

`;

},

showDashboard:function(customer){

return `

<div class="card">

<div class="card-title">
Welcome
</div>

<div class="row">
<span>Name</span>
<span class="value">${customer.name}</span>
</div>

<div class="row">
<span>Customer ID</span>
<span class="value">${customer.customerId}</span>
</div>

<div class="row">
<span>Mobile</span>
<span class="value">${customer.phone}</span>
</div>

</div>

<div id="dashboardContent"></div>

`;

},

showLedger:function(){

return `

<div class="card">

<div class="card-title">
Ledger
</div>

<div id="ledgerContent">

Loading...

</div>

</div>

`;

},

showBills:function(){

return `

<div class="card">

<div class="card-title">
Bills
</div>

<div id="billContent">

Loading...

</div>

</div>

`;

},

showNotifications:function(){

return `

<div class="card">

<div class="card-title">
Notifications
</div>

<div id="notificationContent">

Loading...

</div>

</div>

`;

},

showProfile:function(customer){

return `

<div class="card">

<div class="card-title">
Profile
</div>

<div class="row">
<span>Name</span>
<span class="value">${customer.name}</span>
</div>

<div class="row">
<span>Customer ID</span>
<span class="value">${customer.customerId}</span>
</div>

<div class="row">
<span>Phone</span>
<span class="value">${customer.phone}</span>
</div>

<br>

<button
id="logoutButton"
class="danger-button">

Logout

</button>

</div>

`;

}

};
