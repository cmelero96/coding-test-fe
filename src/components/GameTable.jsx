import React, {useEffect, useState} from 'react';

const GameTable = ({tournaments}) => {
  const [localTournaments, setLocalTournaments] = useState([]);

  useEffect(() => {
    setLocalTournaments(tournaments);
  }, [tournaments]);

  return (
    <div>
    </div>
  );
};

export default GameTable;
