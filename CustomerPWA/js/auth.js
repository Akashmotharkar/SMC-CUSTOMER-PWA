/*
==========================================================
AUTHENTICATION
==========================================================
*/

const Auth = {

customer: null,

async login(phone) {

phone = String(phone || "").trim();

if (phone === "") {

Utils.showToast(
"Enter mobile number."
);

return false;

}

Utils.showLoading();

try {

const result =
await API.login(phone);

Utils.hideLoading();

if (
!result ||
!result.success
) {

Utils.showToast(
result && result.message
? result.message
: "Login failed."
);

return false;

}

this.customer =
result.customer;

Storage.setCustomer(
result.customer
);

Utils.showToast(
"Login successful."
);

return true;

}

catch (e) {

Utils.hideLoading();

Utils.showToast(
e.message ||
"Unable to connect."
);

return false;

}

},

logout() {

this.customer = null;

Storage.clear();

location.reload();

},

restoreSession() {

const customer =
Storage.getCustomer();

if (!customer) {

return false;

}

this.customer =
customer;

return true;

},

isLoggedIn() {

return (
this.customer !== null
);

},

getCustomer() {

return this.customer;

}

};
