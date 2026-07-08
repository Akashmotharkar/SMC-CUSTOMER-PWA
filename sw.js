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

    BASE + "/firebase-messaging-sw.js",

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
