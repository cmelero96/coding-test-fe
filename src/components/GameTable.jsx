import React, {useEffect, useState} from 'react';

import useWsClient from '../hooks/useWsClient';
import { ENDPOINTS } from '../constants/server';

const GameTable = ({tournaments}) => {
  const [localTournaments, setLocalTournaments] = useState([]);

  const { newMessage } = useWsClient(ENDPOINTS.series);

  useEffect(() => {
    setLocalTournaments(tournaments);
  }, [tournaments]);

  useEffect(() => {
    newMessage.forEach(match => {
      const tournament = localTournaments.find(t => t.id === match.id);

      tournament.match = {...match}
    })

  }, [localTournaments, newMessage, tournaments])

  return (
    <div>
    </div>
  );
};

export default GameTable;
