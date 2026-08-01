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

    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toString();
    }

    const modalTriggers = document.querySelectorAll(".modal-trigger");
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const modalId = trigger.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    const closeButtons = document.querySelectorAll(".modal-close");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });
});
