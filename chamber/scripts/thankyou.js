document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year-target").textContent = new Date().getFullYear();
    document.getElementById("mod-target").textContent = new Date(document.lastModified).toLocaleDateString("en-GB", {day: "numeric", month:"long", year:"numeric"});

    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("nav-open");
            menuToggle.classList.toggle("nav-active");
            menuToggle.setAttribute("aria-expanded",primaryNav.classList.contains("nav-open"));
        });
    }

    const params = new URLSearchParams(window.location.search);

    const fields = {
        "out-fname": "fname",
        "out-lname": "lname",
        "out-email": "email",
        "out-phone": "phone",
        "out-orgname": "orgname",
        "out-timestamp": "timestamp"
    };

    
    for (const [elementId, paramKey] of Object.entries(fields)) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = params.get(paramKey) || "Not provided";
        }
    }

    const stamp = params.get("timestamp");
    const stampEl = document.getElementById("out-timestamp");
    if (stamp && stampEl) {
        const parsed = new Date(stamp);
        if (!isNaN(parsed)) {
            stampEl.textContent = parsed.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });
        }
    }
});