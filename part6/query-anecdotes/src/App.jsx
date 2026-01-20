import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote } from './requests'
import { useContext, useRef } from 'react'
import NotifcationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const timeOutId = useRef(null)

  const { notificationDispatch } = useContext(NotifcationContext)

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newList = anecdotes.map((an) =>
        an.id === newAnecdote.id ? newAnecdote : an,
      )
      queryClient.setQueryData(['anecdotes'], newList)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    if (timeOutId.current) {
      clearTimeout(timeOutId.current)
    }
    notificationDispatch({
      type: 'SET',
      payload: `anecdote '${anecdote.content}' voted`,
    })

    timeOutId.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
