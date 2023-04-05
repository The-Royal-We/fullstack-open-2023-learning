import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

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

  return (
    <div>
      <div id="feedback">
        <h1>Give feedback</h1>
        <Button text={"good"} handleClick={updateCounter("good")} />
        <Button text={"neutral"} handleClick={updateCounter("neutral")} />
        <Button text={"good"} handleClick={updateCounter("bad")} />
      </div>
      <div id="statistics">
        <p>good {goodCounter}</p>
        <p>neutralCounter {neutralCounter}</p>
        <p>badCounter {badCounter}</p>
      </div>
    </div>
  );
};

export default App;