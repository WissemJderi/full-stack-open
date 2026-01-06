const Notification = ({ text, error }) => {
  return (
    <div
      style={{
        backgroundColor: error ? 'red' : 'green',
        border: 'black 3px solid',
        borderRadius: '10px',
        padding: '5px',
      }}
    >
      <h3>{text}</h3>
    </div>
  )
}

export default Notification
