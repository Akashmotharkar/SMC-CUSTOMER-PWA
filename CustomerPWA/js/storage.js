/*
==========================================================
LOCAL STORAGE SERVICE
==========================================================
*/

const Storage = {

KEYS:{

CUSTOMER_ID:"customer_id",

CUSTOMER_PHONE:"customer_phone",

CUSTOMER_NAME:"customer_name",

CUSTOMER_DATA:"customer_data",

NOTIFICATIONS:"notifications",

LAST_SYNC:"last_sync"

},

set:function(key,value){

localStorage.setItem(
key,
JSON.stringify(value)
);

},

get:function(key,defaultValue){

const value=
localStorage.getItem(key);

if(value===null){

return defaultValue;

}

try{

return JSON.parse(value);

}

catch(e){

return defaultValue;

}

},

remove:function(key){

localStorage.removeItem(key);

},

clear:function(){

localStorage.clear();

},

setCustomer:function(customer){

this.set(
this.KEYS.CUSTOMER_DATA,
customer
);

if(customer){

this.set(
this.KEYS.CUSTOMER_ID,
customer.customerId || ""
);

this.set(
this.KEYS.CUSTOMER_PHONE,
customer.phone || ""
);

this.set(
this.KEYS.CUSTOMER_NAME,
customer.name || ""
);

}

},

getCustomer:function(){

return this.get(
this.KEYS.CUSTOMER_DATA,
null
);

},

isLoggedIn:function(){

return this.getCustomer()!=null;

},

saveNotifications:function(list){

this.set(
this.KEYS.NOTIFICATIONS,
list || []
);

},

getNotifications:function(){

return this.get(
this.KEYS.NOTIFICATIONS,
[]
);

},

setLastSync:function(){

this.set(
this.KEYS.LAST_SYNC,
new Date().toISOString()
);

},

getLastSync:function(){

return this.get(
this.KEYS.LAST_SYNC,
null
);

}

};
