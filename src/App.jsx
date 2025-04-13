import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./die.jsx";

export default function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const buttonRef = React.useRef(null);

  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function toggleHold(id) {
    setDice((prevDiceObj) =>
      prevDiceObj.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (!gameWon) {
      setDice((prevDiceObj) =>
        prevDiceObj.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
              }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  const diceEls = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
    />
  ));

  return (
    <main className="bg-wild-sand">
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live="polite">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>

      <section>
        <h1 className="text-charade fs-900 letter-spacing-small">Tenzies</h1>
        <p className="text-fiord fs-600 letter-spacing-small">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>

      <div className="dice-container" role="grid">
        {diceEls}
      </div>

      <div>
        <button
          className="roll-btn bg-electric-violet text-white fs-700 fw-bold"
          onClick={rollDice}
          ref={buttonRef}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
