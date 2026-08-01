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

    const displayGrid = document.getElementById("directory-display");
    const dataSource = "data/members.json";

    async function fetchChamberMembers() {
        try {
            const response = await fetch(dataSource);
            if (!response.ok) throw new Error("HTTP error parsing dataset response.");
            const data = await response.json();
            

            const membersList = data.members || data;
            renderDirectoryCards(membersList);
        } catch (error) {
            console.error("Critical error processing business entries:", error);
            if (displayGrid) {
                displayGrid.innerHTML = `<p class="error-msg">Failed to load business directory data entries.</p>`;
            }
        }
    }

    function renderDirectoryCards(members) {
        if (!displayGrid) return;
        displayGrid.innerHTML = "";
        
        members.forEach(business => {
            const section = document.createElement("section");
            
            const badgeMap = { 1: "Member", 2: "Silver Tier", 3: "Gold Partner" };
            const classificationText = badgeMap[business.membershipLevel] || "General";

            section.innerHTML = `
                <div class="image-wrapper">
                    <img src="images/${business.image}" alt="${business.name} logo" loading="lazy">
                </div>
                <h3>${business.name}</h3>
                <p class="motto"><em>"${business.tagline || ''}"</em></p>
                <hr>
                <div class="contact-details">
                    <p class="street-address">${business.address}</p>
                    <p class="phone-number">${business.phone}</p>
                    <p class="web-link"><a href="${business.website}" target="_blank" rel="noopener">Visit Site</a></p>
                </div>
                <span class="tier-tag tier-${business.membershipLevel}">${classificationText}</span>
            `;
            displayGrid.appendChild(section);
        });
    }

    const gridBtn = document.getElementById("view-grid");
    const listBtn = document.getElementById("view-list");

    if (gridBtn && listBtn) {
        gridBtn.addEventListener("click", () => {
            displayGrid.className = "grid-layout";
            gridBtn.classList.add("active-view");
            listBtn.classList.remove("active-view");
        });

        listBtn.addEventListener("click", () => {
            displayGrid.className = "list-layout";
            listBtn.classList.add("active-view");
            gridBtn.classList.remove("active-view");
        });
    }

    fetchChamberMembers();
});