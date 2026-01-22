const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "USER_FROM_LS":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
