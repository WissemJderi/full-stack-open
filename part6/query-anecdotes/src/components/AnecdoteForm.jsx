import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext, useRef } from 'react'
import NotifcationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const timeOutId = useRef(null)

  const { notificationDispatch } = useContext(NotifcationContext)

  const setNotification = (message) => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current)
    }
    notificationDispatch({
      type: 'SET',
      payload: message,
    })

    timeOutId.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`You added '${newAnecdote.content}'`)
    },

    onError: () => {
      const message = 'too short anecdote, must have length 5 or more'
      setNotification(message)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
