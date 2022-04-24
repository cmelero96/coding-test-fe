import React, {useEffect, useState} from 'react';
import {ScoreCell, TeamCell} from './styled';

const MatchBlock = ({teams, match}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!!(match && match.score));
  }, [match]);

  const scoreComponents = isLoaded
    ? [
        <span key="score" className="highlight">{match.score[0]}</span>,
        <span key="score" className="highlight">{match.score[1]}</span>,
      ]
    : [<span key="score">0</span>, <span key="score">0</span>];

  const seriesComponents =
    isLoaded && match.series
      ? [
          <span key="series">{`(${match.series[0]}) `}</span>,
          <span key="series">{` (${match.series[1]})`}</span>,
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
        <span className="separator">x</span>
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
