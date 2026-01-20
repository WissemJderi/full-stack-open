import { createSlice } from "@reduxjs/toolkit";
const initialState = null;

let timeOutId = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },

    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, time = 5) => {
  return async (dispatch) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    dispatch(setNotification(message));

    timeOutId = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
