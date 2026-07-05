/*
==========================================================
APPLICATION
==========================================================
*/

const App = {

version: "1.0.0",

async initialize() {

UI.initialize();

Utils.showLoading();

API.initialize(
"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
);

if (Auth.restoreSession()) {

await this.loadDashboard();

}
else {

Utils.hideLoading();

UI.renderLogin();

}

this.bindEvents();

},

bindEvents() {

const refreshButton =
document.getElementById(
"refreshButton"
);

if (refreshButton) {

refreshButton.addEventListener(
"click",
() => {

if (Auth.isLoggedIn()) {

this.loadDashboard();

}

}
);

}

},

async loadDashboard() {

if (!Auth.isLoggedIn()) {

UI.renderLogin();

return;

}

Utils.showLoading();

try {

const customer =
Auth.getCustomer();

UI.renderDashboard(
customer
);

const dashboard =
await API.getDashboard(
customer.customerId
);

if (
dashboard &&
dashboard.success
) {

UI.renderDashboardData(
dashboard.data
);

Storage.setLastSync();

}

else {

Utils.showToast(
dashboard.message ||
"Unable to load dashboard."
);

}

}
catch (e) {

Utils.showToast(
e.message ||
"Unable to connect."
);

}
finally {

Utils.hideLoading();

}

}

};

document.addEventListener(
"DOMContentLoaded",
function() {

App.initialize();

});
