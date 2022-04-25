import React, {useEffect, useState} from 'react';

import useWsClient from '../api/useWsClient';
import { ENDPOINTS } from '../constants/api';
import { TABLE_COLUMNS } from '../constants/table-data';

import MatchBlock from './MatchCell';
import { DataTable } from './styled.js';

const MatchTable = ({tournaments}) => {
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
      <DataTable data-testid="match-table">
        <thead>
          <tr>
            {TABLE_COLUMNS.map((c,i) => (
              <th key={i} data-testid="match-table-column">{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {localTournaments.map((t) => (
            <tr key={t.id} data-testid="match-table-row">
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
            <tr data-testid="match-table-empty-row" style={{textAlign: 'center'}}>
              <td colSpan={TABLE_COLUMNS.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </div>
  );
};

export default MatchTable;
