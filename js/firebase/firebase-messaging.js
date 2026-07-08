/**
 * ==========================================================
 * FIREBASE MESSAGING
 * Customer PWA
 * ==========================================================
 */

import {

    getToken,
    onMessage

}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

import {

    initializeMessaging

}

from "./firebase-app.js";

import {

    VAPID_KEY

}
from "./firebase-config.js";


const SERVICE_WORKER =
    "firebase-messaging-sw.js";


async function requestPermission() {

    const permission =
        await Notification.requestPermission();

    return permission === "granted";

}


async function registerServiceWorker() {

    const existing =

        await navigator.serviceWorker.getRegistration(

            SERVICE_WORKER

        );

    if (

        existing

    ) {

        return existing;

    }

    return navigator.serviceWorker.register(

        SERVICE_WORKER

    );

}


export async function registerDevice(

    mobileNumber

) {

    if (

        !mobileNumber

    ) {

        return false;

    }


    if (

        !("Notification" in window)

    ) {

        console.log(

            "Notifications not supported."

        );

        return false;

    }


    const granted =

        await requestPermission();


    if (

        !granted

    ) {

        console.log(

            "Notification permission denied."

        );

        return false;

    }


    const registration =

        await registerServiceWorker();


    const messaging =

        await initializeMessaging();


    if (

        !messaging

    ) {

        return false;

    }


    const token =

        await getToken(

            messaging,

            {

                vapidKey:

                    VAPID_KEY,

                serviceWorkerRegistration:

                    registration

            }

        );


    if (

        !token

    ) {

        return false;

    }


    const response =

    await API.registerToken(

        mobileNumber,

        token

    );

if (

    !response.success

) {

    console.error(

        response.message

    );

    return false;

}

console.log(

    "Firebase token registered."

);

return true;

}


export async function listenForeground() {

    const messaging =
        await initializeMessaging();

    if (!messaging) {

        return;

    }

    onMessage(

        messaging,

        payload => {

            if (!payload.notification) {

                return;

            }

            new Notification(

                payload.notification.title,

                {

                    body:

                        payload.notification.body,

                    icon:

                        "/icons/icon-192.png",

                    badge:

                        "/icons/badge.png"

                }

            );

        }

    );

}
