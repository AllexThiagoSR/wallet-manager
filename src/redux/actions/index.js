const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmailAction = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

const getCurrenciesAction = (currencies, currenciesInfos) => ({
  type: 'SAVE_CURRENCIES',
  payload: {
    currencies,
    currenciesInfos,
  },
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  const currenciesInfos = Object
    .values(currencies)
    .filter(({ code, codein }) => code !== 'USDT' && codein !== 'BRLT');
  const currenciesArray = Object.keys(currencies)
    .reduce((acc, curr) => (
      acc.includes(curr) || curr === 'USDT' ? acc : [...acc, curr]
    ), []);
  dispatch(getCurrenciesAction(currenciesArray, currenciesInfos));
};
