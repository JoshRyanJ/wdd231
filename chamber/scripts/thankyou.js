document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year-target").textContent = new Date().getFullYear();
    document.getElementById("mod-target").textContent = document.lastModified;

    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("nav-open");
            menuToggle.classList.toggle("nav-active");
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
});
