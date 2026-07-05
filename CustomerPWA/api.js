/* ==========================================================
   API CLIENT
   ========================================================== */

(function () {

    const API = {};

    const BASE_URL =
        "YOUR_APPS_SCRIPT_WEBAPP_URL";

    async function get(params) {

        const url =
            BASE_URL + "?" +
            new URLSearchParams(params);

        const response =
            await fetch(url);

        return await response.json();

    }

    async function post(body) {

        const response =
            await fetch(BASE_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)

            });

        return await response.json();

    }

    API.login = function (mobile) {

        return post({

            action: "login",

            mobile: mobile

        });

    };

    API.saveFcmToken =
        function (

            mobile,

            token

        ) {

            return post({

                action: "registerToken",

                mobile: mobile,

                token: token

            });

        };

    API.getBill =
        function (

            mobile,

            month,

            year

        ) {

            return get({

                action: "bill",

                mobile: mobile,

                month: month,

                year: year

            });

        };

    API.getNoticeBoard =
        function () {

            return get({

                action: "notice"

            });

        };

    API.getNotificationHistory =
        function (mobile) {

            return get({

                action: "history",

                mobile: mobile

            });

        };

    API.getConfig =
        function () {

            return get({

                action: "config"

            });

        };

    window.API = API;

})();
