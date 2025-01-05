const express = require('express');
const weatherAPI = require('./apis/weather');
const newsAPI = require('./apis/news');
const currencyAPI = require('./apis/currency');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/weather', weatherAPI);

app.get('/api/news', newsAPI);

app.get('/api/currency', currencyAPI);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
