export const getCurrencies = async () => (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
