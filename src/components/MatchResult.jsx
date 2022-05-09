import React, {useEffect, useState} from 'react';
import {ScoreCell} from './styled';

const MatchResult = ({isLoading, results}) => {
  const [hasSeries, setHasSeries] = useState();

  useEffect(() => {
    setHasSeries(results.some((result) => result.series != null));
  }, [results]);
  if (isLoading) {
    return (
      <ScoreCell>
        <span data-testid="inactive-score">0</span>
        <span>x</span>
        <span data-testid="inactive-score">0</span>
      </ScoreCell>
    );
  }

  return (
    <ScoreCell>
      {hasSeries && <span data-testid="series-score">{`(${results[0].series}) `}</span>}
      {
        <span data-testid="active-score" className="highlight">
          {results[0].score}
        </span>
      }
      <span>x</span>
      {
        <span data-testid="active-score" className="highlight">
          {results[1].score}
        </span>
      }
      {hasSeries && <span data-testid="series-score">{` (${results[1].series})`}</span>}
    </ScoreCell>
  );
};

export default MatchResult;
