const INITIALS_STATE = {
  currencies: [],
  currenciesInfos: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIALS_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
