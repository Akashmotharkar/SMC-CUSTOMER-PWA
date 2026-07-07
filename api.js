/*alert("api.js loaded 3");*/
/* ==========================================================
 * API CLIENT
 * ==========================================================
 */

(function () {

    "use strict";

    const API = {};

    /* ======================================================
     * CONFIGURATION
     * ====================================================== */

    const BASE_URL =
        "https://script.google.com/macros/s/AKfycbzMhJrNMURve4OeTjECogdkzxUNJV8O5UN4k60EP2wP1V1Kd-eFDKVzYD4Rt5jL9A-w/exec";


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

    API.login =
    function (mobile) {

        return request(

            "GET",

            {

                action: "login",

                mobile: mobile

            }

        );

    };


    API.registerToken =
        function (

            mobile,

            token

        ) {

            return request(

                "POST",

                null,

                {

                    action: "registerToken",

                    mobile: mobile,

                    token: token

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

                    mobile: mobile,

                    month: month,

                    year: year

                }

            );

        };


    /* ======================================================
     * NOTICE
     * ====================================================== */

    API.getNotice =
        function () {

            return request(

                "GET",

                {

                    action: "notice"

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

                    mobile: mobile

                }

            );

        };


    /* ======================================================
     * CONFIG
     * ====================================================== */

    API.getConfig =
        function () {

            return request(

                "GET",

                {

                    action: "config"

                }

            );

        };


    window.API = API;

})();
