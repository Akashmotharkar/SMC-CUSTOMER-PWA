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

await this.refreshDashboard();

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
