import React, {useEffect, useState} from 'react';
import MatchCell from './MatchCell';

import useWsClient from '../hooks/useWsClient';
import { ENDPOINTS } from '../constants/server';
import { TABLE_COLUMNS } from '../constants/table-data';

import { DataTable, TableBody, TableHeader } from './styled';


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
      <DataTable>
        <TableHeader>
          <tr>
            {TABLE_COLUMNS.map((c,i) => (
              <th key={i} colSpan={c.startsWith('team') ? 2 : 1}>{c}</th>
            ))}
          </tr>
        </TableHeader>

        <TableBody>
          {localTournaments.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.startTime}</td>
              <MatchCell
                key={'cell-'+t.id}
                teams={t.teams}
                match={t.match}
              />
              <td>{t.tournament.name}</td>
            </tr>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default GameTable;
