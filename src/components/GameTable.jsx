import React, {useEffect, useState} from 'react';

import useWsClient from '../api/useWsClient';
import { ENDPOINTS } from '../constants/api';
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
    newMessage.forEach((match) => {
      const tournament = localTournaments.find((t) => t.id === match.id);

      if (tournament) tournament.match = {...match}
    })

  }, [localTournaments, newMessage, tournaments])

  return (
    <div>
      <DataTable data-testid="game-table">
        <thead>
          <tr>
            {TABLE_COLUMNS.map((c,i) => (
              <th key={i} data-testid="game-table-column">{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {localTournaments.map((t) => (
            <tr key={t.id} data-testid="game-table-row">
              <td>{t.title}</td>
              <td>{t.startTime}</td>
              <MatchBlock
                teams={t.teams}
                match={t.match}
              />
              <td>{t.tournament.name}</td>
            </tr>
          ))}
          {localTournaments.length === 0 && (
            <tr data-testid="game-table-empty-row" style={{textAlign: 'center'}}>
              <td colSpan={TABLE_COLUMNS.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </div>
  );
};

export default GameTable;
