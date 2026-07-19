// ===============================
// CrowdSense AI Dashboard
// script.js
// ===============================

if (localStorage.getItem("crowdsenseLoggedIn") !== "true") {
    window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Logout
    // ===============================
    const logoutLink = document.getElementById("logoutLink");

    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("crowdsenseLoggedIn");
            window.location.href = "index.html";
        });
    }

    // ===============================
    // Save Settings
    // ===============================
    const form = document.querySelector(".settings form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            alert("✅ Settings saved successfully!");
        });
    }

    // ===============================
    // Live Camera Status
    // ===============================
    const status = document.querySelector(".status");

    if (status) {
        let live = true;

        setInterval(() => {
            live = !live;

            if (live) {
                status.innerHTML = "● Live";
                status.style.color = "#22c55e";
            } else {
                status.innerHTML = "● Reconnecting...";
                status.style.color = "#facc15";
            }
        }, 10000); // Every 10 seconds
    }

    // ===============================
    // Simulated Analytics
    // ===============================
    const values = document.querySelectorAll(".analytics-data .item h3");

    if (values.length >= 4) {

        setInterval(() => {

            values[0].textContent = Math.floor(Math.random() * 150 + 150); // People

            values[1].textContent =
                Math.floor(Math.random() * 40 + 60) + "%"; // Density

            values[2].textContent =
                Math.floor(Math.random() * 5 + 10); // Cameras

            values[3].textContent =
                Math.floor(Math.random() * 5 + 1); // Risk Zones

        }, 5000);

    }

    // ===============================
    // Alerts Auto Update
    // ===============================
    const alertList = document.querySelector(".alert-list");

    const alerts = [
        "High Crowd Density - Zone A",
        "Unauthorized Entry Detected",
        "Camera 3 Offline",
        "Suspicious Activity Detected",
        "Fire Exit Blocked",
        "Normal Crowd Flow",
        "System Check Completed"
    ];

    if (alertList) {

        setInterval(() => {

            const items = alertList.querySelectorAll("li");

            const randomAlert =
                alerts[Math.floor(Math.random() * alerts.length)];

            items[0].textContent = randomAlert;

        }, 7000);

    }

});
