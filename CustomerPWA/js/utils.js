/*
==========================================================
UTILITY FUNCTIONS
==========================================================
*/

const Utils = {

showToast:function(message,duration){

duration=duration||3000;

const toast=
document.getElementById("toast");

if(!toast){
return;
}

toast.textContent=message;

toast.classList.add("show");

setTimeout(function(){

toast.classList.remove("show");

},duration);

},

formatDate:function(date){

if(!date){
return "";
}

const d=new Date(date);

return d.toLocaleDateString(
"en-IN",
{
day:"2-digit",
month:"short",
year:"numeric"
}
);

},

formatNumber:function(value){

const number=
Number(value)||0;

return number.toFixed(1);

},

formatCurrency:function(value){

const number=
Number(value)||0;

return "₹"+number.toFixed(2);

},

capitalize:function(text){

if(!text){
return "";
}

return text.charAt(0).toUpperCase()+
text.slice(1);

},

isOnline:function(){

return navigator.onLine;

},

showLoading:function(){

const loading=
document.getElementById("loading");

if(loading){

loading.style.display="flex";

}

},

hideLoading:function(){

const loading=
document.getElementById("loading");

if(loading){

loading.style.display="none";

}

},

uuid:function(){

return Date.now().toString(36)+
Math.random()
.toString(36)
.substring(2,10);

}

};

window.addEventListener(
"online",
function(){

Utils.showToast(
"Internet Connected"
);

}
);

window.addEventListener(
"offline",
function(){

Utils.showToast(
"Offline Mode"
);

}
);
