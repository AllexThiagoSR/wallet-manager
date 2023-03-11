const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
};

const editReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_INFOS_TO_EDIT':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default editReducer;
