import discoverData from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const yearTarget = document.getElementById("year-target");
    const modTarget = document.getElementById("mod-target");
    if (yearTarget) yearTarget.textContent = new Date().getFullYear();
    if (modTarget) modTarget.textContent = document.lastModified;

    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("nav-open");
            menuToggle.classList.toggle("nav-active");
        });
    }

    const grid = document.getElementById("discover-grid");
    const modal = document.getElementById("discover-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImg = document.getElementById("modal-img");
    const modalAddress = document.getElementById("modal-address");
    const modalDesc = document.getElementById("modal-desc");
    const modalClose = modal.querySelector(".modal-close");

    discoverData.forEach((item, index) => {
        const card = document.createElement("section");
        card.className = `discover-card discover-item-${index + 1}`;

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/discover/${item.image}" alt="${item.name}" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="discover-more">Learn More</button>
        `;

        card.querySelector(".discover-more").addEventListener("click", () => {
            modalTitle.textContent = item.name;
            modalImg.src = `images/discover/${item.image}`;
            modalImg.alt = item.name;
            modalAddress.textContent = item.address;
            modalDesc.textContent = item.description;
            modal.showModal();
        });

        grid.appendChild(card);
    });

    modalClose.addEventListener("click", () => modal.close());

    const visitMessageEl = document.getElementById("visit-message");
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message;
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const msSinceLastVisit = now - Number(lastVisit);
        const oneDay = 1000 * 60 * 60 * 24;

        if (msSinceLastVisit < oneDay) {
            message = "Back so soon! Awesome!";
        } else {
            const daysSince = Math.floor(msSinceLastVisit / oneDay);
            const dayWord = daysSince === 1 ? "day" : "days";
            message = `You last visited ${daysSince} ${dayWord} ago.`;
        }
    }

    visitMessageEl.textContent = message;
    localStorage.setItem("lastVisit", String(now));
});
