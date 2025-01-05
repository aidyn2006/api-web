const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const city = req.query.city || 'Almaty'; // Принимаем город из параметров URL
    const apiKey = '22f143a10ce34a70a8bc1a2d3f3793d5';
    const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
};
