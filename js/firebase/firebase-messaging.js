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
    "/SMC-CUSTOMER-PWA/sw.js";


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

    console.log("listenForeground() called");

    const messaging =
        await initializeMessaging();
    
    console.log("Messaging instance:", messaging);
    
    if (!messaging) {
    
        console.log("Messaging not supported.");
    
        return;
    
    }
    
    console.log("Registering onMessage listener...");

    onMessage(

    messaging,

    payload => {
        console.log("onMessage fired");

        console.log(payload);

        console.log(
            "Foreground message",
            payload
        );

        const title =
            payload.data?.title ||
            payload.notification?.title ||
            "Milk Collection";

        const body =
            payload.data?.body ||
            payload.notification?.body ||
            "";

        new Notification(
            title,
            {
                body: body,
                icon:
                    "/SMC-CUSTOMER-PWA/icons/icon-192.png",
                badge:
                    "/SMC-CUSTOMER-PWA/icons/icon-192.png"
            }
        );

    }

);

}
