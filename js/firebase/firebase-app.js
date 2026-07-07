/**
 * ==========================================================
 * FIREBASE INITIALIZER
 * Customer PWA
 * ==========================================================
 */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {

    getFirestore

}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {

    getMessaging,
    isSupported

}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

import {

    firebaseConfig

}
from "./firebase-config.js";


const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


let messaging = null;


async function initializeMessaging() {

    if (!(await isSupported())) {

        return null;

    }

    messaging =
        getMessaging(app);

    return messaging;

}


export {

    app,

    db,

    messaging,

    initializeMessaging

};
