import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = (props) => {
  const {
    goodCounter,
    neutralCounter,
    badCounter,
    total,
    average,
    positivePercentage,
  } = props;
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div id="statistics">
      <p>good {goodCounter}</p>
      <p>neutralCounter {neutralCounter}</p>
      <p>badCounter {badCounter}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positivePercentage {positivePercentage}%</p>
    </div>
  );
};

const App = () => {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  const incrementCounter = (counter, setCounter) => {
    const newValue = counter + 1;
    setCounter(newValue);
  };

  const updateCounter = (counter) => () => {
    switch (counter) {
      case "good":
        incrementCounter(goodCounter, setGoodCounter);
        break;
      case "neutral":
        incrementCounter(neutralCounter, setNeutralCounter);
        break;
      case "bad":
        incrementCounter(badCounter, setBadCounter);
        break;
      default:
        break;
    }
  };

  let total = goodCounter + neutralCounter + badCounter;
  let average = (goodCounter - badCounter) / total;
  let positivePercentage = (goodCounter / total) * 100;

  return (
    <div>
      <div id="feedback">
        <h1>Give feedback</h1>
        <Button text={"good"} handleClick={updateCounter("good")} />
        <Button text={"neutral"} handleClick={updateCounter("neutral")} />
        <Button text={"bad"} handleClick={updateCounter("bad")} />
      </div>
      <Statistics
        goodCounter={goodCounter}
        neutralCounter={neutralCounter}
        badCounter={badCounter}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
