const API_KEY = "621ce2574eb40ed487596485bb18ef04";

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        return {
            city: data.name,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };

    } catch (error) {
        throw error;
    }
}

function addFavorite(city) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }

    loadFavorites();
}

function removeFavorite(city) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        item => item !== city
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();
}

function loadFavorites() {

    const favoritesList =
        document.getElementById("favoritesList");

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML =
            '<div class="empty-msg">No saved cities yet.</div>';
        return;
    }

    favorites.forEach(city => {

        const div = document.createElement("div");

        div.innerHTML = `
            <span>📍 ${city}</span>
            <div class="fav-actions">
                <button class="btn-view" onclick="searchWeather('${city}')">
                    View
                </button>
                <button class="btn-remove" onclick="removeFavorite('${city}')">
                    Remove
                </button>
            </div>
        `;

        favoritesList.appendChild(div);
    });
}

async function searchWeather(city) {

    const weatherCard =
        document.getElementById("weatherCard");

    const errorMsg =
        document.getElementById("errorMsg");

    weatherCard.style.display = "block";

    weatherCard.innerHTML = `
        <div class="loading-dots">
            <span></span><span></span><span></span>
        </div>
    `;

    errorMsg.style.display = "none";

    try {

        const weather =
            await getWeather(city);

        weatherCard.innerHTML = `
            <h2>📍 ${weather.city}</h2>
            <h3>${weather.temp}°C</h3>
            <p class="desc">${weather.description}</p>
            <div class="weather-grid">
                <div class="weather-stat">
                    <div class="label">Feels like</div>
                    <div class="value">${weather.feelsLike}°</div>
                </div>
                <div class="weather-stat">
                    <div class="label">Humidity</div>
                    <div class="value">${weather.humidity}%</div>
                </div>
                <div class="weather-stat">
                    <div class="label">Wind</div>
                    <div class="value">${weather.windSpeed} m/s</div>
                </div>
            </div>
            <button id="addFavBtn" onclick="addFavorite('${weather.city}')">
                ★ Save city
            </button>
        `;

    } catch (error) {

        weatherCard.style.display = "none";

        errorMsg.style.display = "block";

        errorMsg.innerText = "⚠️ " + error.message;
    }
}

let debounceTimer;

function debounceSearch() {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        const city =
            document.getElementById("cityInput").value;

        if (city.trim()) {
            searchWeather(city);
        }

    }, 500);
}

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (
        document.body.classList.contains("dark")
    ) {
        themeBtn.textContent = "☀️ Light";
        localStorage.setItem("theme", "dark"); 
    } else {
        themeBtn.textContent = "🌙 Dark";
        localStorage.setItem("theme", "light"); 
    }
});

document.addEventListener("DOMContentLoaded", () => {
         
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️ Light";
    }

    loadFavorites();

    document
        .getElementById("searchBtn")
        .addEventListener("click", () => {

            const city =
                document.getElementById("cityInput").value;

            if (city.trim()) {
                searchWeather(city);
            }
        });

    document
        .getElementById("cityInput")
        .addEventListener("input", debounceSearch);

    document
        .getElementById("cityInput")
        .addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const city = e.target.value;
                if (city.trim()) {
                    searchWeather(city);
                }
            }
        });
});
