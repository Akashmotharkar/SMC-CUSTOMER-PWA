/*
==========================================================
APPLICATION CONTROLLER
==========================================================
*/

const App = {

customer:null,

currentView:"",

async initialize(){

UI.initialize();

const customer=
Storage.getCustomer();

if(!customer){

UI.renderLogin();

return;

}

this.customer=customer;

await this.refreshProfile();

},

async refreshProfile(){

Utils.showLoading();

try{

const result=
await API.profile(
this.customer.customerId
);

Utils.hideLoading();

if(!result.success){

Storage.clear();

UI.renderLogin();

Utils.showToast(result.message);

return;

}

this.customer=result.customer;

Storage.setCustomer(
this.customer
);

this.loadDashboard();

}

catch(e){

Utils.hideLoading();

console.error(e);

UI.renderLogin();

Utils.showToast(
"Unable to connect to server."
);

}

},

async loadDashboard(){

this.currentView="dashboard";

UI.renderDashboard(
this.customer
);

this.bindNavigation();

await this.refreshDashboard();

},

bindNavigation(){

const home=
document.getElementById(
"navHome"
);

if(home){

home.onclick=()=>{

this.loadDashboard();

};

}

const ledger=
document.getElementById(
"navLedger"
);

if(ledger){

ledger.onclick=()=>{

Utils.showToast(
"Ledger screen coming next."
);

};

}

const bills=
document.getElementById(
"navBills"
);

if(bills){

bills.onclick=()=>{

Utils.showToast(
"Bills screen coming next."
);

};

}

const alerts=
document.getElementById(
"navNotifications"
);

if(alerts){

alerts.onclick=()=>{

Utils.showToast(
"Notifications screen coming next."
);

};

}

const profile=
document.getElementById(
"navProfile"
);

if(profile){

profile.onclick=()=>{

Utils.showToast(
"Profile screen coming next."
);

};

}

},

async refreshDashboard(){

try{

const result=
await API.profile(
this.customer.customerId
);

if(!result.success){

Utils.showToast(result.message);

return;

}

this.customer=result.customer;

Storage.setCustomer(
this.customer
);

UI.renderDashboardData(
this.customer
);

}

catch(e){

console.error(e);

Utils.showToast(
"Unable to refresh."
);

}

},

logout(){

Storage.clear();

this.customer=null;

this.currentView="";

UI.renderLogin();

}

};

document.addEventListener(

"DOMContentLoaded",

function(){

App.initialize();

}

);
