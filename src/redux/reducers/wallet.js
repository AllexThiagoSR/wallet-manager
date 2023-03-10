const INITIALS_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIALS_STATE, action) {
  const { payload } = action;
  console.log(state, payload);
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, ...payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, payload.expense] };
  default:
    return state;
  }
}
