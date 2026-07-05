/**
 * ==========================================================
 * FIREBASE MESSAGING
 * Customer PWA
 * ==========================================================
 */

import {

    doc,
    setDoc,
    serverTimestamp

}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {

    getToken,
    onMessage

}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

import {

    db,
    initializeMessaging

}
from "./firebase-app.js";

import {

    VAPID_KEY

}
from "./firebase-config.js";


const COLLECTION =
    "deviceTokens";


const SERVICE_WORKER =
    "/firebase-messaging-sw.js";


async function requestPermission() {

    const permission =
        await Notification.requestPermission();

    return permission === "granted";

}


async function registerServiceWorker() {

    return await navigator.serviceWorker.register(

        SERVICE_WORKER

    );

}


export async function registerDevice(

    mobileNumber

) {

    if (!("Notification" in window)) {

        return null;

    }

    const granted =
        await requestPermission();

    if (!granted) {

        return null;

    }

    const registration =
        await registerServiceWorker();

    const messaging =
        await initializeMessaging();

    if (!messaging) {

        return null;

    }

    const token =
        await getToken(

            messaging,

            {

                vapidKey: VAPID_KEY,

                serviceWorkerRegistration:
                    registration

            }

        );

    if (!token) {

        return null;

    }

    await setDoc(

        doc(

            db,

            COLLECTION,

            mobileNumber

        ),

        {

            token:

                token,

            mobile:

                mobileNumber,

            updated:

                serverTimestamp(),

            active:

                true

        },

        {

            merge: true

        }

    );

    return token;

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
