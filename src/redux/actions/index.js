import { getCurrencies } from '../../services/currenciesAPI';

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
  const currencies = await getCurrencies();
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
  const exchangeRates = await getCurrencies();
  dispatch(addExpenseAction({ ...expense, exchangeRates }));
};

export const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: { id },
});

export const startExpenseEdition = (idToEdit) => ({
  type: 'START_EDITION',
  payload: {
    idToEdit,
    editor: true,
  },
});

export const finnishExpenseEdition = (newInfos) => ({
  type: 'FINNISH_EXPENSE_EDITION',
  payload: {
    newInfos,
    editor: false,
  },
});

export const sendInfosToEdit = (expenseInfos) => ({
  type: 'SEND_INFOS_TO_EDIT',
  payload: expenseInfos,
});
