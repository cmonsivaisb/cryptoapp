const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/get-exchange-rate', async (req, res) => {
  const cryptoCurrency = req.body.cryptoCurrency;
  const traditionalCurrency = req.body.traditionalCurrency;

  try {
    const response = await axios.get(`https://rest.coinapi.io/v1/exchangerates/${cryptoCurrency}`);
    const rate = response.data.rates[traditionalCurrency];
    res.json({ rate });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
