if (localStorage.getItem("crowdsenseLoggedIn") === "true") {
    window.location.href = "dashboard.html";
}

// Password Show / Hide

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", () => {
        const type =
            passwordInput.getAttribute("type") === "password"
                ? "text"
                : "password";

        passwordInput.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
    });
}

// Login Form

const form = document.getElementById("loginForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const validUsername = "admin";
        const validPasswords = ["admin123", "123456"];

        if (username === "" || password === "") {
            alert("Please enter Username and Password");
            return;
        }

        if (username !== validUsername || !validPasswords.includes(password)) {
            alert("Invalid username or password");
            return;
        }

        const loginBtn = document.querySelector(".button2");

        if (loginBtn) {
            loginBtn.innerHTML = "Authenticating...";
            loginBtn.classList.add("button-loading");
        }

        setTimeout(() => {
            if (loginBtn) {
                loginBtn.innerHTML = "Access Granted ✓";
                loginBtn.style.background = "linear-gradient(135deg,#22C55E,#16A34A)";
            }

            localStorage.setItem("crowdsenseLoggedIn", "true");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        }, 2000);
    });
}