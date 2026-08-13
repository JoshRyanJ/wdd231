export function initFooterDate() {
    const yearTarget = document.getElementById("year-target");
    const modTarget = document.getElementById("mod-target");

    if (yearTarget) yearTarget.textContent = new Date().getFullYear();
    if (modTarget) modTarget.textContent = document.lastModified;
}

export function initNavToggle() {
    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("nav-open");
            menuToggle.classList.toggle("nav-active");
        });
    }
}

export function initModalCloseButtons() {
    const closeButtons = document.querySelectorAll(".modal-close");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });
}
