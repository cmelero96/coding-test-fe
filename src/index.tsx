// @ts-nocheck

import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'

import useApi, { filterBy } from "./hooks/useApi";

import GameTable from "./components/GameTable";
import { ENDPOINTS } from "./constants/server";
import GameFilter from "./components/GameFilter";
import { FILTER_COLUMNS, FILTER_HANDLERS } from "./constants/table-data";

export const App = () => {
  const { data, loading, error } = useApi(ENDPOINTS.series, { method: 'GET' });
  const [filteredData, setFilteredData] = useState([]);

  console.log('.');
  

  const handleFilter = useCallback((field, textFilter) => {
    if (field && textFilter) {
      const filtered = data.filter(match => filterBy[field](match, textFilter));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {<GameFilter onFilter={handleFilter}></GameFilter>}
      {<GameTable tournaments={filteredData}></GameTable>}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
