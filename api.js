/*alert("api.js loaded 3");*/
/* ==========================================================
 * API CLIENT
 * ==========================================================
 */

(function () {

    "use strict";

    const API = {};

    API.route = localStorage.getItem("route") || "";

    /* ======================================================
     * CONFIGURATION
     * ====================================================== */

    const BASE_URL =
"https://script.google.com/macros/s/AKfycbzlICxgwokRn6TSeMphL9-HK8_CXMLDAExseUNvcW0dwwn7tVS9lAdKlHCGoQMd6-8Gtg/exec";

    /* ======================================================
     * INTERNAL REQUEST
     * ====================================================== */

    async function request(method, params, body) {

        let url = BASE_URL;

        const options = {
            method: method,
            headers: {}
        };

        if (method === "GET") {

            url += "?" + new URLSearchParams(params);

        } else {

            options.headers["Content-Type"] =
                "application/json";

            options.body =
                JSON.stringify(body || {});
        }
        
                let response;
        
        try {
        
            response = await fetch(
                url,
                {
                    ...options,
                    redirect: "follow"
                }
            );
        
        }
        
        catch (err) {
        
            console.error("Fetch Error:", err);
        
            alert(err.message);
        
            throw err;
        
        }

        if (!response.ok) {

            throw new Error(
                "Server unavailable."
            );

        }

        const json =
            await response.json();

        if (json.success === false) {

            throw new Error(
                json.message ||
                "Request failed."
            );

        }

        return json;

    }

    /* ======================================================
     * AUTH
     * ====================================================== */

    API.login = async function (mobile) {

            const result =
                await request(
                    "GET",
                    {
                        action: "login",
                        mobile: mobile
                    }
                );
        
            API.route = result.route || "";
            
                localStorage.setItem(
                    "route",
                    API.route
                );
            
                return result;
            
            };
    
        
     
        API.registerToken = function (mobile, token) {
    
        return request(
            "GET",
            {
                action: "registerToken",
                route: API.route,
                mobile: mobile,
                token: token
            }
        );
    
    };


    /* ======================================================
     * REGISTER MOBILE
     * ====================================================== */
    
    API.registerMobileNumber = function (
    
        mobile,
    
        invoiceNo,
    
        invoiceAmount
    
    ) {
    
        return request(
    
            "POST",
    
            null,
    
            {
    
                action: "registerMobileNumber",
    
                mobile: mobile,
    
                invoiceNo: invoiceNo,
    
                invoiceAmount: invoiceAmount
    
            }
    
        );
    
    };


    /* ======================================================
     * CUSTOMER
     * ====================================================== */

    API.getBill =
        function (

            mobile,

            month,

            year

        ) {

            return request(

                "GET",

                {
                    action: "bill",
                    route: API.route,
                    mobile: mobile,
                    month: month,
                    year: year
                }

            );

        };


    /* ======================================================
     * NOTICE
     * ====================================================== */
    
    API.getNotice = function () {
    
        return request(
            "GET",
            {
                action: "notice",
                route: API.route
            }
        );
    
    };


    /* ======================================================
     * HISTORY
     * ====================================================== */

    API.getHistory =
        function (

            mobile

        ) {

            return request(

                "GET",

                {
                    action: "history",
                    route: API.route,
                    mobile: mobile
                }

            );

        };


    /* ======================================================
     * CONFIG
     * ====================================================== */
    
    API.getConfig = function () {
    
        return request(
            "GET",
            {
                action: "config",
                route: API.route
            }
        );
    
    };


    window.API = API;

})();
