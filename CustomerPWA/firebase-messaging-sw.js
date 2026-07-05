/* ==========================================================
   FIREBASE MESSAGING SERVICE WORKER
   Customer PWA
   ========================================================== */

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);


/* ==========================================================
   FIREBASE CONFIG
   ========================================================== */

firebase.initializeApp({

    apiKey: "AIzaSyAPBu9l8F8OQb7zMMRVKIquwLUla_QbFgc",

    authDomain:
        "milkcollectionpwa-a2fb5.firebaseapp.com",

    projectId:
        "milkcollectionpwa-a2fb5",

    storageBucket:
        "milkcollectionpwa-a2fb5.firebasestorage.app",

    messagingSenderId:
        "191950335737",

    appId:
        "1:191950335737:web:cd727cbfa1c8604bd13c28"

});


const messaging =
    firebase.messaging();


/* ==========================================================
   BACKGROUND NOTIFICATION
   ========================================================== */

messaging.onBackgroundMessage(function (payload) {

    const notification =
        payload.notification || {};

    self.registration.showNotification(

        notification.title || "Milk Collection",

        {

            body:
                notification.body || "",

            icon:
                "/icons/icon-192.png",

            badge:
                "/icons/badge.png",

            data:
                payload.data || {}

        }

    );

});


/* ==========================================================
   NOTIFICATION CLICK
   ========================================================== */

self.addEventListener(

    "notificationclick",

    function (event) {

        event.notification.close();

        event.waitUntil(

            clients.matchAll({

                type: "window",

                includeUncontrolled: true

            })

            .then(function (clientList) {

                for (const client of clientList) {

                    if ("focus" in client) {

                        return client.focus();

                    }

                }

                return clients.openWindow("/");

            })

        );

    }

);
