async function getExchangeRate() {
    const cryptoCurrency = document.getElementById("cryptoCurrency").value;
    const traditionalCurrency = document.getElementById("traditionalCurrency").value;

    try {
        const response = await fetch("/get-exchange-rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `cryptoCurrency=${cryptoCurrency}&traditionalCurrency=${traditionalCurrency}`,
        });
        const data = await response.json();

        if (data.error) {
            document.getElementById("exchangeRateResult").innerText = `Error: ${data.error}`;
        } else {
            document.getElementById("exchangeRateResult").innerText = `1 ${cryptoCurrency} = ${data.rate} ${traditionalCurrency}`;
        }
    } catch (error) {
        document.getElementById("exchangeRateResult").innerText = `Error: ${error.message}`;
    }
}

document.getElementById("exchangeRateForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getExchangeRate();
});
