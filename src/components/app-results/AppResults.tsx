import React, { useMemo } from "react";
import Button from "@mui/material/Button";

import "./appResults.css";
import { QuizResult } from "../../appModels";

interface AppResultsProps {
  results: QuizResult[];
  onRetry: () => void;
}

export const AppResults = ({ results, onRetry }: AppResultsProps) => {
  const finalScore = useMemo(() => {
    let score = 0;
    results.forEach(({ userAnswer, correctAnswer }) => {
      if (
        userAnswer.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase()
      ) {
        score += 1;
      }
    });
    return score;
  }, [results]);

  return (
    <div className="app-results">
      <h2>Your Results</h2>
      <div className="result-rows">
        {results.map(({ topic, correctAnswer, userAnswer }, index) => {
          const isWrong =
            userAnswer.toLocaleLowerCase() !==
            correctAnswer.toLocaleLowerCase();
          return (
            <div className="result-row" key={topic}>
              <h5>
                {`${index + 1}.`} {topic}
              </h5>
              <p className={`${isWrong ? "error" : ""}`}>
                Correct Answer: {correctAnswer}
              </p>
              <p className={`${isWrong ? "error" : ""}`}>
                Your Answer: {userAnswer}
              </p>
            </div>
          );
        })}
        <p className="result-score">
          <strong>Your Total Score:</strong>{" "}
          {`${finalScore} / ${results.length}`}
        </p>
      </div>
      <div>
        <Button variant="contained" type="button" onClick={onRetry}>
          Try it again!
        </Button>
      </div>
    </div>
  );
};
