import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
      );
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((an) => an.id === id);

    const savedAnecdote = await anecdoteService.addVote(anecdote);

    dispatch(addVote(savedAnecdote));
  };
};
export default anecdoteSlice.reducer;
