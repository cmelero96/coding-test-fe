import React, {useEffect, useState} from 'react';
import {ScoreCell, TeamCell} from './styled';

const MatchBlock = ({teams, match}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!!(match && match.score));
  }, [match]);

  const scoreComponents = isLoaded
    ? [
        <span data-testid="active-score" key="score" className="highlight">{match.score[0]}</span>,
        <span data-testid="active-score" key="score" className="highlight">{match.score[1]}</span>,
      ]
    : [
        <span data-testid="inactive-score" key="score">0</span>,
        <span data-testid="inactive-score" key="score">0</span>
      ];

  const seriesComponents =
    isLoaded && match.series
      ? [
          <span data-testid="series-score" key="series">{`(${match.series[0]}) `}</span>,
          <span data-testid="series-score" key="series">{` (${match.series[1]})`}</span>,
        ]
      : [null, null];

  return (
    <>
      <TeamCell first>
        <span>{teams[0].name}</span>
        <img src={teams[0].logoUrl} alt="" />
      </TeamCell>
      <ScoreCell>
        {[seriesComponents[0], scoreComponents[0]]}
        <span>x</span>
        {[scoreComponents[1], seriesComponents[1]]}
      </ScoreCell>
      <TeamCell second>
        <span>{teams[1].name}</span>
        <img src={teams[1].logoUrl} alt="" />
      </TeamCell>
    </>
  );
};

export default MatchBlock;
