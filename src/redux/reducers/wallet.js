const INITIALS_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIALS_STATE, action) {
  const { payload } = action;
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, ...payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, payload.expense] };
  case 'DELETE_EXPENSE': {
    const { expenses } = state;
    return { ...state, expenses: expenses.filter(({ id }) => id !== payload.id) };
  }
  case 'START_EDITION':
    return { ...state, ...payload };
  default:
    return state;
  }
}
