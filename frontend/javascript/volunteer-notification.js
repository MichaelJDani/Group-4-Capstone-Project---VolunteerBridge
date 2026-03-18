const notificationContainer = document.getElementById("notifications");
const badge = document.getElementById("badgeCount");
const clearBtn = document.getElementById("clearBtn");

const API_URL = "http://localhost:5000";


// Load notifications
async function loadNotifications() {

    try{

        const response = await fetch(API_URL);
        const data = await response.json();

        notificationContainer.innerHTML = "";

        let unreadCount = 0;

        data.forEach(notification => {

            const div = document.createElement("div");

            div.classList.add("notification");

            if(notification.read){
                div.classList.add("disabled");
            } else {
                div.classList.add("active");
                unreadCount++;
            }

            div.textContent = notification.message;

            notificationContainer.appendChild(div);

        });

        badge.textContent = unreadCount;

    } catch(error){
        console.error("Error loading notifications", error);
    }

}

loadNotifications();