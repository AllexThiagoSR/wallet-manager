const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => (
  (action.type === 'SAVE_EMAIL') ? { ...state, email: action.payload } : state
);

export default userReducer;
