import React from 'react';
import { ScoreCell, TeamCell } from './styled';

const MatchBlock = ({teams, match}) => {
  const scoreComponents =
    match && match.score
      ? [<span key="score">{match.score[0]}</span>, <span key="score">{match.score[1]}</span>]
      : [<span key="score">0</span>, <span key="score">0</span>];

  const seriesComponents =
    match && match.series
      ? [<span key="series">{`(${match.series[0]}) `}</span>, <span key="series">{` (${match.series[1]})`}</span>]
      : [null, null];

  return (
    <>
      <TeamCell first>
        {teams[0].name}
        <img src={teams[0].logoUrl} alt=""/>
      </TeamCell>
      <ScoreCell>{[seriesComponents[0], scoreComponents[0]]} x {[scoreComponents[1], seriesComponents[1]]}</ScoreCell>
      <TeamCell second>
        {teams[1].name}
        <img src={teams[1].logoUrl} alt=""/>
      </TeamCell>
    </>
  );
};

export default MatchBlock;
