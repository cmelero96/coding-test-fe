import React from 'react';

const MatchCell = ({teams, match}) => {
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
      <td>{teams[0].name}</td>
      <td>{[seriesComponents[0], scoreComponents[0]]}</td>
      <td>x</td>
      <td>{[scoreComponents[1], seriesComponents[1], ]}</td>
      <td>{teams[1].name}</td>
    </>
  );
};

export default MatchCell;
