import { initFooterDate, initNavToggle, initModalCloseButtons } from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
    initFooterDate();
    initNavToggle();
    initModalCloseButtons();

    const grid = document.getElementById("resource-grid");
    const resultsCount = document.getElementById("results-count");
    const filterButtons = document.querySelectorAll(".filter-btn:not(.bookmark-filter-btn)");
    const bookmarkFilterBtn = document.getElementById("bookmark-filter");

    const modal = document.getElementById("resource-modal");
    const modalName = document.getElementById("modal-name");
    const modalCategory = document.getElementById("modal-category");
    const modalRegion = document.getElementById("modal-region");
    const modalAccess = document.getElementById("modal-access");
    const modalDescription = document.getElementById("modal-description");
    const modalLink = document.getElementById("modal-link");
    const modalBookmarkBtn = document.getElementById("modal-bookmark");

    let allResources = [];
    let activeCategory = "all";
    let showBookmarkedOnly = false;
    let currentModalId = null;

    function getBookmarks() {
        const stored = localStorage.getItem("eduscope-bookmarks");
        return stored ? JSON.parse(stored) : [];
    }

    function isBookmarked(id) {
        return getBookmarks().includes(id);
    }

    function toggleBookmark(id) {
        const bookmarks = getBookmarks();
        const updated = bookmarks.includes(id)
            ? bookmarks.filter(bookmarkId => bookmarkId !== id)
            : [...bookmarks, id];
        localStorage.setItem("eduscope-bookmarks", JSON.stringify(updated));
    }

    async function fetchResources() {
        try {
            const response = await fetch("data/resources.json");
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            allResources = await response.json();
            renderGrid();
        } catch (error) {
            console.error("Failed to load resource data:", error);
            grid.innerHTML = `<p class="error-msg">Sorry, the resource directory couldn't be loaded right now. Please try again later.</p>`;
        }
    }

    function renderGrid() {
        let visible = allResources;

        if (activeCategory !== "all") {
            visible = visible.filter(resource => resource.category === activeCategory);
        }

        if (showBookmarkedOnly) {
            visible = visible.filter(resource => isBookmarked(resource.id));
        }

        resultsCount.textContent = `Showing ${visible.length} of ${allResources.length} resources`;

        if (visible.length === 0) {
            grid.innerHTML = `<p class="empty-msg">No resources match this filter yet.</p>`;
            return;
        }

        grid.innerHTML = visible.map(resource => `
            <article class="card resource-card" data-id="${resource.id}">
                <h3>${resource.name}</h3>
                <p class="resource-meta">
                    <span class="tag">${resource.category}</span>
                    <span class="tag">${resource.region}</span>
                    <span class="tag">${resource.accessType}</span>
                </p>
                <p class="resource-desc">${resource.description}</p>
                <div class="resource-actions">
                    <button type="button" class="btn learn-more-btn" data-id="${resource.id}">Learn More</button>
                    <button type="button" class="bookmark-star ${isBookmarked(resource.id) ? "active" : ""}" data-id="${resource.id}" aria-label="Toggle bookmark for ${resource.name}">
                        ${isBookmarked(resource.id) ? "&#9733;" : "&#9734;"}
                    </button>
                </div>
            </article>
        `).join("");

        attachCardListeners();
    }

    function attachCardListeners() {
        document.querySelectorAll(".learn-more-btn").forEach(btn => {
            btn.addEventListener("click", () => openModal(Number(btn.dataset.id)));
        });

        document.querySelectorAll(".bookmark-star").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = Number(btn.dataset.id);
                toggleBookmark(id);
                renderGrid();
            });
        });
    }

    function openModal(id) {
        const resource = allResources.find(item => item.id === id);
        if (!resource) return;

        currentModalId = id;
        modalName.textContent = resource.name;
        modalCategory.textContent = resource.category;
        modalRegion.textContent = resource.region;
        modalAccess.textContent = resource.accessType;
        modalDescription.textContent = resource.description;
        modalLink.href = resource.url;
        modalBookmarkBtn.textContent = isBookmarked(id) ? "Remove Bookmark" : "Bookmark";

        modal.showModal();
    }

    modalBookmarkBtn.addEventListener("click", () => {
        if (currentModalId === null) return;
        toggleBookmark(currentModalId);
        modalBookmarkBtn.textContent = isBookmarked(currentModalId) ? "Remove Bookmark" : "Bookmark";
        renderGrid();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.filter;
            renderGrid();
        });
    });

    bookmarkFilterBtn.addEventListener("click", () => {
        showBookmarkedOnly = !showBookmarkedOnly;
        bookmarkFilterBtn.classList.toggle("active", showBookmarkedOnly);
        renderGrid();
    });

    fetchResources();
});
