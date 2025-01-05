const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const city = req.query.city || 'Almaty'; // Принимаем город из параметров URL
    const apiKey = 'a50aaadf1cc9dd4749cac7f900f53274';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
