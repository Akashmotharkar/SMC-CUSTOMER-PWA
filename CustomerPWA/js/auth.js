/*
==========================================================
AUTHENTICATION SERVICE
==========================================================
*/

const Auth = {

async login(phone){

phone=String(phone||"").trim();

if(phone===""){

Utils.showToast(
"Please enter mobile number."
);

return false;

}

if(phone.length!==10){

Utils.showToast(
"Enter valid mobile number."
);

return false;

}

try{

Utils.showLoading();

const result=
await API.login(phone);

Utils.hideLoading();

if(!result.success){

Utils.showToast(
result.message ||
"Login failed."
);

return false;

}

Storage.setCustomer(
result.customer
);

App.customer=
result.customer;

return true;

}

catch(e){

Utils.hideLoading();

console.error(e);

Utils.showToast(
"Unable to connect to server."
);

return false;

}

},

logout(){

Storage.clear();

App.customer=null;

App.currentView="";

UI.renderLogin();

},

getCustomer(){

return Storage.getCustomer();

},

isLoggedIn(){

return Storage.isLoggedIn();

}

};
