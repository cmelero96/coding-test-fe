import React, {useEffect, useState} from 'react';

import useWsClient from '../hooks/useWsClient';
import { ENDPOINTS } from '../constants/server';
import { TABLE_COLUMNS } from '../constants/table-data';

import MatchBlock from './MatchCell';
import { DataTable } from './styled.js';

const GameTable = ({tournaments}) => {
  const [localTournaments, setLocalTournaments] = useState([]);

  const { newMessage } = useWsClient(ENDPOINTS.series);

  useEffect(() => {
    setLocalTournaments(tournaments);
  }, [tournaments]);

  useEffect(() => {
    newMessage.forEach(match => {
      const tournament = localTournaments.find(t => t.id === match.id);

      if (tournament) tournament.match = {...match}
    })

  }, [localTournaments, newMessage, tournaments])

  return (
    <div>
      <DataTable>
        <thead>
          <tr>
            {TABLE_COLUMNS.map((c,i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {localTournaments.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.startTime}</td>
              <MatchBlock
                teams={t.teams}
                match={t.match}
              />
              <td>{t.tournament.name}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default GameTable;
