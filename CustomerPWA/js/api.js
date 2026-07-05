/**
 * ==========================================================
 * API CONFIGURATION
 * ==========================================================
 */

const API = {

    url:
        "https://script.google.com/macros/s/AKfycbzMhJrNMURve4OeTjECogdkzxUNJV8O5UN4k60EP2wP1V1Kd-eFDKVzYD4Rt5jL9A-w/exec",



    async post(action, data = {}) {

        const response =
            await fetch(
                this.url,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        action: action,

                        ...data

                    })

                }
            );

        return await response.json();

    },



    login(mobile) {

        return this.post(

            "login",

            {

                mobile: mobile

            }

        );

    },



    profile(customerId) {

        return this.post(

            "profile",

            {

                customerId: customerId

            }

        );

    },



    ledger(customerId) {

        return this.post(

            "ledger",

            {

                customerId: customerId

            }

        );

    },



    bills(customerId) {

        return this.post(

            "bills",

            {

                customerId: customerId

            }

        );

    },



    notifications(customerId) {

        return this.post(

            "notifications",

            {

                customerId: customerId

            }

        );

    },



    markRead(notificationId) {

        return this.post(

            "readNotification",

            {

                notificationId:
                    notificationId

            }

        );

    },



    deleteNotification(notificationId) {

        return this.post(

            "deleteNotification",

            {

                notificationId:
                    notificationId

            }

        );

    }

};
