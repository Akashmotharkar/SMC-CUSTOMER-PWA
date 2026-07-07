/* ==========================================================
   CUSTOMER PWA SERVICE WORKER
   ========================================================== */

const CACHE_NAME = "customer-pwa-v1.0.1";

const ASSETS = [

    "/",

    "/index.html",

    "/manifest.json",

    "/js/api.js",

    "/js/firebase/firebase-config.js",

    "/js/firebase/firebase-app.js",

    "/js/firebase/firebase-messaging.js",

    "/firebase-messaging-sw.js",

    "/icons/icon-72.png",

    "/icons/icon-96.png",

    "/icons/icon-128.png",

    "/icons/icon-144.png",

    "/icons/icon-152.png",

    "/icons/icon-192.png",

    "/icons/icon-384.png",

    "/icons/icon-512.png"

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

                        return caches.match(

                            "/index.html"

                        );

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
