async function fetchWeather(city) {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    const weatherDetails = document.getElementById('weather-details');
    const { main, weather, wind, coord } = data;
    const { temp, humidity, pressure, feels_like } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];
    const { lon, lat } = coord;

    // Преобразуем температуру из Кельвинов в Цельсии
    const tempCelsius = (temp - 273.15).toFixed(2);
    const feelsLikeCelsius = (feels_like - 273.15).toFixed(2);

    weatherDetails.innerHTML = `
        <p><strong>Temperature:</strong> <span class="temp">${tempCelsius}°C</span></p>
        <p><strong>Feels Like:</strong> ${feelsLikeCelsius}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
        <p><strong>Location Coordinates:</strong> Lat: ${lat}, Lon: ${lon}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;
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

// Initial fetch for default city (Almaty)
fetchWeather('Almaty');
fetchNews('Almaty');
fetchCurrency();
