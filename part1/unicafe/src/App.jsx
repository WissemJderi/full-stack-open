import { useState } from "react";

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
        />
        <StatisticLine
          text="positive"
          value={(good / (good + neutral + bad)) * 100}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text="give feedback" />
      <Button
        text="good"
        handleClick={() => {
          setGood((prev) => prev + 1);
        }}
      />
      <Button
        text="neutral"
        handleClick={() => {
          setNeutral((prev) => prev + 1);
        }}
      />
      <Button
        text="bad"
        handleClick={() => {
          setBad((prev) => prev + 1);
        }}
      />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
