import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const AnecdoteLine = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const initialVoteArray = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [voteArray, setVoteArray] = useState(initialVoteArray);

  const voteForSelectedAnecdote = () => {
    const newVoteArray = [...voteArray];
    newVoteArray[selected] += 1;
    setVoteArray(newVoteArray);
  };

  const randomlySelect = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const indexWithMostVotes = voteArray.reduce(
    (indexWithBiggestValue, currentValue, currentIndex, arr) => {
      return currentValue > arr[indexWithBiggestValue]
        ? currentIndex
        : indexWithBiggestValue;
    },
    0
  );

  return (
    <div id="App">
      <div id="anecdote_of_day">
        <h2>Anecdote of the day</h2>
        <AnecdoteLine
          anecdote={anecdotes[selected]}
          votes={voteArray[selected]}
        />
        <Button text={"vote"} handleClick={voteForSelectedAnecdote} />
        <Button text={"Generate an anecdote"} handleClick={randomlySelect} />
      </div>
      <div id="most_voted_anecdote">
        <AnecdoteLine
          anecdote={anecdotes[indexWithMostVotes]}
          votes={voteArray[indexWithMostVotes]}
        />
      </div>
    </div>
  );
};

export default App;
