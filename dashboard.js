// ===============================
// CrowdSense AI Dashboard
// ===============================

if (localStorage.getItem("crowdsenseLoggedIn") !== "true") {
    window.location.replace("index.html");
}

// ---------- Crowd Analytics Chart ----------

const ctx = document.getElementById("crowdChart");

if (ctx) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "8 AM",
                "9 AM",
                "10 AM",
                "11 AM",
                "12 PM",
                "1 PM",
                "2 PM"
            ],
            datasets: [{
                label: "Crowd Density (%)",
                data: [22, 35, 48, 65, 81, 72, 60],
                borderColor: "#2e8eff",
                backgroundColor: "rgba(46,142,255,0.15)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: "#2e8eff"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#cccccc"
                    },
                    grid: {
                        color: "rgba(255,255,255,.05)"
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: "#cccccc"
                    },
                    grid: {
                        color: "rgba(255,255,255,.05)"
                    }
                }
            }
        }
    });
}

// ---------- Animated Counter ----------

function animateCounter(element, target) {

    let count = 0;
    let speed = Math.max(15, target / 80);

    let timer = setInterval(() => {

        count += Math.ceil(speed);

        if (count >= target) {
            count = target;
            clearInterval(timer);
        }

        element.textContent = count.toLocaleString();

    }, 20);
}

document.querySelectorAll(".card h1").forEach(card => {

    const value = parseInt(card.textContent.replace(/,/g, ""));

    if (!isNaN(value)) {
        card.textContent = "0";
        animateCounter(card, value);
    }

});

// ---------- Logout ----------

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("crowdsenseLoggedIn");
        window.location.href = "index.html";
    });
}

// ---------- Notification ----------

const bell = document.querySelector(".notification");

if (bell) {
    bell.addEventListener("click", () => {

        alert(
            "🔔 Notifications\n\n" +
            "• Gate 2 Overcrowded\n" +
            "• Camera 7 Offline\n" +
            "• AI recommends opening Exit B"
        );

    });
}

// ---------- Live Date & Time ----------

function updateTime() {

    const box = document.getElementById("datetime");

    if (!box) return;

    const now = new Date();

    box.innerHTML =
        now.toLocaleDateString() +
        "<br>" +
        now.toLocaleTimeString();

}

setInterval(updateTime, 1000);
updateTime();

// ---------- Camera Status ----------

const cameras = document.querySelectorAll(".live");

setInterval(() => {

    cameras.forEach(cam => {

        if (Math.random() > 0.85) {

            cam.textContent = "OFFLINE";
            cam.style.background = "#ff3b30";

        } else {

            cam.textContent = "LIVE";
            cam.style.background = "#00c853";

        }

    });

}, 5000);

// ---------- AI Prediction ----------

const predictionValues = document.querySelectorAll(".zone strong");

setInterval(() => {

    predictionValues.forEach(value => {

        let random = Math.floor(Math.random() * 100);
        value.textContent = random + "%";

    });

}, 4000);

// ---------- Welcome ----------

window.addEventListener("load", () => {

    console.log("CrowdSense AI Dashboard Loaded Successfully.");

});