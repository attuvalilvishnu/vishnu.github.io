

(() => {
    const publicVapidKey =
        "BLghsAja6MICF7vS2ID9oSdMzBVo4P5wXrwnL_OI-gr_y5lbWApm8D3jwHu6TUq-L_NEdxeREk9p2ananBpz9Kw";
    let pushSubscription;
    let sw;

    const init = async () => {
        clickEvent();
        await registerserviceWorker();
        registerPush();
    }

    const clickEvent = () => {
        const home = document.getElementById('notification_home');
        const about = document.getElementById('notification_about');
        if (!!home) {
            home.addEventListener('click', () => {
                // Check for service worker
                if ("serviceWorker" in navigator) {
                    send('home').catch(err => console.error(err));
                }
            });
        }
        if (!!about) {
            about.addEventListener('click', () => {
                // Check for service worker
                if ("serviceWorker" in navigator) {
                    send('about').catch(err => console.error(err));
                }
            });
        }


    }

    const registerserviceWorker = async () => {
        // Register Service Worker
        console.log("Registering service worker...");
        sw = await navigator.serviceWorker.register("../worker.js");
        console.log("Service Worker Registered...");
    }

    const registerPush = async () => {
        // Register Push
        console.log("Registering Push...");
        pushSubscription = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log("Push Registered...");
    }

    const send = async (type) => {
        // Send Push Notification
        console.log("Sending Push...");
        const body = { pushSubscription, type };
        await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        });
        console.log("Push Sent...");
    }

    const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    init();

})();

