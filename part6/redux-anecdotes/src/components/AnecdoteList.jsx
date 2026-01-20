import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      return [...anecdotes].sort((a, b) => b.votes - a.votes);
    }
    return [...anecdotes]
      .filter((an) => an.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id));
    dispatch(showNotification(`You Added '${content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id, anecdote.content)}
          key={anecdote.id}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
