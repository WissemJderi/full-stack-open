// Reducer for setting and clearing notifications
// - SET_NOTIFICATION: change the notification by the provided payload
// - CLEAR_NOTIFICATION: change the state of the notification to null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { text: action.payload.text, error: action.payload.error };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
