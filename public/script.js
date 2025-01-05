let map;

async function fetchWeather(city) {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.cod !== 200) {
        alert('City not found');
        return;
    }

    const weatherDetails = document.getElementById('weather-details');
    const { main, weather, wind, coord, sys, rain } = data;
    const { temp, humidity, pressure, feels_like } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];
    const { lon, lat } = coord;
    const { country } = sys;
    const rainVolume = rain ? rain['1h'] : 0;

    weatherDetails.innerHTML = `
        <p><strong>City:</strong> ${city}, ${country}</p>
        <p><strong>Temperature:</strong> <span class="temp">${temp}°C</span></p>
        <p><strong>Feels Like:</strong> ${feels_like}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
        <p><strong>Rain Volume (last 3 hours):</strong> ${rainVolume} mm</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;

    if (map) {
        map.remove();
    }

    map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${city}</b><br>Lat: ${lat}<br>Lon: ${lon}`)
        .openPopup();
}

async function fetchNews(city) {
    const response = await fetch(`/api/news?city=${city}`);
    const data = await response.json();
    const newsDetails = document.getElementById('news-details');

    let newsHTML = '<ul>';
    data.articles.forEach(newsItem => {
        newsHTML += `
            <li><a href="${newsItem.url}" target="_blank">${newsItem.title}</a></li>
        `;
    });
    newsHTML += '</ul>';

    newsDetails.innerHTML = newsHTML;
}

async function fetchCurrency() {
    const response = await fetch('/api/currency');
    const data = await response.json();
    const currencyDetails = document.getElementById('currency-details');

    const { conversion_rates } = data;
    currencyDetails.innerHTML = `
        <p><strong>USD to EUR:</strong> <span class="rate">${conversion_rates.EUR}</span></p>
        <p><strong>USD to KZT:</strong> <span class="rate">${conversion_rates.KZT}</span></p>
    `;
}

document.getElementById('fetchData').addEventListener('click', () => {
    const city = document.getElementById('city').value || 'Almaty';
    fetchWeather(city);
    fetchNews(city);
    fetchCurrency();
});

fetchWeather('Almaty');
fetchNews('Almaty');
fetchCurrency();
