import { useState } from "react";

export default function Header({ score }) {
  
  const [bestScore, setbestScore] = useState(0);

  if (score > bestScore) {
    setbestScore(score);
  }

  return (
    <header>
      <h1>Pokemon Memory Game</h1>
      <section>
        <div className="instructions">
          The rules are simple: <br />
          • Select as many unique images as you can to increase your score <br />
          • If you select an image twice your score will be reset
        </div>
        <div className="score">
          <div className="current-score">Score : {score}</div>
          <div className="best-score">Best Score : {bestScore}</div>
        </div>
        <div className="result" style={{display: score == 12 ? "block" : "none"}}>Congratulations! You got all correct!</div>
      </section>
    </header>
  );
}