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
        });
    }

    const apiKey = "ee681940f95a62811e7c2e1817734fed"; 
    const lat = "5.6037";  
    const lon = "-0.1870"; 

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeather() {
        const weatherDiv = document.getElementById("current-weather");
        if (!weatherDiv) return;

        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error("Weather data fetch failed.");
            const data = await response.json();
            displayCurrentWeather(data, weatherDiv);
        } catch (error) {
            console.error("Weather Error:", error);
            weatherDiv.innerHTML = `<p>Unable to load weather data.</p>`;
        }
    }

    function displayCurrentWeather(data, container) {
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        container.innerHTML = `
            <div class="weather-detail">
                <img src="${iconSrc}" alt="${desc}">
                <p><strong>${temp}°C</strong> - ${desc.toUpperCase()}</p>
            </div>
        `;
    }

    async function fetchForecast() {
        const forecastDiv = document.getElementById("forecast");
        if (!forecastDiv) return;

        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error("Forecast fetch failed.");
            const data = await response.json();
            displayForecast(data, forecastDiv);
        } catch (error) {
            console.error("Forecast Error:", error);
            forecastDiv.innerHTML = `<p>Unable to load forecast data.</p>`;
        }
    }

    function displayForecast(data, container) {
        container.innerHTML = "";

        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const temp = Math.round(day.main.temp);
            
            const card = document.createElement("div");
            card.className = "forecast-day";
            card.innerHTML = `<p><strong>${date}</strong></p><p>${temp}°C</p>`;
            container.appendChild(card);
        });
    }

    const dataSource = "data/members.json";

    async function fetchSpotlights() {
        const spotlightContainer = document.getElementById("spotlight-cards");
        if (!spotlightContainer) return;

        try {
            const response = await fetch(dataSource);
            if (!response.ok) throw new Error("Failed to fetch members JSON.");
            const data = await response.json();
            const members = data.members || data;

            const qualifiedMembers = members.filter(m => 
                m.membershipLevel === 2 || 
                m.membershipLevel === 3 || 
                m.membershipLevel === "Silver" || 
                m.membershipLevel === "Gold"
            );

            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selectedSpotlights = shuffled.slice(0, 3);

            renderSpotlights(selectedSpotlights, spotlightContainer);
        } catch (error) {
            console.error("Spotlight Error:", error);
            spotlightContainer.innerHTML = `<p>Unable to load spotlights at this time.</p>`;
        }
    }

    function renderSpotlights(spotlights, container) {
        container.innerHTML = "";

        const badgeMap = { 
            2: "Silver Tier", 
            3: "Gold Partner", 
            "Silver": "Silver Tier", 
            "Gold": "Gold Partner" 
        };

        spotlights.forEach(business => {
            const card = document.createElement("div");
            card.className = "spotlight-card";

            card.innerHTML = `
                <img src="images/${business.image}" alt="${business.name} Logo" loading="lazy">
                <h3>${business.name}</h3>
                <p class="tagline"><em>"${business.tagline || ''}"</em></p>
                <hr>
                <p>${business.address}</p>
                <p>${business.phone}</p>
                <a href="${business.website}" target="_blank" rel="noopener">Website</a>
                <br>
                <span class="badge">${badgeMap[business.membershipLevel] || "VIP Member"}</span>
            `;
            container.appendChild(card);
        });
    }

    fetchWeather();
    fetchForecast();
    fetchSpotlights();
});