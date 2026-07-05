/*
==========================================================
GOOGLE APPS SCRIPT API
==========================================================
*/

const API = {

url: "",

initialize: function(url) {

this.url = url;

},

async request(action, data) {

if (!this.url) {
throw new Error(
"API URL not configured."
);
}

const payload = {
action: action,
data: data || {}
};

const response =
await fetch(this.url, {
method: "POST",
headers: {
"Content-Type":
"application/json"
},
body:
JSON.stringify(payload)
});

if (!response.ok) {

throw new Error(
"Network Error"
);

}

return await response.json();

},

login: function(phone) {

return this.request(
"login",
{
phone: phone
}
);

},

getDashboard: function(customerId) {

return this.request(
"dashboard",
{
customerId: customerId
}
);

},

getNotifications: function(customerId) {

return this.request(
"notifications",
{
customerId: customerId
}
);

},

markNotificationRead: function(notificationId) {

return this.request(
"markNotificationRead",
{
notificationId:
notificationId
}
);

},

deleteNotification: function(notificationId) {

return this.request(
"deleteNotification",
{
notificationId:
notificationId
}
);

},

getBills: function(customerId) {

return this.request(
"bills",
{
customerId: customerId
}
);

},

getHistory: function(customerId) {

return this.request(
"history",
{
customerId: customerId
}
);

}

};
