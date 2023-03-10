const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmailAction = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

const getCurrenciesAction = (currencies) => ({
  type: 'SAVE_CURRENCIES',
  payload: {
    currencies,
  },
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  const currenciesArray = Object.keys(currencies)
    .reduce((acc, curr) => (
      acc.includes(curr) || curr === 'USDT' ? acc : [...acc, curr]
    ), []);
  dispatch(getCurrenciesAction(currenciesArray));
};

const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: {
    expense,
  },
});

export const saveExpense = (expense) => async (dispatch) => {
  const currencies = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  const exchangesRates = Object
    .values(currencies)
    .filter(({ code, codein }) => code !== 'USDT' && codein !== 'BRLT');
  dispatch(addExpenseAction({ ...expense, exchangesRates }));
};
