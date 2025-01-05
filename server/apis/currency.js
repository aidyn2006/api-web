const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiKey = '2ff44a2bab4afcffd94e5c64';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currency data' });
    }
};


