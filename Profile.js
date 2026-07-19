// ===============================
// ELEMENTS
// ===============================

const notificationBtn = document.getElementById("notificationBtn");
const notificationMenu = document.getElementById("notificationMenu");

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

// ===============================
// NOTIFICATION DROPDOWN
// ===============================

notificationBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    notificationMenu.classList.toggle("active");

    // Close profile if open
    profileMenu.classList.remove("active");
    profileBtn.classList.remove("active");
});

// ===============================
// PROFILE DROPDOWN
// ===============================

profileBtn.addEventListener("click", function (e) {
    // If profileBtn is a link, allow navigation by doing nothing here
    if (profileBtn.tagName && profileBtn.tagName.toLowerCase() === 'a') return;

    e.stopPropagation();

    profileMenu.classList.toggle("active");
    profileBtn.classList.toggle("active");

    // Close notifications if open
    notificationMenu.classList.remove("active");
});

// ===============================
// CLOSE WHEN CLICKING OUTSIDE
// ===============================

document.addEventListener("click", function (e) {

    // Notification
    if (
        !notificationMenu.contains(e.target) &&
        !notificationBtn.contains(e.target)
    ) {
        notificationMenu.classList.remove("active");
    }

    // Profile
    if (
        !profileMenu.contains(e.target) &&
        !profileBtn.contains(e.target)
    ) {
        profileMenu.classList.remove("active");
        profileBtn.classList.remove("active");
    }

});

// ===============================
// ESC KEY CLOSE
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        notificationMenu.classList.remove("active");

        profileMenu.classList.remove("active");
        profileBtn.classList.remove("active");

    }

});

// ===============================
// VIEW ALL BUTTON
// ===============================

const viewAllBtn = document.querySelector(".view-all");

if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function () {

        alert("Opening all notifications...");

        notificationMenu.classList.remove("active");

    });
}

// ===============================
// MENU ITEM CLICK EFFECT
// ===============================

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        profileMenu.classList.remove("active");
        profileBtn.classList.remove("active");

        console.log(this.textContent.trim());

    });

});