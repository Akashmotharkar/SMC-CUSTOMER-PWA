/* ==========================================================
   CUSTOMER PWA SERVICE WORKER
   ========================================================== */
const CACHE_NAME = "customer-pwa-v1.0.1";

const BASE = "/SMC-CUSTOMER-PWA";

const ASSETS = [

    BASE + "/",

    BASE + "/index.html",

    BASE + "/manifest.json",

    BASE + "/api.js",

    BASE + "/js/firebase/firebase-config.js",

    BASE + "/js/firebase/firebase-app.js",

    BASE + "/js/firebase/firebase-messaging.js",

    BASE + "/icons/icon-72.png",

    BASE + "/icons/icon-96.png",

    BASE + "/icons/icon-128.png",

    BASE + "/icons/icon-144.png",

    BASE + "/icons/icon-152.png",

    BASE + "/icons/icon-192.png",

    BASE + "/icons/icon-384.png",

    BASE + "/icons/icon-512.png"

];

/* ==========================================================
   INSTALL
   ========================================================== */

self.addEventListener(

    "install",

    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)

                .then(cache => {

                    return cache.addAll(ASSETS);

                })

        );

        self.skipWaiting();

    }

);


/* ==========================================================
   ACTIVATE
   ========================================================== */

self.addEventListener(

    "activate",

    event => {

        event.waitUntil(

            caches.keys()

                .then(keys => {

                    return Promise.all(

                        keys.map(key => {

                            if (

                                key !== CACHE_NAME

                            ) {

                                return caches.delete(key);

                            }

                        })

                    );

                })

        );

        self.clients.claim();

    }

);


/* ==========================================================
   FETCH
   ========================================================== */

self.addEventListener(

    "fetch",

    event => {

        if (

            event.request.method !== "GET"

        ) {

            return;

        }

        const url =

            new URL(

                event.request.url

            );

        /* Don't cache external requests */

        if (

            url.origin !==

            self.location.origin

        ) {

            return;

        }

        /* Don't cache Apps Script API */

        if (

            url.searchParams.has("action")

        ) {

            return;

        }

        event.respondWith(

            caches.match(

                event.request

            )

            .then(response => {

                if (

                    response

                ) {

                    return response;

                }

                return fetch(

                    event.request

                )

                .then(networkResponse => {

                    if (

                        networkResponse.ok

                    ) {

                        caches.open(

                            CACHE_NAME

                        )

                        .then(cache => {

                            cache.put(

                                event.request,

                                networkResponse.clone()

                            );

                        });

                    }

                    return networkResponse;

                })

                .catch(() => {

                    if (

                        event.request.mode ===

                        "navigate"

                    ) {

                        return caches.match(BASE + "/index.html");

                    }

                });

            })

        );

    }

);

/* ==========================================================
   MESSAGE
   ========================================================== */

self.addEventListener(

    "message",

    event => {

        if (

            event.data === "SKIP_WAITING"

        ) {

            self.skipWaiting();

        }

    }

);

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
  console.log("[firebase-messaging-sw] Background Message",payload);

  const notification = {
       title:
           payload.data?.title ||
           payload.notification?.title ||
           "Milk Collection",
   
       body:
           payload.data?.body ||
           payload.notification?.body ||
           ""
   };

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
