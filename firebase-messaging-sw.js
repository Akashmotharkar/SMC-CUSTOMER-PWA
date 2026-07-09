/* ==========================================================
 * FIREBASE MESSAGING SERVICE WORKER *
 * Customer PWA
 * ==========================================================
 */

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);


/* ==========================================================
 * FIREBASE CONFIG
 * ==========================================================
 */

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
 * BACKGROUND MESSAGE
 * ==========================================================
 */

messaging.onBackgroundMessage(function (payload) {
  
  console.log("BACKGROUND MESSAGE RECEIVED");

  console.log(
    "[firebase-messaging-sw] Background Message",
    payload
  );

  const notification =
    payload.notification || {};

  const data =
    payload.data || {};

  self.registration.showNotification(

    notification.title || "Milk Collection",

    {

      body:

        notification.body || "",

      icon: "/SMC-CUSTOMER-PWA/icons/icon-192.png",
      badge: "/SMC-CUSTOMER-PWA/icons/icon-192.png",

      tag:

        data.type || "milk",

      renotify:

        true,

      requireInteraction:

        false,

      data:

        {

          url: "/SMC-CUSTOMER-PWA/",

          ...data

        }

    }

  );

});


/* ==========================================================
 * NOTIFICATION CLICK
 * ==========================================================
 */

self.addEventListener(

  "notificationclick",

  function (event) {

    event.notification.close();

    const targetUrl =

      event.notification.data.url || "/";

    event.waitUntil(

      clients.matchAll({

        type: "window",

        includeUncontrolled: true

      })

      .then(function (clientList) {

        for (

          const client of clientList

        ) {

          if (

            client.url.includes(targetUrl)

          ) {

            return client.focus();

          }

        }

        return clients.openWindow(

          targetUrl

        );

      })

    );

  }

);


/* ==========================================================
 * NOTIFICATION CLOSE
 * ==========================================================
 */

self.addEventListener(

  "notificationclose",

  function (event) {

    console.log(

      "Notification dismissed",

      event.notification.tag

    );

  }

);
