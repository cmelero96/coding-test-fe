// @ts-nocheck

import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'

import useApi from "./api/useApi";

import GameTable from "./components/GameTable";
import { ENDPOINTS } from "./constants/api";
import filterBy from "./api/filterBy";
import GameFilter from "./components/GameFilter";

/*
 *  TODO:
 *  - Add styling for filter
 *  - Disable filter text when no option selected
 *  - Add unit tests
 *  - Add e2e test
 */

export const App = () => {
  const { data, loading, error } = useApi(ENDPOINTS.series, { method: 'GET' });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = useCallback((field, textFilter) => {
    setFilteredData(field && textFilter
      ? data.filter(match => filterBy[field](match, textFilter))
      : data)
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
