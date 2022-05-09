import React, {useEffect, useState} from 'react';
import MatchResult from './MatchResult';
import {TeamCell} from './styled';

const MatchBlock = ({teams, match}) => {
  const [teamResults, setTeamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (match && match.score) {
      setIsLoading(false);
      setTeamResults([
        {
          score: match.score[0],
          series: match.series && match.series[0],
        },
        {
          score: match.score[1],
          series: match.series && match.series[1],
        },
      ]);
    } else {
      setIsLoading(true);
      setTeamResults([]);
    }
  }, [match]);

  return (
    <>
      <TeamCell first>
        <span>{teams[0].name}</span>
        <img src={teams[0].logoUrl} alt="" />
      </TeamCell>
      <MatchResult isLoading={isLoading} results={teamResults}></MatchResult>
      <TeamCell second>
        <span>{teams[1].name}</span>
        <img src={teams[1].logoUrl} alt="" />
      </TeamCell>
    </>
  );
};

export default MatchBlock;
