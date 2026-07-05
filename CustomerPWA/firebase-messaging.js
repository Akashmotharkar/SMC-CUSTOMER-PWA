/* ==========================================================
   FIREBASE MESSAGING
   ========================================================== */

(function () {

    let messaging = null;

    let currentToken = null;

   let initialized = false;

    async function initialize() {

        firebase.initializeApp(firebaseConfig);

        messaging = firebase.messaging();

        await registerServiceWorker();

       initialized = true;

    }

    async function registerServiceWorker() {

        if (!("serviceWorker" in navigator)) {

            return;

        }

        const registration =
            await navigator.serviceWorker.register(
                "firebase-messaging-sw.js"
            );

        messaging.useServiceWorker(registration);

    }

    async function requestPermission(customerId) {

        try {

            const permission =
                await Notification.requestPermission();

            if (permission !== "granted") {

                return false;

            }

            currentToken =
                await messaging.getToken({

                    vapidKey: FIREBASE_VAPID_KEY

                });

            if (!currentToken) {

                return false;

            }

            await API.saveFcmToken(

                customerId,

                currentToken

            );

            return true;

        }

        catch (err) {

            console.error(err);

            return false;

        }

    }

    async function refreshToken(customerId) {

        try {

            currentToken =
                await messaging.getToken({

                    vapidKey: FIREBASE_VAPID_KEY

                });

            if (currentToken) {

                await API.saveFcmToken(

                    customerId,

                    currentToken

                );

            }

        }

        catch (e) {

            console.error(e);

        }

    }

    function onMessage(callback) {

        messaging.onMessage(function (payload) {

            console.log(payload);

            if (callback) {

                callback(payload);

            }

        });

    }

    function getToken() {

        return currentToken;

    }

   function isInitialized() {

       return initialized;
   
   }

    window.FirebaseMessaging = {

    initialize,

    requestPermission,

    refreshToken,

    onMessage,

    getToken,

    isInitialized

};

})();
