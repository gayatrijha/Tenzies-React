import React, { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNew());
  const [tenzies, setTenzies] = useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNew() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDie() {
    if(!tenzies){
      setDice((prev) =>
      prev.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    }else{
      setTenzies(false);
      setDice(allNew())
    }
  }
  function holDie(id) {
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => holDie(die.id)}
    />
  ));

  return (
    <div className="App">
      <main className="main">
        {tenzies && <Confetti/> }
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDie}>
          {tenzies ? "Play Again" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
